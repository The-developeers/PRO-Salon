import FinancialTransaction from '../models/Financial.model.js';

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

function buildFilter(query) {
  const { type, category, status, month } = query;
  const filter = {};

  if (type && type !== 'todos') filter.type = type;
  if (category && category !== 'todos') filter.category = category;
  if (status && status !== 'todos') filter.status = status;

  if (month) {
    const start = new Date(`${month}-01T00:00:00.000Z`);
    const end = new Date(`${month}-31T23:59:59.999Z`);
    filter.date = { $gte: start, $lte: end };
  }

  return filter;
}

const Controllers = {
  create: asyncHandler(async (req, res) => {
    const transaction = await FinancialTransaction.create(req.body);
    return res.status(201).json(transaction.toJSON());
  }),

  getAll: asyncHandler(async (req, res) => {
    const filter = buildFilter(req.query);

    const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 50;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      FinancialTransaction.find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      FinancialTransaction.countDocuments(filter),
    ]);

    return res.json({
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  }),

  getTotals: asyncHandler(async (_req, res) => {
    const [result] = await FinancialTransaction.aggregate([
      {
        $group: {
          _id: null,
          receita: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$type', 'receita'] },
                    { $eq: ['$status', 'pago'] },
                  ],
                },
                '$value',
                0,
              ],
            },
          },
          despesa: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$type', 'despesa'] },
                    { $eq: ['$status', 'pago'] },
                  ],
                },
                '$value',
                0,
              ],
            },
          },
          pendente: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pendente'] }, '$value', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          receita: 1,
          despesa: 1,
          pendente: 1,
          saldo: { $subtract: ['$receita', '$despesa'] },
        },
      },
    ]);

    const totals = result || {
      receita: 0,
      despesa: 0,
      pendente: 0,
      saldo: 0,
    };

    return res.json(totals);
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updated = await FinancialTransaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return res.status(404).json({ error: 'Transação não encontrada.' });
    }

    return res.json(updated);
  }),

  remove: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleted = await FinancialTransaction.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ error: 'Transação não encontrada.' });
    }

    return res.status(204).send();
  }),
};

export default Controllers;

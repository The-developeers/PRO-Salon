import { Router } from 'express';
import Controllers from '../controllers/financial.controller.js';

const router = Router();

// ROTAS CORRIGIDAS (Removemos o prefixo '/financial' daqui pois ele já vai no server.js)

// POST http://localhost:5000/api/financial
router.post('/', Controllers.create);

// GET http://localhost:5000/api/financial (Lista com filtros)
router.get('/', Controllers.getAll);

// GET http://localhost:5000/api/financial/totals (Totais)
router.get('/totals', Controllers.getTotals);

// PUT http://localhost:5000/api/financial/:id (Atualizar)
router.put('/:id', Controllers.update);

// DELETE http://localhost:5000/api/financial/:id (Remover)
router.delete('/:id', Controllers.remove);

export default router;
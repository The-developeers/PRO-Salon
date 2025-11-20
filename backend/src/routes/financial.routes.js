import { Router } from 'express';
import Controllers from '../controllers/financial.controller.js';

const router = Router();

router.post('/financial', Controllers.create);
router.get('/financial', Controllers.getAll);
router.get('/financial/totals', Controllers.getTotals);
router.put('/financial/:id', Controllers.update);
router.delete('/financial/:id', Controllers.remove);

export default router;

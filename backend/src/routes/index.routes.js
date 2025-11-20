import { Router } from 'express';

import userRoutes from '../routes/user.routes.js';
import employeeRoutes from '../routes/employee.routes.js';
import serviceRoutes from '../routes/service.routes.js';
import appointmentRoutes from '../routes/appointment.routes.js';
import authRoutes from '../routes/auth.routes.js';
import financialRoutes from '../routes/financial.routes.js';

import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.use('/auth', authRoutes);

router.use('/users', requireAuth, requireRole('admin'), userRoutes);

router.use('/employees', requireAuth, employeeRoutes);

router.use('/services', requireAuth, serviceRoutes);

router.use('/appointment', requireAuth, appointmentRoutes);

router.use('/financial', requireAuth, financialRoutes);

export default router;

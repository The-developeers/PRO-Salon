import { Router } from 'express'
import userRoutes from './user.routes.js'
import employeeRoutes from './employee.routes.js'
import serviceRoutes from './service.routes.js'
// 1. Importar o arquivo REAL de rotas
import appointmentRoutes from './appointment.routes.js' 
import authRoutes from './auth.routes.js'

import { requireAuth, requireRole } from '../middlewares/auth.middleware.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', requireAuth, requireRole('admin'), userRoutes)
router.use('/employees', requireAuth, employeeRoutes)
router.use('/services', requireAuth, serviceRoutes)

// 2. Usar a rota real. 
// O frontend chama '/agendamentos', mas usa o controller do backend.
router.use('/agendamentos', requireAuth, appointmentRoutes)

export default router
import { Router } from 'express'
import userRoutes from './user.routes.js'
import employeeRoutes from './employee.routes.js'
import serviceRoutes from './service.routes.js'
import authRoutes from './auth.routes.js'

// 1. IMPORTAR O ARQUIVO QUE CRIAMOS (agendamentos.js)
// Seu código estava importando 'appointment.routes.js', mas criamos 'agendamentos.js'
import agendamentosRoutes from './agendamentos.js' 

import { requireAuth, requireRole } from '../middlewares/auth.middleware.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', requireAuth, requireRole('admin'), userRoutes)
router.use('/employees', requireAuth, employeeRoutes)
router.use('/services', requireAuth, serviceRoutes)

// 2. CORRIGIR O NOME DA ROTA
// O Frontend chama '/api/v1/agendamentos'. 
// Se deixar '/appointment', o frontend não acha.
// 
// 3. ATENÇÃO AO REQUIREAUTH
// Se o seu frontend AINDA não estiver enviando o Token no cabeçalho,
// remova o 'requireAuth' dessa linha temporariamente para testar.
router.use('/agendamentos', agendamentosRoutes) 

export default router
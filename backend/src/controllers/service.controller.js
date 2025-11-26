import Service from '../models/Service.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import * as apiResponse from '../utils/apiResponse.js'

// ============================= LISTAR TODOS =============================
export const listAll = asyncHandler(async (_req, res) => {
	const items = await Service.find().sort({ createdAt: -1 })
	return apiResponse.ok(res, items)
})

// ============================= BUSCAR POR ID =============================
export const getById = asyncHandler(async (req, res) => {
	const item = await Service.findById(req.params.id)
	if (!item) return apiResponse.notFound(res, 'Serviço não encontrado')
	return apiResponse.ok(res, item)
})

// ============================= CRIAR =============================
export const create = asyncHandler(async (req, res) => {
	const { nome, preco, duracaoMinutos, categoria, descricao, comissao, imagemUrl, ativo } = req.body

	if (!nome || preco == null)
		return apiResponse.badRequest(res, 'Campos obrigatórios: nome, preco')

	const newService = await Service.create({
		nome,
		preco,
		duracaoMinutos,
		categoria,
		descricao,
		comissao,
		imagemUrl,
		ativo: ativo ?? true
	})

	return apiResponse.created(res, newService)
})

// ============================= ATUALIZAR =============================
export const update = asyncHandler(async (req, res) => {
	const { nome, preco, duracaoMinutos, categoria, descricao, comissao, imagemUrl, ativo } = req.body
	const { id } = req.params
	
	const updated = await Service.findByIdAndUpdate(
		id,
		{
			nome,
			preco,
			duracaoMinutos,
			categoria,
			descricao,
			comissao,
			imagemUrl,
			ativo
		},
		{ new: true } // devolve o item atualizado
	)

	if (!updated) return apiResponse.notFound(res, 'Serviço não encontrado')
	return apiResponse.ok(res, updated)
})

// ============================= REMOVER =============================
export const remove = asyncHandler(async (req, res) => {
	const deleted = await Service.findByIdAndDelete(req.params.id)
	if (!deleted) return apiResponse.notFound(res, 'Serviço não encontrado')
	return apiResponse.noContent(res)
})

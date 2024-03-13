import { Request, Response } from 'express'
import { EditarProdutoService } from '../../Services/Produtos/EditarProdutoServices'


class EditarProdutoController {
    async handle(req: Request, res: Response) {
        const { id, editarNome, editarFabricante, editarQuantidade, editarPreco } = req.body

        const editarProdutoService = new EditarProdutoService()
        const editar = await editarProdutoService.execute({
            id,
            editarNome,
            editarFabricante,
            editarQuantidade,
            editarPreco
            
        })
        return res.json(editar)
    }
}

export { EditarProdutoController }
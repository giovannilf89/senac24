import { Request, Response } from 'express'
import { ListarProdutoUnicoService } from '../../Services/Produtos/ListarProdutoUnicoServices'

class ListarProdutoUnicoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const listarProdutoUnicoService = new ListarProdutoUnicoService()
        const resposta = await listarProdutoUnicoService.execute({
            id,
        })
        return res.json(resposta)
        
    }
}

export { ListarProdutoUnicoController }
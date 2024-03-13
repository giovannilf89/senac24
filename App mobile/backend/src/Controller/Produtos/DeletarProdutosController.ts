import { Response, Request } from 'express'
import { DeletarProdutosService } from '../../Services/Produtos/DeletarProdutosServices'


class DeletarProdutosController{
    async handle(req: Request, res: Response) {
        const { remover } = req.body

        const deletarProdutosServices = new DeletarProdutosService()
        const deletar = await deletarProdutosServices.execute({
            remover,
        })

        return res.json(deletar)
    }
}

export {DeletarProdutosController}
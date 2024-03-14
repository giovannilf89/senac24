import {Request, Response} from 'express'
import { ListarProdutosCategoriaServices } from '../../Services/item_pedido/ListarProdutosCategoriaServices'

class ListarProdutosCategoriaController {
    async handle (req: Request, res: Response){
        const {id} = req.params
        const listarProdutosCategoria = new ListarProdutosCategoriaServices()
        const resposta = await listarProdutosCategoria.execute({
            id
        })
        return res.json(resposta)
    }
}

export {ListarProdutosCategoriaController}
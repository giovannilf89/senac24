import {Request, Response} from 'express'
import { EditarItemPedidoServices } from '../../Services/item_pedido/EditarItemPedidoServices'


class EditarItemPedidoController {
    async handle(req: Request, res: Response){
        const {id,editarQuantidade} = req.body
        // console.log(req.body)

        const editarItemPedido = new EditarItemPedidoServices()
        const editar = await editarItemPedido.execute({
            id,
            editarQuantidade
        })
        return res.json(editar)
    }
}

export {EditarItemPedidoController}
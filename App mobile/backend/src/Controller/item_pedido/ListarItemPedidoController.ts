import { Request, Response } from 'express'
import { ListarItemPedidoService } from '../../Services/item_pedido/ListarItemPedidoServices'

class ListarItemPedidoController {
    async handle(req: Request, res: Response) {
        const listarItemPedidoUnico = new ListarItemPedidoService()
        const item = await listarItemPedidoUnico.execute()
        return res.json(item)
    }
}

export { ListarItemPedidoController }
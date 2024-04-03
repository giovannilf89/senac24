import { Request, Response } from 'express'
import { ListarPedidoServices } from '../../Services/Pedido/ListarPedidosServices'

class ListarPedidoController {
    async handle(req: Request, res: Response) {
        const listarPedidosServices = await new ListarPedidoServices()
        const pedidos = await listarPedidosServices.execute()
        return res.json(pedidos)
    }
}

export { ListarPedidoController }
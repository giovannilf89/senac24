import { Request, Response } from 'express'
import { DeletarItemPedidoServices } from '../../Services/item_pedido/DeletarItemPedidoServices'


class DeletarItemPedidoController {
    async handle(req: Request, res: Response) {
        const { remove } = req.body

        const deletarItemPedido = new DeletarItemPedidoServices()
        const deletar = await deletarItemPedido.execute({
            remove,
        })
        return res.json(deletar)
    }
}

export { DeletarItemPedidoController }
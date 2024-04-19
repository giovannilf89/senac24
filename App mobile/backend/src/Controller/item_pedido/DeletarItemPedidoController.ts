import { Request, Response } from 'express'
import { DeletarItemPedidoServices } from '../../Services/item_pedido/DeletarItemPedidoServices'


class DeletarItemPedidoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deletarItemPedido = new DeletarItemPedidoServices()
        const deletar = await deletarItemPedido.execute({
            id,
        })
        return res.json(deletar)
    }
}

export { DeletarItemPedidoController }
import { Request, Response } from 'express'
import { DeletarPedidoServices } from '../../Services/Pedido/DeletarPedidoServices'

class DeletarPedidoController {
    async handle(req: Request, res: Response) {
        const { remover } = req.body
        console.log('controller', req.body)

        const deletarPedido = new DeletarPedidoServices()
        const deletar = await deletarPedido.execute({
            remover,
        })
        return res.json(deletar)
    }
}

export { DeletarPedidoController }
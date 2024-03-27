import { Request, Response } from 'express'
import { ListarPedidoUnicoServices } from '../../Services/Pedido/ListarPedidoUnicoServices'


class ListarPedidoUnicoController {
    async handle(req: Request, res: Response) {
        const {pedido} = req.body // {} desconstroi o objeto
        console.log(pedido)

        const listarPedidoUnicoService = new ListarPedidoUnicoServices()
        const resposta = await listarPedidoUnicoService.execute({
            pedido,
        })
        return res.json(resposta)
    }
}

export { ListarPedidoUnicoController }
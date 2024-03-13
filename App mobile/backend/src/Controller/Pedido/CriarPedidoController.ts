import { Request, Response } from 'express'
import { CriarPedidoServices } from '../../Services/Pedido/CriarPedidoServices'

class CriarPedidoController {
    async handle(req: Request, res: Response) {
        const { n_pedido, valor_total, status, draft, entrega, entregador, clienteId } = req.body
        // console.log(req.body)

        const valor = valor_total.toFixed(2)

        const criarPedidoService = new CriarPedidoServices()
        const resposta = await criarPedidoService.execute({
            n_pedido,
            valor,
            status,
            draft,
            entrega,
            entregador,
            clienteId
        })
        return res.json(resposta)
    }
}

export { CriarPedidoController }
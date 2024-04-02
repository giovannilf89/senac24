import { Request, Response } from 'express'
import { CriarPedidoServices } from '../../Services/Pedido/CriarPedidoServices'

class CriarPedidoController {
    async handle(req: Request, res: Response) {
        const { clienteId } = req.body
        // console.log('controller',req.body)

        // const valor = valor_total.toFixed(2)

        const criarPedidoService = new CriarPedidoServices()
        const resposta = await criarPedidoService.execute({
            clienteId
        })
        return res.json(resposta)
    }
}

export { CriarPedidoController }
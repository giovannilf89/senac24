import { Request, Response } from 'express'
import { CriarItemPedidoServices } from '../../Services/item_pedido/CriarItemPedidoServices'

class CriarItemPedidoController {
    async handle(req: Request, res: Response) {
        const { quantidade, produtoId, pedidoId } = req.body
        // console.log('controller', req.body)

        const criarItemPedidoServices = new CriarItemPedidoServices()
        const resposta = await criarItemPedidoServices.execute({
            quantidade,
            produtoId,
            pedidoId
        })
        return res.json(resposta)
    }
   
}

export { CriarItemPedidoController }
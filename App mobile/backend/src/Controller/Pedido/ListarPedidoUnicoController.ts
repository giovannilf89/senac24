import { Request, Response } from 'express'
import { ListarPedidoUnicoServices } from '../../Services/Pedido/ListarPedidoUnicoServices'


class ListarPedidoUnicoController {
    async handle(req: Request, res: Response) {
        const {id} = req.params 

        const listarPedidoUnicoService = new ListarPedidoUnicoServices()
        const resposta = await listarPedidoUnicoService.execute({
            id,
        })
        return res.json(resposta)
    }
}

export { ListarPedidoUnicoController }
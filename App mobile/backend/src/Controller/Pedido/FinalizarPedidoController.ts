import {Request, Response} from 'express'
import { FinalizarPedidoServices } from '../../Services/Pedido/FinalizarPedidoServices'


class FinalizarPedidosController{
async handle(req: Request, res: Response){
    const {id, draft, aceito } = req.body
    const finalizarPedido = new FinalizarPedidoServices()
    const resposta = await finalizarPedido.execute({
        id,
        draft,
        aceito
    })
    return res.json(resposta)
}
}

export {FinalizarPedidosController}
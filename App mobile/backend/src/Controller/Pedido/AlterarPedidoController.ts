import { Request, Response } from 'express'
import { AlterarPedidoServices } from '../../Services/Pedido/AlterarPedidoServices'

class AlterarPedidoController {
async handle(req: Request, res: Response){
    const {n_pedido, alteraStatus, alteraEntregador} = req.body
    const alterarPedido = new AlterarPedidoServices()
    const resposta = await alterarPedido.execute({
        n_pedido,
        alteraStatus,
        alteraEntregador
    })
    return res.json(resposta)
}
}

export {AlterarPedidoController}
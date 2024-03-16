import {Request, Response} from 'express'
import { SomarPedidoServices } from '../../Services/Pedido/SomarpedidoServices'

class SomarPedidoController{
async handle(req: Request, res: Response){
    const {id} = req.params
    const somarItensPedido = new SomarPedidoServices()
    const resposta = await somarItensPedido.execute({
        id
    })
    return res.json(resposta)
}
}

export {SomarPedidoController}
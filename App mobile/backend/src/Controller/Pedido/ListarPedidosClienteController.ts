import {Request, Response} from 'express'
import {ListarPedidosClienteServices} from '../../Services/Pedido/ListarPedidosClienteServices'

class ListarPedidosClienteController{
async handle(req: Request, res: Response){
    const {clienteId} = req.params
    const ListarCliente = new ListarPedidosClienteServices()
    const response = await ListarCliente.execute({
        clienteId
    })
    return res.json(response)
}

}

export {ListarPedidosClienteController}
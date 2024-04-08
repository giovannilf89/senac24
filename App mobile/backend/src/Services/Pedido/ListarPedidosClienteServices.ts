import prismaClient from "../../prisma";

interface ListarPedidoCliente {
    clienteId: string
}

class ListarPedidosClienteServices{
async execute ({clienteId}: ListarPedidoCliente){
    const response = await prismaClient.pedido.findMany({
        where:{
            clienteId: clienteId
        },
        select: {
            id: true,
            n_pedido: true,
            status: true,
            entregador: true,
            valor_total: true
        }
    })
    return response
}
}

export {ListarPedidosClienteServices}
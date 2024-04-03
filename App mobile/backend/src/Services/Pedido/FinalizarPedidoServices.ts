import prismaClient from "../../prisma";

interface FinalizarPedido{
    id: string,
    draft: boolean,
    aceito: boolean
}

class FinalizarPedidoServices{
async execute({id, draft, aceito}: FinalizarPedido){
    await prismaClient.pedido.update({
        where: {
            id: id
        },
        data:{
            draft: draft,
            aceito: aceito
        }
    })
    return {dados: 'Alterado com sucesso'}
}
}

export {FinalizarPedidoServices}
import prismaClient from "../../prisma";

interface FinalizarPedido{
    id: string,
    draft: boolean,
    aceito: boolean,
    valor_total: number,
}

class FinalizarPedidoServices{
async execute({id, draft, aceito, valor_total}: FinalizarPedido){
    await prismaClient.pedido.update({
        where: {
            id: id
        },
        data:{
            draft: false,
            aceito: true,
            valor_total: valor_total
        }
    })
    return {dados: 'Alterado com sucesso'}
}
}

export {FinalizarPedidoServices}
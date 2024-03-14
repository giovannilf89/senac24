import prismaClient from "../../prisma";

interface CriarItemPedido {
    quantidade: number
    produtoId: string
    pedidoId: string
    valor: number
}


class CriarItemPedidoServices {
    async execute ({quantidade, produtoId, pedidoId, valor}: CriarItemPedido){
        // console.log('service1', quantidade, produtoId, pedidoId, valor)
       const resposta = await prismaClient.item_pedido.create({
            data:{
                quantidade: quantidade,
                produtoId: produtoId,
                pedidoId: pedidoId,
                valor
            },
            include:{
                produtos: true
            }
        })
        return resposta
    }
}

export {CriarItemPedidoServices}
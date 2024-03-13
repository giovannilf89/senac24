import prismaClient from "../../prisma";

interface CriarItemPedido {
    quantidade: string
    produtoId: string
    pedidoId: string
}


class CriarItemPedidoServices {
    async execute ({quantidade, produtoId, pedidoId}: CriarItemPedido){
        // console.log('service1', quantidade, produtoId, pedidoId)
        await prismaClient.item_pedido.create({
            data:{
                quantidade: quantidade,
                produtoId: produtoId,
                pedidoId: pedidoId
            }
        })
        // console.log('service2', quantidade, produtoId, pedidoId)
        return {dados: 'Cadastro efetuado com sucesso'}
    }
}

export {CriarItemPedidoServices}
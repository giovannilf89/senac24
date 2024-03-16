import prismaClient from "../../prisma";

interface SomarItens{
    id: string
}

class SomarPedidoServices{
    async execute({id}: SomarItens ){
        const resposta = await prismaClient.item_pedido.aggregate({
            _sum: {
                valor: true
            },
            where: {
                pedidoId: id
            }
        })
        return resposta._sum.valor
    }
    }


export {SomarPedidoServices}
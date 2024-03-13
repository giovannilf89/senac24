import prismaClient from "../../prisma";

interface EditarItem {
    id: string
    editarQuantidade: string
}

class EditarItemPedidoServices {
async execute({id, editarQuantidade}: EditarItem){
    await prismaClient.item_pedido.update({
        where:{
            id: id,
        },
        data:{
            quantidade: editarQuantidade,
        }
    })
    return { data: "Dados alterados com sucesso" }
}
}

export {EditarItemPedidoServices}
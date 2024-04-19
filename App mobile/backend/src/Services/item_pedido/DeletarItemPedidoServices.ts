import prismaClient from "../../prisma";

interface DeletarItem {
    id: string
}

class DeletarItemPedidoServices {
    async execute({ id }: DeletarItem) {
        // Primeiro, encontre todos os itens relacionados ao pedido
        const itensRelacionados = await prismaClient.item_pedido.findMany({
            where: {
                pedidoId: id,
            },
        });

        // Em seguida, apague todos os itens relacionados
        await prismaClient.item_pedido.deleteMany({
            where: {
                pedidoId: id,
            },
        });

        // Retorne uma mensagem de sucesso
        return { data: "Registros apagados com sucesso" };
    }
}

export { DeletarItemPedidoServices };

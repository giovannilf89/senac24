import prismaClient from "../../prisma";

interface CriarPedido {
    clienteId: string

}

class CriarPedidoServices {
    async execute({ clienteId }: CriarPedido) {
        // console.log('s1',n_pedido, valor, clienteId)
        const resposta = await prismaClient.pedido.create({
            data: {
                clienteId
            },
            select:{
                n_pedido: true,
            }
        })
        // console.log(n_pedido, valor, clienteId)
        return {dados: "Pedido cadastrado com sucesso"}
    }

}

export { CriarPedidoServices }
import prismaClient from "../../prisma";

interface ListarProdutoUnico {
    id: string
}

class ListarProdutoUnicoService {
    async execute({ id }: ListarProdutoUnico) {
        const resposta = await prismaClient.produto.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                nome: true,
                fabricante: true,
                quantidade: true,
                preco: true
            }
        })
        return resposta
    }
}

export { ListarProdutoUnicoService }
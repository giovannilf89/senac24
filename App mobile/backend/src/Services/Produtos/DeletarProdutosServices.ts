import prismaClient from "../../prisma";

interface DeletarProduto {
    remover: string
}

class DeletarProdutosService {
    async execute({ remover }: DeletarProduto) {
        await prismaClient.produto.delete({
            where:{
                id: remover,
            }
        })

        return {dados: "Registro apagado com sucesso"}
    }
}

export {DeletarProdutosService}
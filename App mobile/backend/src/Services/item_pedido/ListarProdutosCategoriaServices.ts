import prismaClient from "../../prisma";

interface ListarProdutos {
    id: string
}

class ListarProdutosCategoriaServices {
async execute({id}: ListarProdutos){
    const resposta = await prismaClient.produto.findMany({
        where:{
            categoriaId: id
        }
    })
    return resposta
}
}

export {ListarProdutosCategoriaServices}
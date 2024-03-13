import prismaClient from "../../prisma";

interface EditarProduto {
    id: string
    editarNome: string
    editarFabricante: string
    editarQuantidade: string
    editarPreco: string
}

class EditarProdutoService {
    async execute({ id, editarNome, editarFabricante, editarQuantidade, editarPreco }: EditarProduto) {

        await prismaClient.produto.update({
            where: {
                id: id,
            },
            data: {
                nome: editarNome,
                fabricante: editarFabricante,
                quantidade: editarQuantidade,
                preco: editarPreco
            },
        })
        return { data: "Dados alterados com sucesso" }
    }

}

export { EditarProdutoService }
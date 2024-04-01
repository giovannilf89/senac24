import prismaClient from "../../prisma";


interface AlteraCliente {
    id: string
    alteraEmail: string
    alteraCep: string
    alteraRua: string
    alteraNumero: string
    alteraBairro: string
    alteraCidade: string
    alteraEstado: string
}

class AlterarClienteServices {
    async execute({ id, alteraEmail, alteraCep, alteraRua, alteraNumero, alteraBairro, alteraCidade, alteraEstado }: AlteraCliente) {
        await prismaClient.cliente.update({
            where: {
                id: id,
            },
            data: {
                email: alteraEmail,
                cep: alteraCep,
                rua: alteraRua,
                numero: alteraNumero,
                bairro: alteraBairro,
                cidade: alteraCidade,
                uf: alteraEstado,
            },
        })
        return { dados: "Dados alterados com sucesso" }
    }

}

export { AlterarClienteServices }
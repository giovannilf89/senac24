import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface CriarCliente {
    nome: string
    email: string
    senha: string
    cpf: string
    cep: string
    rua: string
    numero: string,
    bairro: string,
    cidade: string,
    uf: string,
}

class CriarClienteServices {
    async execute({ nome, email, senha, cpf, cep, rua, numero, bairro, cidade, uf }: CriarCliente) {
        console.log('service',nome)
        if (!nome || !email || !senha || !cpf || !cep || !rua || !numero || !bairro || !cidade || !uf) {
            throw new Error('Existem campos em branco')
        }
        const emailExiste = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })
        if (emailExiste) {
            throw new Error('Email já cadastrado')
        }
         const senhaCrypt = await hash(senha, 8)
         const resposta = await prismaClient.cliente.create({
            data:{
                nome: nome,
                email: email,
                senha: senhaCrypt,
                cpf: cpf,
                cep: cep,
                rua: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
            },
            select:{
                id: true,
                nome: true,
                email: true
            }
         })
         return {dados: "Cliente cadastrado com sucesso"}
    }
}

export { CriarClienteServices }
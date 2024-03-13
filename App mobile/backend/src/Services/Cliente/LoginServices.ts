import prismaClient from '../../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface Cliente {
    email: string
    senha: string
}

class LoginServices {
    async execute({ email, senha }: Cliente) {
        // console.log('service', email,senha)
        const cliente = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })
        if (!cliente) {
            throw new Error('Usuario/Senha estão incorretos')
        }
        const autenticado = await compare(senha, cliente.senha)
        if (!autenticado) {
            throw new Error('Usuario/Senha estão incorretos')
        }

        const token = sign({
            id: cliente.id,
            email: cliente.email
        },
            process.env.JWT_SECRET,
            {
                subject: cliente.id,
                expiresIn: 100000
            }
        )
        return {
            id: cliente.id,
            email: cliente.email,
            nome: cliente.nome,
            token: token
        }
    }
}

export { LoginServices }
import prismaClient from "../../prisma";
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

interface LoginMoto{
    nusuario: string
    senha: string
}

class LoginMotoServices{
async execute ({nusuario, senha}: LoginMoto){
    // console.log(nusuario, senha)
    const usuario = await prismaClient.motoqueiro.findFirst({
        where: {
            nusuario: nusuario
        }
    })
    if (!usuario){
        throw new Error('Usuario/Senha estão incorretos')
    }
    const autenticado = await compare(senha, usuario.senha)
    // console.log(autenticado)
    if (!autenticado){
        throw new Error('Usuario/Senha estão incorretos')
    }

    const token = sign({
        id: usuario.id,
        nusuario: usuario.nusuario
    },
    process.env.JWT_SECRET,
    {
        subject: usuario.id,
        expiresIn: 100000
    }
    )
    // console.log(token)
    return{
        id: usuario.id,
        nome: usuario.nome,
        token: token

    }
}
}
export {LoginMotoServices}
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface CriarMotoqueiro{
    nome: string
    nusuario: string
    senha: string
}

class CriarMotoqueirosService{
async execute({nome, nusuario, senha}: CriarMotoqueiro){
// console.log("services", nome, nusuario, senha)
    if (!nome || !nusuario || !senha){
        throw new Error("Existem campos em branco")
    }
    const usuarioExiste = await prismaClient.motoqueiro.findFirst({
        where:{
            nusuario: nusuario
        }
    })
    if(usuarioExiste){
        throw new Error('Usuario ja cadastrado')
    }
    const senhaCrypt = await hash(senha, 8)
    /*const resposta =*/ await prismaClient.motoqueiro.create({
        data:{
            nome: nome,
            nusuario: nusuario,
            senha: senhaCrypt
        },
        // select:{
        //     id: true,
        //     nome: true,
        //     nusuario: true
        // }
    })
return /*({resposta})*/ {resposta: 'Cadastro efetuado com sucesso'}
}
}

export {CriarMotoqueirosService}
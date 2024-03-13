import { Request, Response} from 'express'
import { CriarUsuarioServices } from '../../Services/usuarios/CriarUsuariosServices'

class CriarUsuarioController{
    async handle(req: Request, res: Response){
    const {nome, email, senha} = req.body
    
    const criarUsuarioServices = new CriarUsuarioServices()
    const usuarios = await criarUsuarioServices.execute({
        nome,
        email,
        senha
    })
    return res.json(usuarios)
    }
}

export {CriarUsuarioController}

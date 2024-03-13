import {Request, Response} from 'express'
import { CriarMotoqueirosService } from '../../Services/Motoqueiros/CriarMotoqueirosServices'

class CriarMotoqueiroController{
async handle(req: Request, res: Response){
    const {nome, nusuario, senha} = req.body
    // console.log(nome, nusuario, senha)

    const criarMotoqueirosService = new CriarMotoqueirosService()
    const resposta = await criarMotoqueirosService.execute({
        nome,
        nusuario,
        senha
    })
    return res.json(resposta)
}
}
export {CriarMotoqueiroController}
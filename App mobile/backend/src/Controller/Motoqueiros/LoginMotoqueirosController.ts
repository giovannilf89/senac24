import {Request, Response} from 'express'
import { LoginMotoServices } from '../../Services/Motoqueiros/LoginMotoqueirosServices'

class LoginMotoController{
    async handle(req: Request, res: Response){
        const {nusuario, senha} = req.body
        // console.log(nusuario, senha)

        const loginMotoServices = new LoginMotoServices()
        const resposta = await loginMotoServices.execute({
            nusuario,
            senha
        })
        return res.json(resposta)
    }
}
export {LoginMotoController}
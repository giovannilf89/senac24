import { Request, Response } from 'express'
import { LoginServices } from '../../Services/Cliente/LoginServices'


class LoginController {
    async handle(req: Request, res: Response) {
        const { email, senha } = req.body
        // console.log('controller',req.body)

        const loginServices = new LoginServices()
        const resposta = await loginServices.execute({
            email,
            senha
        })
        // console.log(resposta)
        return res.json(resposta)
        
    }
}

export { LoginController }
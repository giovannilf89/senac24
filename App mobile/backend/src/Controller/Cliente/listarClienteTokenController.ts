import { Request, Response } from 'express'
import { ListarClienteTokenServices } from '../../Services/Cliente/ListarClienteTokenServices'

class ListarClienteTokenController {
    async handle(req: Request, res: Response) {
        const id = req.user_id
        const listarClienteToken = new ListarClienteTokenServices()
        const resposta = await listarClienteToken.execute({
            id
        })
        return res.json(resposta)
    }
}

export { ListarClienteTokenController }
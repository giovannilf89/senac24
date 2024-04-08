import { Request, Response } from 'express'
import { CriarClienteServices } from '../../Services/Cliente/CriarClienteServices'

class CriarClienteController {
    async handle(req: Request, res: Response) {
        const { nome, email, senha, cpf, cep, rua, numero, bairro, cidade, uf } = req.body
        console.log(req.body)
        const criarClienteServices = new CriarClienteServices()
        const resposta = await criarClienteServices.execute({
            nome,
            email,
            senha,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            uf,
        })
        return res.json(resposta)
    }
}

export { CriarClienteController }
import { Request, Response } from 'express'
import { AlterarClienteServices } from '../../Services/Cliente/AlterarClienteServices'


class AlterarClienteController {
    async handle(req: Request, res: Response) {
        const { id, alteraEmail, alteraCep, alteraRua, alteraNumero, alteraBairro, alteraCidade, alteraEstado } = req.body
        const alteraClienteService = new AlterarClienteServices()
        const resposta = await alteraClienteService.execute({
            id,
            alteraEmail,
            alteraCep,
            alteraRua,
            alteraNumero,
            alteraBairro,
            alteraCidade,
            alteraEstado
        })
        return res.json(resposta)
    }
}
export { AlterarClienteController }
import { Request, Response } from 'express'
import { createAppointmentServices } from '../../services/Schedule/createScheduleServices'


class createAppointmentController {
    async handle(req: Request, res: Response) {
        const { data, horario, dentista, clientId, dentistId } = req.body

        const createAppointment = new createAppointmentServices()
        const resposta = await createAppointment.execute({
            data,
            horario,
            dentista,
            clientId,
            dentistId
        })
        return res.json(resposta)
    }
}

export { createAppointmentController }
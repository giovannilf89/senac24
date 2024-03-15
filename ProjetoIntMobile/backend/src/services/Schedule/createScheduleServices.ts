import prismaClient from "../../prisma";


interface CreateAppointment{
    data: string
    horario: string
    dentista: string
    clientId: string
    dentistId: string
}

class createAppointmentServices{
async execute({data, horario, dentista, clientId, dentistId}: CreateAppointment){
    if (!data || !horario || !dentista || !clientId || !dentistId) {
        throw new Error('Existem campos em branco')
    }

    const resposta = await prismaClient.appointment.create({
        data:{
        date: data,
        time: horario,
        dentist: dentista,
        clientId: clientId,
        dentistId: dentistId
        }
    })
    return resposta
}
}

export {createAppointmentServices}
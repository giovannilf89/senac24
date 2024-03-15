import prismaClient from "../../prisma";

class ListScheduleServices{
async execute(){
    const listSchedule = await prismaClient.appointment.findMany({
        select:{
            id: true,
            time: true,
            dentist: true,
            clientId: true
        }
    })
    return(listSchedule)
}
}

export {ListScheduleServices}
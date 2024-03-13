import prismaClient from "../../prisma";

class ListarUsuariosServices {
  async execute() {
    const clientes = await prismaClient.user.findMany({});

    return clientes;
  }
}

export { ListarUsuariosServices };

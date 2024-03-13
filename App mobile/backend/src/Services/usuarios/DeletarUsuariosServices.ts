import prismaClient from "../../prisma";

interface DeletarUsuarios {
  remover: string;
}

class DeletarUsuariosServices {
  async execute({ remover }: DeletarUsuarios) {
    await prismaClient.user.delete({
      where: {
        id: remover,
      },
    });
    return { dados: "Registro apagado com sucesso" };
  }
}

export { DeletarUsuariosServices };

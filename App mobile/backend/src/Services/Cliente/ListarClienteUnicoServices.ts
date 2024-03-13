import prismaClient from "../../prisma";

prismaClient

interface ListarCliente {
  id: string;
}

class ListarClienteUnicoServices {
  async execute({ id }: ListarCliente) {
    const resposta = await prismaClient.cliente.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        cpf: true,
        cep: true,
        rua: true,
        numero: true,
        bairro: true,
        cidade: true,
        uf: true,
      },
    });
    return resposta;
  }
}

export { ListarClienteUnicoServices };

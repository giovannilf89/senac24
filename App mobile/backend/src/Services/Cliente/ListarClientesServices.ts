import prismaClient from "../../prisma";

class ListarClientesServices {
  async execute() {
    const clientes = await prismaClient.cliente.findMany({
      select: {
        id: true,
        nome: true, 
        cpf: true,
        cep: true,
        rua: true,
        numero: true,
        bairro: true,
        cidade: true,
        uf: true
      }
    });
    return (clientes);
  }
}

export { ListarClientesServices };

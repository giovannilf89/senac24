import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface CriarUsuario {
  nome: string;
  email: string;
  senha: string;
}

class CriarUsuarioServices {
  async execute({ nome, email, senha }: CriarUsuario) {
    if (!nome || !email || !senha) {
      throw new Error("Campos em branco não são permitidos");
    }
    const emailCadastro = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailCadastro) {
      throw new Error("Email ja cadastrado");
    }

    const senhaCrypt = await hash(senha, 8);

    const usuario = await prismaClient.user.create({
      data: {
        nome: nome,
        email: email,
        senha: senhaCrypt,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
    return { dados: "Usuario cadastrado com sucesso" };
  }
}

export { CriarUsuarioServices };

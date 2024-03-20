import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AutenticaUsuario {
  email: string;
  senha: string;
}

class AutenticaUsuarioServices {
  async execute({ email, senha }: AutenticaUsuario) {
    // console.log(email, senha);
    // return { dados: "Chegou no Back-end com sucesso" }; // toast do back end
    const usuario = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      throw new Error("Usuario/Senha Incorretos");
    }

    const autenticado = await compare(senha, usuario.senha);
    if (!autenticado) {
      throw new Error("Usuario/Senha Incorretos");
    }

    const token = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        subject: usuario.id,
        expiresIn: "1h",
      }
    );

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token: token,
    };
  }
}

export { AutenticaUsuarioServices };

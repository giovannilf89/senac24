import { Request, Response } from "express";
import { AutenticaUsuarioServices } from "../../services/usuarios/AutenticaUsuarioServices";

class AutenticaUsuarioController {
  async handle(req: Request, res: Response) {
    const { email, senha } = req.body;
    // console.log(email, senha);
    const autenticaUsuarioService = new AutenticaUsuarioServices();
    const resposta = await autenticaUsuarioService.execute({
      email,
      senha,
    });
    return res.json(resposta);
  }
}

export { AutenticaUsuarioController };

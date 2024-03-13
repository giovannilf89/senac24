import { Request, Response } from "express";
import { ListarUsuariosServices } from "../../Services/usuarios/ListarUsuariosServices";

class ListarUsuariosController {
  async handle(req: Request, res: Response) {
    const listarUsuariosServices = new ListarUsuariosServices();

    const clientes = await listarUsuariosServices.execute();

    return res.json(clientes);
  }
}

export { ListarUsuariosController };

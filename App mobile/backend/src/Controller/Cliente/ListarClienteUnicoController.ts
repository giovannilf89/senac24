import { Request, Response } from "express";
import { ListarClienteUnicoServices } from "../../Services/Cliente/ListarClienteUnicoServices";
class ListarClienteUnicoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);

    const listarClienteUnicoServices = new ListarClienteUnicoServices();
    const resposta = await listarClienteUnicoServices.execute({
      id,
    });
    return res.json(resposta);
  }
}

export { ListarClienteUnicoController };

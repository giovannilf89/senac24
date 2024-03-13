import { Response, Request } from "express";
import { DeletarClientesServices } from "../../Services/Cliente/DeletarClientesServices";

class DeletarClientesController {
  async handle(req: Request, res: Response) {
    const { remover } = req.body;

    const deletarClientesServices = new DeletarClientesServices();
    const deletar = await deletarClientesServices.execute({
      remover,
    });
    return res.json(deletar);
  }
}

export { DeletarClientesController };

import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAutenticado(req: Request, res: Response, next: NextFunction) {
  const autentToken = req.headers.authorization; // recebe o token pelo headers
    // console.log(autentToken);
  if (!autentToken) {
    return res.status(401).end(); // retorna erro se não receber token
  }
  const [, token] = autentToken.split(" "); // divide o token e armazena na constante token, eliminando o bearer
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload; // extrai do token o ID e armazena na constante sub
    // console.log(sub);
    return next();
  } catch (err) {
    return res.status(401).end;
  }
}

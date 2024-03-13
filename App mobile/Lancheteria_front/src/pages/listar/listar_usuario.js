import { useState, useEffect } from "react";
import apiBack from "../../services/apiBack";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ListarUsuario() {
  const [dados, setDados] = useState([""]);

  useEffect(() => {
    async function verDados() {
      const response = await apiBack.get("/ListarUsuario");
      setDados(response.data);
    }
    verDados();
  }, [dados]);

  async function handleDelete(id) {
    const resposta = await apiBack.delete("/DeletarUsuario", {
      data: {
        remover: id,
      },
    });
    toast.success(resposta.data.dados);
  }

  return (
    <div>
      <h1>Informações dos Usuarios</h1>
      {dados.map((result) => {
        return (
          <div>
            <h3>Nome do Usuario</h3>
            <h3>{result.nome}</h3>
            <h3>{result.id}</h3>
            <h3>{result.email}</h3>
            <strong>
              <Link to={`/AlterarUsuario/${result.id}`}>
                <BsFillPencilFill size="1rem" className="icon" />
              </Link>
              <BsFillTrashFill
                size="1rem"
                className="icon"
                onClick={() => handleDelete(result.id)}
              />
            </strong>
          </div>
        );
      })}
    </div>
  );
}

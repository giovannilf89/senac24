import { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import apiBack from "../../services/apiBack";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./produto.css";

export default function ListarProdutos() {
  const [dados, setDados] = useState([""]);

  useEffect(() => {
    async function verDados() {
      const response = await apiBack.get("/ListarProdutos");
      setDados(response.data);
    }
    verDados();
  }, [dados]);

  async function handleDelete(id) {
    const resposta = await apiBack.delete("/DeletarProduto", {
      data: {
        remover: id,
      },
    });
    toast.success(resposta.data.dados);
  }

  return (
    <div>
      <h1>Informações dos produtos</h1>
      <table>
        <thead>
          <tr>
            <th colspan="8">
              <h3>Produtos</h3>
              <th>Imagem</th>
              <th>Item</th>
              <th>ID</th>
              <th>Fabricante</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Editar</th>
              <th>Apagar</th>
            </th>
          </tr>
        </thead>
        {dados.map((dado) => {
          return (
            <div className="prod">
              <tbody>
                <tr>
                  <td>
                    <img
                      src={`http://localhost:3333/files/${dado.banner}`}
                      alt=""
                    />
                  </td>
                  <td>
                    {" "}
                    <h3>{dado.nome}</h3>
                  </td>
                  <td>
                    {" "}
                    <h3>{dado.id}</h3>
                  </td>
                  <td>
                    {" "}
                    <h3>{dado.fabricante}</h3>
                  </td>
                  <td>
                    <h3>{dado.quantidade}</h3>
                  </td>
                  <td>
                    <h3>{dado.preco}</h3>
                  </td>
                  <td>
                    {" "}
                    <Link to={`/AlterarProduto/${dado.id}`}>
                      <BsFillPencilFill size="1rem" className="icon" />
                    </Link>
                  </td>

                  <td>
                    {" "}
                    <BsFillTrashFill
                      size="1rem"
                      className="icon"
                      onClick={() => handleDelete(dado.id)}
                    />
                  </td>
                </tr>
              </tbody>
            </div>
          );
        })}
      </table>
    </div>
  );
}

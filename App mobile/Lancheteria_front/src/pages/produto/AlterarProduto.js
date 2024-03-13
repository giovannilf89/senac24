import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiBack from "../../services/apiBack";
import { toast } from "react-toastify";

export default function AlterarProduto() {
  const { id } = useParams();
  const [listaProduto, setListaProduto] = useState("");
  const [editarNome, setEditarNome] = useState("");
  const [editarFabricante, setEditarFabricante] = useState("");
  const [editarQuantidade, setEditarQuantidade] = useState("");
  const [editarPreco, setEditarPreco] = useState("");

  useEffect(() => {
    async function listaProduto() {
      const resposta = await apiBack.get(`/ListarProdutoUnico/${id}`);
      setListaProduto(resposta.data);
    }
    listaProduto();
  }, []);

  useEffect(() => {
    setEditarNome(listaProduto.nome);
    setEditarFabricante(listaProduto.fabricante);
    setEditarQuantidade(listaProduto.quantidade);
    setEditarPreco(listaProduto.preco);
  }, [listaProduto]);

  async function AlterarProduto(e) {
    // console.log(editarNome, editarFabricante, editarQuantidade, editarPreco)
    e.preventDefault();
    const resposta = await apiBack.put(`/AlterarProduto`, {
      id,
      editarNome,
      editarFabricante,
      editarQuantidade,
      editarPreco,
    });
    toast.success("Dados alterados com sucesso")
  }

  return (
    <div>
      <h1>Alterar Produto</h1>
      <div>
        <form onSubmit={AlterarProduto}>
          <label>Nome: </label>
          <input
            type="text"
            value={editarNome}
            onChange={(e) => setEditarNome(e.target.value)}
          />
          <br />
          <label>Fabricante: </label>
          <input
            type="text"
            value={editarFabricante}
            onChange={(e) => setEditarFabricante(e.target.value)}
          />
          <br />
          <label>Quantidade: </label>
          <input
            type="text"
            value={editarQuantidade}
            onChange={(e) => setEditarQuantidade(e.target.value)}
          />
          <br />
          <label>Preco: </label>
          <input
            type="text"
            value={editarPreco}
            onChange={(e) => setEditarPreco(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

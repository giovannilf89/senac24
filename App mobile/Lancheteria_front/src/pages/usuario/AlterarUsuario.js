import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiBack from "../../services/apiBack";
import { toast } from "react-toastify";

export default function AlterarUsuario() {
  const { id } = useParams(); //pode usar qualquer nome no lugar do id, mas precisa colocar igual na rota
  const [listaUsuario, setListaUsuario] = useState("");
  const [alteraNome, setAlteraNome] = useState("");
  const [alteraEmail, setAlteraEmail] = useState("");

  useEffect(() => {
    async function listaUsuario() {
      const resposta = await apiBack.get(`/ListarUsuarioUnico/${id}`);
      setListaUsuario(resposta.data);
    }
    listaUsuario();
  }, []);

  useEffect(() => {
    setAlteraNome(listaUsuario.nome);
    setAlteraEmail(listaUsuario.email);
  }, [listaUsuario]);

  async function AlterarUsuario(e) {
    e.preventDefault();
    const resposta = await apiBack.put(`/AlterarUsuario`, {
      id,
      alteraNome,
      alteraEmail,
    });
    toast.info(resposta.data.dados);
  }

  return (
    <div>
      <h1>Alterar Usuario</h1>
      <div>
        <form onSubmit={AlterarUsuario}>
          <label>Nome: </label>
          <input
            type="text"
            value={alteraNome}
            onChange={(e) => setAlteraNome(e.target.value)}
          />
          <br />
          <label>Email: </label>
          <input
            type="text"
            value={alteraEmail}
            onChange={(e) => setAlteraEmail(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

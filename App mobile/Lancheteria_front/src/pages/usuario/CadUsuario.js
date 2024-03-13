import React, { useState } from "react";
import "./usuario.css";
import { toast } from "react-toastify";
import apiBack from "../../services/apiBack";
import { useNavigate } from "react-router-dom";

function CadUsuario() {
  const navigation = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function Cadastro(e) {
    e.preventDefault();
    if (!nome || !email || !senha) {
      toast.warn("Campos em branco");
      return;
    }
    if (!email.includes('@')) {
      toast.error("Email must contain '@'");
      return;
    }
    try {
      const resposta = await apiBack.post(`/CriarUsuarios`, {
        nome,
        email,
        senha,
      });
      navigation("/");
      toast.success(resposta.data.dados);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }
  return (
    <div className="usuario">
      <form onSubmit={Cadastro}>
        <h1>Cadastro de Usuarios</h1>
        <label>Nome: </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        ></input>
        <br />
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <label>Senha: </label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        ></input>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
export default CadUsuario;

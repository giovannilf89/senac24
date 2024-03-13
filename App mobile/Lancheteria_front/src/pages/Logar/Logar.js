import React, { useEffect, useState } from "react";
import apiBack from "../../services/apiBack";
import "./logar.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Logar() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function AuthLogin(e) {
    e.preventDefault();
    if (!email || !senha) {
      // compara se tem campo em branco sem ir para back end
      toast.warn("Existem Campos em Branco");
      return;
    }
    try {
      const resposta = await apiBack.post(`/AutenticaUsuario`, {
        email,
        senha,
      });
      // console.log(resposta);
      navigation("/Dashboard");
      toast.info(resposta.data.dados);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <div>
      <form className="formulario" onSubmit={AuthLogin}>
        <h1>Login</h1>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <label>Senha:</label>
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
export default Logar;

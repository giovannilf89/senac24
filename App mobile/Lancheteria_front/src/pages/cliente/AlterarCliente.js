import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiBack from "../../services/apiBack";
import { toast } from "react-toastify";

export default function AlterarCliente() {
  const { id } = useParams();
  const [listaCliente, setListaCliente] = useState("");
  const [alteraEmail, setAlteraEmail] = useState("");
  const [alteraCep, setAlteraCep] = useState("");
  const [alteraRua, setAlteraRua] = useState("");
  const [alteraNumero, setAlteraNumero] = useState("");
  const [alteraBairro, setAlteraBairro] = useState("");
  const [alteraCidade, setAlteraCidade] = useState("");
  const [alteraEstado, setAlteraEstado] = useState("");

  useEffect(() => {
    async function listaCliente() {
      const resposta = await apiBack.get(`/ListarClienteUnico/${id}`);
      setListaCliente(resposta.data);
    }
    listaCliente();
  }, []);

  useEffect(() => {
    setAlteraEmail(listaCliente.email);
    setAlteraCep(listaCliente.cep);
    setAlteraRua(listaCliente.rua)
    setAlteraNumero(listaCliente.numero)
    setAlteraBairro(listaCliente.bairro)
    setAlteraCidade(listaCliente.cidade)
    setAlteraEstado(listaCliente.uf)
  }, [listaCliente]);

  async function AlterarCliente(e) {
    e.preventDefault();

    if(!alteraEmail || !alteraCep || !alteraRua || !alteraNumero || !alteraBairro || !alteraCidade || !alteraEstado){
      toast.warn("Existem campos em branco")
      return
    } 
    const resposta = await apiBack.put(`/AlterarCliente`, {
      id,
      alteraEmail,
      alteraCep,
      alteraRua,
      alteraNumero,
      alteraBairro,
      alteraCidade,
      alteraEstado,
    });
    toast.info(resposta.data.dados);
  }

  return (
    <div>
      <h1>Alterar Cliente</h1>
      <div>
        <form onSubmit={AlterarCliente}>
          <label>Email:</label>
          <input
            type="text"
            value={alteraEmail}
            onChange={(e) => setAlteraEmail(e.target.value)}
          />
          <br />
          <label>Cep:</label>
          <input
            type="text"
            value={alteraCep}
            onChange={(e) => setAlteraCep(e.target.value)}
          />
           <br />
          <label>Rua:</label>
          <input
            type="text"
            value={alteraRua}
            onChange={(e) => setAlteraRua(e.target.value)}
          />
           <br />
          <label>Numero:</label>
          <input
            type="text"
            value={alteraNumero}
            onChange={(e) => setAlteraNumero(e.target.value)}
          />
           <br />
          <label>Bairro:</label>
          <input
            type="text"
            value={alteraBairro}
            onChange={(e) => setAlteraBairro(e.target.value)}
          />
           <br />
          <label>Cidade:</label>
          <input
            type="text"
            value={alteraCidade}
            onChange={(e) => setAlteraCidade(e.target.value)}
          />
           <br />
          <label>Estado:</label>
          <input
            type="text"
            value={alteraEstado}
            onChange={(e) => setAlteraEstado(e.target.value)}
          />


          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

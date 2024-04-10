import { useState } from "react";
import { toast } from 'react-toastify'
import apiBack from "../../services/apiBack";
import { useNavigate } from "react-router-dom";


function CadUsuario() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [cpf, setCpf] = useState('')
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')

  const navigation = useNavigate()

  async function Cadastro(e) {
    e.preventDefault()
    if (!nome || !email || !senha || !cpf || !cpf || !cep || !rua || !numero || !bairro || !cidade || !uf) {
      toast.warn('Campos em branco')
      return
    }
    try{
      const resposta = await apiBack.post('/CriarCliente', {
        nome,
        email,
        senha,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        uf
      })
      navigation('/')
      toast.success(resposta.data.dados)
    } catch (err){
      toast.error(err.response.data.error)
    }
  }




  return (
    <div>
      <form onSubmit={Cadastro}>
        <h1>Cadastro de Clientes</h1>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        ></input>
        <br />
        <label>Email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <label>Senha:</label>
        <input
          type='password'
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        ></input>
        <br />
        <label>CPF:</label>
        <input
          type='number'
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        ></input>
        <br />
        <label>CEP:</label>
        <input
          type='number'
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        ></input>
        <br />
        <label>Rua:</label>
        <input
          type='text'
          value={rua}
          onChange={(e) => setRua(e.target.value)}
        ></input>
        <br />
        <label>Numero:</label>
        <input
          type='text'
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        ></input>
        <br />
        <label>Bairro:</label>
        <input
          type='text'
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        ></input>
        <br />
        <label>Cidade:</label>
        <input
          type='text'
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        ></input>
        <br />
        <label>Estado:</label>
        <input
          type='text'
          value={uf}
          onChange={(e) => setUf(e.target.value)}
        ></input>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )

}

export default CadUsuario
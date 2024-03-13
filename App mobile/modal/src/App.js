import './App.css'
import {useState} from 'react'
import Modal from 'react-modal'

function App() {

  const [modalAberto, setModalAberto] = useState(false) // false pq o modal precisa estar fechado quando renderizar
  
  const [nome, setNome] = useState('')

  function abrirModal(){
    setModalAberto(true)
  }

  function fecharModal(){
    setModalAberto(false)
  }

  function receberNome(){
    alert(nome)
  }

  return (
    <div className="containerApp">
      <h1>Modal</h1>
      <button onClick={abrirModal}>Abrir Modal</button>
      <Modal isOpen={modalAberto}><h1>Modal esta aberto</h1>
      <form onSubmit={receberNome}>
      <label>Nome:</label>
      <input
      type='text'
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      />
      <button type='submit'>Enviar</button>
      <br />
      </form>
      <button onClick={fecharModal}>Fechar Modal</button>
      </Modal>
    </div>
  );
}

export default App;

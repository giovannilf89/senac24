import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import apiBack from '../../services/apiBack'
import './produto.css'


export default function CadProdutos() {
  const [categorias, setCategorias] = useState([''])
  const [nome, setNome] = useState('')
  const [fabricante, setFabricante] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [preco, setPreco] = useState('')

  const [idCategoria, setIdCategoria] = useState('')
  const [imagem, setImagem] = useState(null)

  useEffect(() => {
    async function loadCategorias() {
      try {
        const resposta = await apiBack.get('/ListarCategorias')
        setCategorias(resposta.data)
      } catch (error) {
        console.log('Erro ao carregar categorias', error)
      }
    }
    loadCategorias()
  }, [])

  function handleImagem(e) {
    console.log('File selected:', e.target.files[0]);

    if (!e.target.files) {
      console.log('sem imagem');
      return;
    }
    const image = e.target.files[0];
    if (image.type === 'image/png' || image.type === 'image/jpeg') {
      setImagem(image);
      console.log('tratada', image);
    }
  }

  async function handleCadastrar(e) {
    e.preventDefault();
    try {
      const categoriaId = idCategoria;
      const data = new FormData();

      data.append('nome', nome);
      data.append('fabricante', fabricante);
      data.append('quantidade', quantidade);
      data.append('preco', preco);
      data.append('categoriaId', categoriaId);

      // Set the file with its name
      data.append('file', imagem, imagem.name);

      const resposta = await apiBack.post('/CriarProdutos', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(resposta.data.dados);
    } catch (err) {
      console.log(err);
    }

    setNome('');
    setFabricante('');
    setQuantidade('');
    setPreco('');
    setImagem(null);
  }


  return (

    <div className='form'>
      <div>
        <h1>Produtos</h1>
      </div>
      <div>
        <form className='formu' onSubmit={handleCadastrar} encType="multipart/form-data">
          <div className='categoria'>
          <label>Categoria:</label>
          <select
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
          >
            <option>Selecione...</option>
            {categorias.map((item) => {
              return (
                <option
                  value={item.id}>
                  {item.nome}
                </option>
              )
            })}
          </select>
          </div>
          <br />
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <br />
          <label>Fabricante:</label>
          <input
            type='text'
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
          />
          <br />
          <label>Quantidade:</label>
          <input
            type="text"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <br />
          <label>Preço</label>
          <input
            type="text"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <br />
          <label>Imagem</label>
          <input
            type="file"
            // value={setImagem}
            accept='image/jpeg, image/png'
            onChange={handleImagem}
          />
          <div className='button'>
            <button type='submit'>Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
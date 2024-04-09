import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Dashboard from "./pages/Dashboard/dashboard";
import Logar from "./pages/Logar/Logar";
import CadUsuario from "./pages/usuario/CadUsuario";
import CadCliente from "./pages/cliente/CadCliente";
import CadProdutos from "./pages/produto/CadProduto";
import Listar_Usuario from "./pages/listar/listar_usuario";
import Listar_Cliente from "./pages/listar/listar_cliente";
import Listar_Produto from "./pages/listar/listar_produto";
import AlterarUsuario from "./pages/usuario/AlterarUsuario";
import AlterarCliente from "./pages/cliente/AlterarCliente";
import AlterarProduto from "./pages/produto/AlterarProduto";
import CadPedido from "./pages/pedido/CadPedido";
import Cozinha from './pages/cozinha/Cozinha'
import ListarPedidoCozinha from './pages/listar/ListarPedidoCozinha'


export default function Rotas() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Logar />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CadUsuario" element={<CadUsuario />} />
        <Route path="/CadCliente" element={<CadCliente />} />
        <Route path="/CadProduto" element={<CadProdutos />} />
        <Route path="/Listar_cliente" element={<Listar_Cliente />} />
        <Route path="/Listar_usuario" element={<Listar_Usuario />} />
        <Route path="/Listar_produto" element={<Listar_Produto />} />
        <Route path="/AlterarUsuario/:id" element={<AlterarUsuario />} />
        <Route path="/AlterarCliente/:id" element={<AlterarCliente />} />
        <Route path="/AlterarProduto/:id" element={<AlterarProduto />} />
        <Route path="/CadPedido" element={<CadPedido />} />
        <Route path='/Cozinha' element={<Cozinha />} />
        <Route path='ListarPedidoUnico/:id' element={<ListarPedidoCozinha />} />
      </Routes>
    </BrowserRouter>
  );
}

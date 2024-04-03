import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <h1 className="header">
      <Link to="/Dashboard">Dashboard</Link>
      <Link to='/Cozinha'>Cozinha</Link>
      <Link to="/CadUsuario">Cadastro Usuario</Link>
      <Link to="/CadCliente">Cadastro Cliente</Link>
      <Link to="/CadProduto">Cadastro Produto</Link>
      <Link to="/CadPedido">Cadastrar Pedido</Link>
      <Link to="/Listar_Usuario">Listar Usuario</Link>
      <Link to="/Listar_Cliente">Listar Cliente</Link>
      <Link to="/Listar_Produto">Listar Produto</Link>
    </h1>
  );
}

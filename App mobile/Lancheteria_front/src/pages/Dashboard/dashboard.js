import "./dashboard.css";
import { useState, useEffect } from 'react';
import apiBack from '../../services/apiBack';

export default function Dashboard() {
  const [pedidosAguardando, setPedidosAguardando] = useState([]);
  const [pedidosPreparacao, setPedidosPreparacao] = useState([]);
  const [pedidosPronto, setPedidosPronto] = useState([]);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const resposta = await apiBack.get("/ListarPedidos");
        const pedidos = resposta.data;

        const pedidosAguardando = pedidos.filter(pedido => pedido.status === "Aguardando");
        const pedidosPreparacao = pedidos.filter(pedido => pedido.status === "Em preparação");
        const pedidosPronto = pedidos.filter(pedido => pedido.status === "Pedido pronto");

        setPedidosAguardando(pedidosAguardando);
        setPedidosPreparacao(pedidosPreparacao);
        setPedidosPronto(pedidosPronto);
      } catch (error) {
        console.error("Erro ao buscar os pedidos:", error);
      }
    }

    fetchPedidos();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-section">
        <h2>Aguardando</h2>
        <table>
          <thead>
            <tr>
              <th>Número do Pedido</th>
              <th>Nome do Cliente</th>
              <th>Valor total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pedidosAguardando.map(pedido => (
              <tr key={pedido.n_pedido}>
                <td>{pedido.n_pedido}</td>
                <td>{pedido.cliente?.nome}</td>
                <td>{pedido.valor_total}</td>
                <td>{pedido.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h2>Em preparação</h2>
        <table>
          <thead>
            <tr>
              <th>Número do Pedido</th>
              <th>Nome do Cliente</th>
              <th>Valor total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pedidosPreparacao.map(pedido => (
              <tr key={pedido.n_pedido}>
                <td>{pedido.n_pedido}</td>
                <td>{pedido.cliente?.nome}</td>
                <td>{pedido.valor_total}</td>
                <td>{pedido.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h2>Pedido pronto</h2>
        <table>
          <thead>
            <tr>
              <th>Número do Pedido</th>
              <th>Nome do Cliente</th>
              <th>Valor total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pedidosPronto.map(pedido => (
              <tr key={pedido.n_pedido}>
                <td>{pedido.n_pedido}</td>
                <td>{pedido.cliente?.nome}</td>
                <td>{pedido.valor_total}</td>
                <td>{pedido.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

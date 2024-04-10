import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'

import { LoginController } from './Controller/Cliente/LoginController'
import { CriarClienteController } from './Controller/Cliente/CriarClienteController'
import { ListarClienteTokenController } from './Controller/Cliente/listarClienteTokenController'

import { CriarProdutosController } from './Controller/Produtos/CriarProdutosController'

import { CriarCategoriasController } from './Controller/Categorias/CriarCategoriasController'
import { ListarCategoriasController } from './Controller/Categorias/ListarCategoriasController'

import { isAutenticado } from './middleware/isAutenticado'
import { CriarMotoqueiroController } from './Controller/Motoqueiros/CriarMotoqueirosController'
import { LoginMotoController } from './Controller/Motoqueiros/LoginMotoqueirosController'
import { CriarItemPedidoController } from './Controller/item_pedido/CriarItemPedidoController'
import { CriarPedidoController } from './Controller/Pedido/CriarPedidoController'
import { DeletarItemPedidoController } from './Controller/item_pedido/DeletarItemPedidoController'
import { CriarUsuarioController } from './Controller/usuarios/CriarUsuarioController'
import { ListarUsuariosController } from './Controller/usuarios/ListarUsuarioController'
import { ListarUsuarioUnicoController } from './Controller/usuarios/ListarUsuarioUnicoController'
import { DeletarUsuariosController } from './Controller/usuarios/DeletarUsuariosController'
import { AlterarUsuarioController } from './Controller/usuarios/AlteraUsuarioController'
import { AutenticaUsuarioController } from './Controller/usuarios/AutenticaUsuarioController'
import { DeletarClientesController } from './Controller/Cliente/DeletarClientesController'
import { ListarClienteUnicoController } from './Controller/Cliente/ListarClienteUnicoController'
import { ListarClientesController } from './Controller/Cliente/ListarClientesController'
import { ListarProdutosController } from './Controller/Produtos/ListarProdutosController'
import { AlterarClienteController } from './Controller/Cliente/AlterarClienteController'
import { EditarProdutoController } from './Controller/Produtos/EditarProdutoController'
import { ListarProdutoUnicoController } from './Controller/Produtos/ListarProdutoUnicoController'
import { DeletarProdutosService } from './Services/Produtos/DeletarProdutosServices'
import { DeletarProdutosController } from './Controller/Produtos/DeletarProdutosController'
import { ListarProdutosCategoriaController } from './Controller/Pedido/ListarProdutosCategoriaController'
import { SomarPedidoController } from './Controller/Pedido/SomarPedidoController'
import { ListarUsuarioTokenController } from './Controller/usuarios/ListarUsuarioTokenController'
import { AlterarPedidoController } from './Controller/Pedido/AlterarPedidoController'
import { FinalizarPedidosController } from './Controller/Pedido/FinalizarPedidoController'
import { ListarPedidoController } from './Controller/Pedido/ListarPedidosController'
import { ListarPedidosClienteController } from './Controller/Pedido/ListarPedidosClienteController'
import { ListarPedidoUnicoController } from './Controller/Pedido/ListarPedidoUnicoController'
import { DeletarPedidoController } from './Controller/Pedido/DeletarPedidoController'

const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))


//Rotas de Logins
router.post('/LoginUsuarios', new LoginController().handle)

//Estrutura de Cliente
router.post('/CriarCliente', new CriarClienteController().handle)
router.get('/ListarCliente', new ListarClientesController().handle)
router.delete("/DeletarCliente", new DeletarClientesController().handle);
router.put("/AlterarCliente", new AlterarClienteController().handle);
router.get(
    "/ListarClienteUnico/:id",
    new ListarClienteUnicoController().handle)

//Estrutura de Produtos
router.post('/CriarProdutos', upload.single('file'), new CriarProdutosController().handle)
router.get("/ListarProdutos", new ListarProdutosController().handle)
router.put("/AlterarProduto", new EditarProdutoController().handle)
router.get("/ListarProdutoUnico/:id", new ListarProdutoUnicoController().handle)
router.delete('/DeletarProduto', new DeletarProdutosController().handle)


//Estrutura de Categorias
router.post('/CriarCategorias', new CriarCategoriasController().handle)
router.get('/ListarCategorias', new ListarCategoriasController().handle)

//Estrutura Motoqueiros
router.post('/CriarMotoqueiros', new CriarMotoqueiroController().handle)
router.post('/LoginMotoqueiros', new LoginMotoController().handle)
export { router }

//Estutura Pedido
router.post('/CriarPedido', new CriarPedidoController().handle)
router.post('/CriarItemPedido', new CriarItemPedidoController().handle)
router.get('/ListarProdutosCategoria/:id', new ListarProdutosCategoriaController().handle)
router.delete('/DeletarItemPedido/:id', new DeletarItemPedidoController().handle)
router.get('/SomarItensPedido/:id', new SomarPedidoController().handle)
router.get('/ListarPedidoUnico/:id', new ListarPedidoUnicoController().handle)
router.put('/AlteraPedido', new AlterarPedidoController().handle)
router.put('/FinalizarPedido', new FinalizarPedidosController().handle)
router.get('/ListarPedidos', new ListarPedidoController().handle)
router.get('/ListarPedidoCliente/:clienteId', new ListarPedidosClienteController().handle)
router.delete('/DeletarPedido', new DeletarPedidoController().handle)

//Estrutura Usuarios 
router.post("/CriarUsuarios", new CriarUsuarioController().handle);
router.get(
    "/ListarUsuario",
    new ListarUsuariosController().handle
);
router.get(
    "/ListarUsuarioUnico/:id",
    new ListarUsuarioUnicoController().handle
);
router.delete(
    "/DeletarUsuario",
    new DeletarUsuariosController().handle
);
router.put(
    "/AlterarUsuario",
    new AlterarUsuarioController().handle
);
router.post("/AutenticaUsuario", new AutenticaUsuarioController().handle);
router.get('/ListarUsuarioToken', isAutenticado, new ListarUsuarioTokenController().handle)
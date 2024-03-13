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
import { EditarItemPedidoController } from './Controller/item_pedido/EditarItemPedidoController'
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
import { ListarItemPedidoController } from './Controller/item_pedido/ListarItemPedidoController'

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
router.get("/ListarProdutos",new ListarProdutosController().handle)
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

//Estrutura Item_pedido
router.post('/CriarItemPedido', new CriarItemPedidoController().handle)
router.put('/EditarItemPedido', new EditarItemPedidoController().handle)
router.delete('/DeletarItemPedido', new DeletarItemPedidoController().handle)
router.get('/ListarItemPedido', new ListarItemPedidoController().handle)

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
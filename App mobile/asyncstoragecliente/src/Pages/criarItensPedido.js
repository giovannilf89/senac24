import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import apiLocal from "../../apiLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function CriarItensPedido() {
  const [pedidoId, setPedidoId] = useState("");
  const [user, setUser] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriaId, setCategoriaId] = useState("");
  const [produtosCategoria, setProdutosCategoria] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidadeF, setQuantidadeF] = useState("");

  useEffect(() => {
    async function getPedidoId() {
      const idp = await AsyncStorage.getItem("@idpedido");
      const pedidoId = JSON.parse(idp);
      setPedidoId(pedidoId);
    }
    getPedidoId();
  }, []);

  useEffect(() => {
    async function handleName() {
      const iNome = await AsyncStorage.getItem("@nome");
      const nome = JSON.parse(iNome);
      setUser(nome);
    }
    handleName();
  }, []);

  useEffect(() => {
    async function LerCategorias() {
      try {
        const resposta = await apiLocal.get("/ListarCategorias");
        setCategorias(resposta.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    LerCategorias();
  }, []);

  useEffect(() => {
    async function lerProdutosCategoria() {
      try {
        if (!categoriaId) {
          return;
        }
        const resposta = await apiLocal.get(
          `/ListarProdutosCategoria/${categoriaId}`
        );
        setProdutosCategoria(resposta.data);
      } catch (err) {
        console.log(err);
      }
    }
    lerProdutosCategoria();
  }, [categoriaId]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  async function handleItemPedido() {
    try {
      const prodExt = produtosCategoria.filter(
        (item) => item.id === idItemProduto
      );
      const valor = Number(prodExt.map((item) => item.preco) * quantidadeF);
      const quantidade = Number(quantidadeF);
      const pedidoId = pedidos.id;
      const produtoId = idItemProduto;


      const resposta = await apiLocal.post("/CriarItemPedido", {
        produtoId,
        pedidoId,
        quantidade,
        valor,
      });
      let dados = {
        id: resposta.data.id,
        produto: resposta.data.produtos.nome,
        quantidade: resposta.data.quantidade,
        valor: Number(resposta.data.valor),
      };
      setItensPedido((oldArray) => [...oldArray, dados]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Pedido N:{pedidoId}</Text>
      <Text>Nome: {user}</Text>
      <Text>Itens do Pedido</Text>

      {/* Dropdown de categorias */}
      <Text>Selecionar categoria</Text>
      <Picker
        selectedValue={categoriaId}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setCategoriaId(itemValue)}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        {categorias.map((categoria, index) => (
          <Picker.Item
            key={index}
            label={categoria.nome}
            value={categoria.id}
          />
        ))}
      </Picker>

      {/* Dropdown de produtos */}
      {produtosCategoria.length > 0 && (
        <>
          <Text>Selecionar produto</Text>
          <Picker
            selectedValue={produtoSelecionado}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) =>
              setProdutoSelecionado(itemValue)
            }
          >
            <Picker.Item label="Selecione um produto" value="" />
            {produtosCategoria.map((produto, index) => (
              <Picker.Item
                key={index}
                label={produto.nome}
                value={produto.id}
              />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            onChangeText={setQuantidadeF}
            value={quantidadeF}
          />
          <TouchableOpacity onPress={handleItemPedido}>
            <Text>Adicionar ao Pedido</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

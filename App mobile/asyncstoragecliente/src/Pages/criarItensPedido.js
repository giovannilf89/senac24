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
import { useNavigation } from "@react-navigation/native";

export default function CriarItensPedido() {
  const [pedidoId, setPedidoId] = useState("");
  const [user, setUser] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriaId, setCategoriaId] = useState("");
  const [produtosCategoria, setProdutosCategoria] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidadeF, setQuantidadeF] = useState("");
  const [idItemProduto, setIdItemProduto] = useState("");
  const [idNpedido, setIdnPedido] = useState("");
  const [itensPedido, setItensPedido] = useState([]);
  const [valorTotal, setValorTotal] = useState(0); // Added state for total value


  const navigation = useNavigation()

  useEffect(() => {
    async function fetchData() {
      try {
        const idp = await AsyncStorage.getItem("@idpedido");
        const idNpedido = JSON.parse(idp);
        setIdnPedido(idNpedido);

        const completo = await AsyncStorage.getItem("@idpedidocompleto");
        const pedidoId = JSON.parse(completo);
        setPedidoId(pedidoId);

        const iNome = await AsyncStorage.getItem("@nome");
        const nome = JSON.parse(iNome);
        setUser(nome);

        const resposta = await apiLocal.get("/ListarCategorias");
        setCategorias(resposta.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
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

  async function handleItemPedido() {
    try {
      const prodExt = produtosCategoria.find((item) => item.id === idItemProduto);
      const valorItem = Number(prodExt.preco) * quantidadeF;
      const quantidade = Number(quantidadeF);
      const produtoId = idItemProduto;
  
      const resposta = await apiLocal.post("/CriarItemPedido", {
        produtoId,
        pedidoId,
        quantidade,
        valor: valorItem,
      });
  
      let dados = {
        id: resposta.data.id,
        produto: resposta.data.produtos.nome,
        quantidade: resposta.data.quantidade,
        valor: Number(resposta.data.valor),
      };
      setItensPedido((oldArray) => [...oldArray, dados]);
      setValorTotal((prevTotal) => prevTotal + valorItem); // Update total value
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
  

  async function handleApagarItem(id) {
    try {
      await apiLocal.delete(`/DeletarItemPedido/${id}`);
      setItensPedido(itensPedido.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  useEffect(() => {
    async function somarItensPedido() {
      try {
        const id = pedidoId.id;
        const resposta = await apiLocal.get(`/SomarItensPedido/${id}`);
        setValorTotal(resposta.data.total);
      } catch (error) {
        console.log("Error fetching total value:", error);
      }
    }
  
    somarItensPedido();
  
  }, [pedidoId, itensPedido]);

  async function FinalizarPedido(){
    try {
      const id = pedidoId
      const draft = false
      const aceito = false
      const resposta = await apiLocal.put('/FinalizarPedido', {
        id,
        draft,
        aceito
      })
      navigation.navigate('Dashboard')
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Pedido N:{idNpedido}</Text>
      <Text>Nome: {user}</Text>
      <Text>Itens do Pedido</Text>

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

      {produtosCategoria.length > 0 && (
        <>
          <Text>Selecionar produto</Text>
          <Picker
            selectedValue={idItemProduto}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) =>
              setIdItemProduto(itemValue)
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
            <Text>Adicionar Produto</Text>
          </TouchableOpacity>
        </>
      )}
      {itensPedido.map((item) => (
        <React.Fragment key={item.id}>
          {item.length !== 0 && (
            <>
              <Text>
                {item.produto} - {item.quantidade} -{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(`${item.valor}`)}
              </Text>
              <TouchableOpacity onPress={() => handleApagarItem(item.id)}>
                <Text>Apagar</Text>
              </TouchableOpacity>
            </>
          )}
        </React.Fragment>
      ))}
      {itensPedido.length > 0 && (
        <><Text>
          Valor total:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(valorTotal)}
        </Text><TouchableOpacity onPress={FinalizarPedido}><Text>Finalizar Pedido</Text></TouchableOpacity></>
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

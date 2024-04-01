import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Modal, View, Pressable, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import apiLocal from '../../apiLocal';
import firebase from '../../FireBaseConnect';
import { useNavigation } from '@react-navigation/native';


export default function Dashboard() {
  const [user, setUser] = useState('');
  const [pedidoS, setPedidoS] = useState('');
  const [id, setId] = useState('');
  const [localizacao, setLocalizacao] = useState(null);
  const [dados, setDados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [noPedidoMsg, setNoPedidoMsg] = useState('');


  const navigation = useNavigation()

  useEffect(() => {
    async function handleName() {
      const iNome = await AsyncStorage.getItem('@nome');
      const nome = JSON.parse(iNome);
      setUser(nome);
    }
    handleName();
  }, []);

  useEffect(() => {
    async function handleId() {
      const iId = await AsyncStorage.getItem('@Id');
      const id = JSON.parse(iId);
      setId(id);
    }
    handleId();
  }, []);

  async function handleRota() {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const positionAtual = await getCurrentPositionAsync();
        const { latitude, longitude } = positionAtual.coords;
        setLocalizacao({ latitude, longitude });
        let moto = await firebase.database().ref('motoqueiros');
        let chave = moto.push().key;

        moto.child(chave).set({
          nome: user,
          id: id,
          localizacao: { latitude, longitude }
        });
      } else {
        console.error("Permissões de localização não concedidas.");
      }
    } catch (error) {
      console.error("Erro ao obter a localização:", error.message);
    }
  }

  async function buscarPedido() {
    try {
      const pedido = Number(pedidoS);
      const resposta = await apiLocal.post('/ListarPedidoUnico', {
        pedido
      });
      // console.log("Resposta da API:", resposta.data);

      if (resposta.data && resposta.data.clientes) {
        setDados([resposta.data]); // Coloque a resposta em um array para FlatList
        setModalVisible(true);
        setNoPedidoMsg(''); // Limpa a mensagem de nenhum pedido encontrado se houver dados
      } else {
        setDados([]); // Limpa os dados se nenhum pedido for encontrado
        setNoPedidoMsg("Nenhum pedido encontrado.");
        setModalVisible(true);

      }
    } catch (error) {
      console.error("Erro ao buscar pedido:", error.message);
      Alert.alert("Erro ao buscar pedido.");
    }
  }

  async function handleAceitar() {
    try {
      const alteraEntregador = await AsyncStorage.getItem('@nome');
      if (alteraEntregador) {
        const n_pedido = parseInt(pedidoS, 10);
        const resposta = await apiLocal.put('/AlteraPedido', {
          n_pedido,
          alteraStatus: "Saiu para entrega",
          alteraEntregador
        });
        setModalVisible(false)
        setPedidoS('')
      } else {
        console.log('Nome do usuário não encontrado no AsyncStorage');
      }
    } catch (err) {
      console.log(err.response.data)
    }}
    

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.dash}>Dashboard</Text>
        <Text style={styles.nome}> Seja bem-vindo, {user}</Text>

        <Text>Pedido:</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite número do pedido..'
          value={pedidoS}
          onChangeText={setPedidoS}
        />

        <TouchableOpacity style={styles.button} onPress={buscarPedido}>
          <Text>Enviar</Text>
        </TouchableOpacity>

        <Text>Rota:</Text>
        <TouchableOpacity style={styles.button} onPress={handleRota}>
          <Text>Iniciar</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Pedidos</Text>

            {dados.length > 0 ? (
              <FlatList
                data={dados}
                keyExtractor={(item) => item.n_pedido.toString()}
                renderItem={({ item }) => (
                  <View style={styles.clienteContainer}>
                    <Text>Nome do cliente: {item.clientes.nome}</Text>
                    <Text>ID do pedido: {item.n_pedido}</Text>
                    <Text>Rua: {item.clientes.rua}</Text>
                    <Text>No: {item.clientes.numero}</Text>
                    <Text>Bairro: {item.clientes.bairro}</Text>
                    <Text>Cidade: {item.clientes.cidade}</Text>
                    <Text>Estado: {item.clientes.uf}</Text>
                    {/* Renderize outros dados do cliente e do pedido conforme necessário */}
                  </View>
                )}
              />
            ) : (
              <Text>{noPedidoMsg}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleAceitar}>
              <Text>Aceitar entrega</Text>
            </TouchableOpacity>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dash: {
      fontSize: 25,
      marginBottom: 20,
    },
    nome: {
      fontSize: 15,
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      marginVertical: 10,
      padding: 5,
      width: 200,
      borderRadius: 8,
    },
    button: {
      borderWidth: 1,
      width: 100,
      alignItems: 'center',
      marginVertical: 10,
      borderRadius: 8,
      padding: 4,
    },
    modalView: {
      flex: 1,
      backgroundColor: 'white',
      padding: 35,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    clienteContainer: {
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
    },
  });
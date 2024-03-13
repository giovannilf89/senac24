import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../FireBaseConnect';

import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'

export default function Dashboard() {


  const [user, setUser] = useState('')
  const [pedido, setPedido] = useState('')
  const [id, setId] = useState('')

  const [localizacao, setLocalizacao] = useState(null)

  // Identificação do Motoqueiro
  // const motoqueiros = 1


  useEffect(() => {
    async function requisitarLocal() {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
          const positionAtual = await getCurrentPositionAsync();
          console.log("Position atual:", positionAtual); // Adicione este log para debug
  
          // Extrair latitude e longitude
          const { latitude, longitude } = positionAtual.coords;
  
          // Definir o estado apenas com latitude e longitude
          setLocalizacao({ latitude, longitude });
        } else {
          console.error("Permissões de localização não concedidas.");
        }
      } catch (error) {
        console.error("Erro ao obter a localização:", error.message);
      }
    }
  
    requisitarLocal();
  }, []);
  
  useEffect(() => {
    console.log("Localizacao no estado:", localizacao);
  }, [localizacao]);
  


  useEffect(() => {
    async function handleName() {
      const iNome = await AsyncStorage.getItem('@nome')
      const nome = JSON.parse(iNome)
      setUser(nome)
        //  console.log(nome)
    }
    handleName()
  })

  useEffect(() => {
    async function handleId() {
      const iId = await AsyncStorage.getItem('@Id')
      const id = JSON.parse(iId)
      setId(id)
      // console.log(id)
    }
    handleId()
  })

  async function handlePedido() {
    alert('clicou')
  }

  async function handleRota() {
      let moto = await firebase.database().ref('motoqueiros')
      let chave = moto.push().key

      moto.child(chave).set({
        nome: user,
        id: id,
        localizacao: localizacao
      })
    }



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.dash}>Dashboard</Text>
      <Text style={styles.nome}> Seja bem-vindo, {user}</Text>

      <Text>Pedido:</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite numero do pedido..'
        value={pedido}
        onChangeText={setPedido}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={handlePedido}>
        <Text>Enviar</Text>
      </TouchableOpacity>

      <Text>Rota:</Text>
      <TouchableOpacity style={styles.button} onPress={handleRota}>
        <Text>Iniciar</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dash: {
    fontSize: 25,
    marginBottom: 20,
    marginTop: 170,
  },
  nome: {
    fontSize: 15,
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 5,
    width: 200,
    borderRadius: 8,
    paddingLeft: 10,
  },
  button: {
    borderWidth: 1,
    width: 100,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 8,
    padding: 4,
  },
})
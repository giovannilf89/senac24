
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput, View } from 'react-native';
import apiLocal from '../../apiLocal';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const [nusuario, setNusuario] = useState('')
  const [senha, setSenha] = useState('')
  const [respNome, setRespNome] = useState('')
  const [respToken, setRespToken] = useState('')
  const [respId, setRespId] = useState('')

  const navigation = useNavigation()

  async function handleLogin() {
    // console.log(nusuario, senha)
    try {
      const resposta = await apiLocal.post('/LoginMotoqueiros', {
        nusuario,
        senha
      })
      // console.log(resposta.data.id)
      await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
      await AsyncStorage.setItem('@token', JSON.stringify(resposta.data.token))
      await AsyncStorage.setItem('@Id', JSON.stringify(resposta.data.id))

      navigation.navigate('Dashboard')

      setNusuario('') // limpa campo apos login
      setSenha('')

    } catch (error) {
      // console.log(error)
      alert("Usuario/Senha incorretos")
    }
  }

  async function handleAsyncNome() {
    // alert ('Clicou')
    const iNome = await AsyncStorage.getItem('@nome')
    const nome = JSON.parse(iNome)
    setRespToken('') // limpa token quando recebe nome
    setRespNome(nome)
  }
  async function handleAsyncToken() {
    // alert ('Clicou')
    const iToken = await AsyncStorage.getItem('@token')
    const token = JSON.parse(iToken)
    setRespNome('')
    setRespToken(token)
  }
  useEffect(() => {
    async function handleAsyncId(){
      const iId = await AsyncStorage.getItem('@Id')
      const Id = JSON.parse(iId)
      setRespId(Id)
    }
    handleAsyncId
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Login Motoqueiro</Text>
      <Text>Usuario:</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite seu usuario..'
        value={nusuario}
        onChangeText={setNusuario}
      ></TextInput>

      <Text>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite sua senha..'
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonnome} onPress={handleAsyncNome} >
        <Text>Async_nome</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttontoken} onPress={handleAsyncToken}>
        <Text>Async_token</Text>
      </TouchableOpacity>
      <View style={styles.textoview}>
        <Text style={styles.textoresp}>{respNome}</Text>
        <Text style={styles.textoresp}>{respToken}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 5,
    width: 200,
    borderRadius: 8,
    paddingLeft: 10,
  },
  titulo: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
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
  buttonnome: {
    borderWidth: 1,
    width: 130,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    padding: 4,
  },
  buttontoken: {
    borderWidth: 1,
    width: 130,
    alignItems: 'center',
    borderRadius: 8,
    padding: 4,
  },
  textoview: {
    width: 300,
    alignItems: 'center',
    margin: 10,
  },
  textoresp: {
    fontSize: 20,
  }
});

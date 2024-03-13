
import { StyleSheet, Text, TouchableOpacity, StatusBar, TextInput, SafeAreaView, Keyboard, View } from 'react-native';
import firebase from './FireBaseConnect';
import { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather'

console.disableYellowBox = true


export default function App() {

  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [vendedores, setVendedores] = useState([''])

  // Identificação do vendedor
  //const vendedor = 13

  async function handleCriar() {
    if (!nome || !cidade) {
      alert('Campos Vazios')
    }
    let usuarios = await firebase.database().ref('vendedores') // nó principal e nó filho
    let chave = usuarios.push().key

    usuarios.child(chave).set({
      nome: nome,
      cidade: cidade
    })

    setNome('')
    setCidade('')
    Keyboard.dismiss()
  }

  useEffect(() => {
    async function buscarVendedores() {
      await firebase.database().ref('vendedores').on('value', (snapshot) => { //snapshot é valor que recebo quando faço a busca no db
        setVendedores(['']) // para limpar o forEach e manter os oldarray (pq duplica se nao limpar)
        snapshot?.forEach((item) => {   //interroção para verificar se veio vaziu ou com erro, forEach laço de repetição, passa por todo conteudo do snapshot pegando as infos  ((qualquer nome))

          let data = {
            key: item.key,
            nome: item.val().nome,
            cidade: item.val().cidade
          }
          setVendedores(oldArray => [...oldArray, data])
          // console.log(data)
        })
      })
    }
    buscarVendedores()
  }, [])

  async function handleDelete(key) {
    // alert(key)
    await firebase.database().ref('vendedores').child(key).remove()
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#000000' barStyle={'default'} translucent={false} />

      <Text style={styles.titulo}>Usando o Firebase</Text>

      <Text style={styles.nome}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      ></TextInput>

      <Text style={styles.nome}>Cidade:</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={handleCriar}>
        <Text>Enviar</Text>
      </TouchableOpacity>

      {vendedores.map((item) => {
        return (
          <View>
            {item.length !== 0 && (  // se for diferente de zero renderiza, se nao tiver info nao renderiza nome, cidade
              <>
                <Text>Nome: {item.nome}</Text>
                <Text>Cidade: {item.cidade}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.key)}>
                  <Feather name='trash-2' size={30}/>
                </TouchableOpacity>
              </>
            )}
          </View>
        )
      })}

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
  titulo: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 5,
    width: 200,
    borderRadius: 8,
    paddingLeft: 10,
  }, button: {
    borderWidth: 1,
    width: 100,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 8,
    padding: 4,
  },
  titulo: {
    fontSize: 25,
    marginBottom: 15,
  },
  nome: {
    fontSize: 15,
  },
});

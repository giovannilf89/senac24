import { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function App() {

  const [textoEntrada, setTextoEntrada] = useState('')
  const [qrValor, setQrValor] = useState('')
  const [terValor, setTerValor ] = useState(false)


  function handleGerar() {
    setQrValor(textoEntrada)
    setTerValor(true)
    setTextoEntrada('')
    Keyboard.dismiss()
  }

  function handleLimpar(){
    setTerValor(false)
    setQrValor('')
    setTextoEntrada('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000000' barStyle='light-content' translucent={false} />
      <Text>Gerando QRCode</Text>
      {qrValor.length > 0 && ( //se for verdadeiro executa o codigo, protecao para caso venha vazio
             <QRCode 
             value={qrValor ? qrValor : 'NA'} // adiciona valor QR Code
             size={200}
             color='#000000'
             backgroundColor='#FFFFFF'
             />
      )}

      
      <TextInput
        style={styles.entradaDados}
        placeholder='Entre com um valor'
        value={textoEntrada}
        onChangeText={setTextoEntrada}
      />

      <TouchableOpacity 
      disabled={terValor === true} 
      onPress={handleGerar} 
      style={styles.buttonGerar}>
        <Text style={[styles.textoGerar, {opacity: terValor === true ? 0.3 : 1}]}>
          Gerar QRCode
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={handleLimpar} 
      style={styles.buttonLimpar}>
        <Text style={[styles.textoLimpar, {opacity: terValor === false ? 0.3 : 1}]}>
          Limpar QRCode
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloTexto: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  entradaDados: {
    marginTop: 30,
    borderWidth: 1,
    height: 40,
    width: '70%',
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 10
  },
  buttonGerar: {
    backgroundColor: '#005CFF',
    marginTop: 20,
    height: 45,
    width: '70%',
    borderRadius: 10,
  },
  textoGerar: {
    textAlign: 'center',
    padding: 6.25,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  buttonLimpar: {
    backgroundColor: '#DB063E',
    marginTop: 20,
    height: 45,
    width: '70%',
    borderRadius: 10,
  },
  textoLimpar: {
    textAlign: 'center',
    padding: 6.25,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});
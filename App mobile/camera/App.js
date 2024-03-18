import { StatusBar, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {Camera, CameraType} from 'expo-camera'

export default function App() {

  const [type, setType] = useState(CameraType.back) //classe CameraType.back verifica qual camera esta ativa
  const [permission, requestPermission] = Camera.useCameraPermissions() // permissão

  if(!permission){
    //CAmera permissions are still loading
    return <View/>
  }

  if(!permission.granted){
    return(
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>We need you permission to show the camera</Text>
        <Button onPress={requestPermission} title='Solicitar permissao'/>
      </View>
    )
  }

  function toggleCAmeraType(){
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back)) 
    //operação ternária, tipo um if else mas em 1 linha. Faz flip da camera front e back
  }

  return (
    <View style={styles.container}>
     <Camera style={styles.camera} type={type}>
     <StatusBar backgroundColor='#0000ff'barStyle='light-content' translucent={false} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCAmeraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
     </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
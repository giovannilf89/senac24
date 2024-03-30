import { useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import apiDental from '../services/apiDental'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigation = useNavigation()

    async function handleLogin() {
        try {
          const resposta = await apiDental.post('/LoginUsuario', {
            email,
            senha
          })
            

            await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
            navigation.navigate('Dashboard')
            setEmail('')
            setSenha('')
        } catch (error) {
            alert(error.response.data.error)
        }


    }

    function handleCadastrar(){
        navigation.navigate('CadUser')
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <Text style={styles.dental}>AppDental</Text>
            <Text style={styles.login}>Faça seu login</Text>
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite seu email'
                value={email}
                onChangeText={setEmail}
            ></TextInput>

            <Text>Senha:</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder='Digite sua senha'
                value={senha}
                onChangeText={setSenha}
            ></TextInput>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text>Logar</Text>
            </TouchableOpacity>

            <Text>Novo por aqui? Crie seu cadastro</Text>

            <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
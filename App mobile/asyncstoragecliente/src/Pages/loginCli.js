import { useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiLocal from '../../apiLocal';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function LoginCli() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')



    const navigation = useNavigation()

    async function handleLogin() {
        // console.log(email, senha)
        try {
            const resposta = await apiLocal.post('/LoginUsuarios', {
                email,
                senha
            })
            // console.log(resposta)
            await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
            await AsyncStorage.setItem('@id', JSON.stringify(resposta.data.id))
            
            navigation.navigate('Dashboard')

            setEmail('') // limpa campo apos login
            setSenha('')

        } catch (error) {
            // console.log(error)
            alert("Usuario/Senha incorretos")
        }

    }
    async function handleCriar() {
        // alert("clicou")
        navigation.navigate('CriarCli')

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <Text style={styles.titulo}>Login Cliente</Text>

            <Text>Usuario:</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite seu usuario..'
                value={email}
                onChangeText={setEmail}
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
        <Text style={styles.texto}>Novo por aqui? Crie uma conta</Text>
            <TouchableOpacity style={styles.button} onPress={handleCriar}>
                <Text>Criar conta</Text>
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
})
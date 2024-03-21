import { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigation = useNavigation()

    async function handleLogin() {
       console.log(email,senha)

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
                style={styles.input}
                placeholder='Digite sua senha'
                value={senha}
                onChangeText={setSenha}
            ></TextInput>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text>Logar</Text>
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
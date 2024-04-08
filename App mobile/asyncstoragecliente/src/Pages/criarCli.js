import { useState } from 'react'
import { SafeAreaView, StatusBar, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import apiLocal from '../../apiLocal'
import { useNavigation } from '@react-navigation/native';


export default function CriarCli() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')

    const navigation = useNavigation()

    async function handleCriar() {
        try {
            await apiLocal.post('/CriarCliente', {
                nome,
                email,
                senha,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                uf
            })
            navigation.navigate('LoginCli')
        } catch (error) {
            alert(error.response.data.resposta)
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <StatusBar style="auto" />
                <Text style={styles.titulo}>Criar conta</Text>

                <Text>Nome:</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                ></TextInput>

                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                ></TextInput>

                <Text>Senha:</Text>
                <TextInput
                    style={styles.input}
                    value={senha}
                    onChangeText={setSenha}
                ></TextInput>

                <Text>CPF:</Text>
                <TextInput
                    style={styles.input}
                    value={cpf}
                    onChangeText={setCpf}
                ></TextInput>

                <Text>CEP:</Text>
                <TextInput
                    style={styles.input}
                    value={cep}
                    onChangeText={setCep}
                ></TextInput>

                <Text>Rua:</Text>
                <TextInput
                    style={styles.input}
                    value={rua}
                    onChangeText={setRua}
                ></TextInput>

                <Text>Numero:</Text>
                <TextInput
                    style={styles.input}
                    value={numero}
                    onChangeText={setNumero}
                ></TextInput>

                <Text>Bairro:</Text>
                <TextInput
                    style={styles.input}
                    value={bairro}
                    onChangeText={setBairro}
                ></TextInput>

                <Text>Cidade:</Text>
                <TextInput
                    style={styles.input}
                    value={cidade}
                    onChangeText={setCidade}
                ></TextInput>

                <Text>Estado:</Text>
                <TextInput
                    style={styles.input}
                    value={uf}
                    onChangeText={setUf}
                ></TextInput>

                <TouchableOpacity style={styles.button} onPress={handleCriar}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </ScrollView>
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
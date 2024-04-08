import { SafeAreaView, StatusBar, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react';
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../FireBaseConnect'
import { useNavigation } from '@react-navigation/native';
import apiLocal from '../../apiLocal';


export default function Dashboard() {

    const [clienteId, setClienteId] = useState('')
    const [user, setUser] = useState('')
    const [latitudeFb, setLatituteFb] = useState('')
    const [longitudeFb, setLongitudeFb] = useState('')
    const [pedido, setPedido] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        async function acompanhamentoPedido() {
            await firebase.database().ref('motoqueiros').on('value', (snapshot) => { //snapshot funcao anonima para armazenar os dados consultados (nome convencao)
                snapshot?.forEach((item) => { // loop para consultar os valores e armazena item
                    let data = { // armazena os dados colhidos
                        // dados: item.val() ve toda estrutura que ele esta no firebase, para mapear ex: data.dados.localizacao
                        key: item.key,
                        latitude: item.val().localizacao.latitude,   // primeiro nome eu crio, segundo valor firebase
                        longitude: item.val().localizacao.longitude
                    }
                    setLatituteFb(data.latitude)
                    setLongitudeFb(data.longitude)
                    // setMotoqueiros(oldArray => [...oldArray, data])
                    // console.log(data)
                })
            })
        }
        acompanhamentoPedido()
    }, [])


    useEffect(() => {
        async function handleName() {
            const iNome = await AsyncStorage.getItem('@nome')
            const nome = JSON.parse(iNome)
            setUser(nome)
            //    console.log(nome)
        }
        handleName()
    })



    useEffect(() => {
        async function getId() {
            const id = await AsyncStorage.getItem('@id')
            const token = JSON.parse(id)
            setClienteId(token)
        }
        getId()
    }, [clienteId])




    async function handlePedido() {
        try {
            const resposta = await apiLocal.post('/CriarPedido', {
                clienteId
            })
            setPedido(resposta)
            await AsyncStorage.setItem('@idpedido', JSON.stringify(resposta.data.n_pedido))
            await AsyncStorage.setItem('@idpedidocompleto', JSON.stringify(resposta.data.id))
        } catch (error) {
            console.log(error)
        }


        navigation.navigate('CriarItensPedido')
    }

    function handleListar() {
        navigation.navigate('ListarPedido')
    }



    async function handleLogoff() {
        try {
            await AsyncStorage.removeItem('@id');
            setClienteId('');
            await AsyncStorage.removeItem('@nome')
            setUser('')
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginCli' }]
            });
        } catch (error) {
            console.log('Erro ao fazer logoff:', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.dash}>Dashboard</Text>
            <Text style={styles.nome}> Seja bem-vindo, {user}</Text>



            <View>
                <Text style={styles.text}>Latitute: {longitudeFb}</Text>
                <Text style={styles.text}>Longitude: {latitudeFb}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handlePedido}>
                <Text>Efetuar Pedido</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleListar}>
                <Text>Listar Pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogoff}>
                <Text>Logoff</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
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
    text: {
        fontSize: 15,
    },
    button: {
        borderWidth: 1,
        width: 100,
        alignItems: 'center',

    }

})
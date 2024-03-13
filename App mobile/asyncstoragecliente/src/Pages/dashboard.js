import { SafeAreaView, StatusBar, Text, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react';
import {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../FireBaseConnect'


export default function Dashboard() {

    const [user, setUser] = useState('')
    const [latitudeFb, setLatituteFb] = useState('')
    const [longitudeFb, setLongitudeFb] = useState('')

    

    useEffect(() => {
        async function acompanhamentoPedido(){
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
                    console.log(data)
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
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.dash}>Dashboard</Text>
            <Text style={styles.nome}> Seja bem-vindo, {user}</Text>



            <View>
                <Text style={styles.text}>Latitute: {longitudeFb}</Text>
                <Text style={styles.text}>Longitude: {latitudeFb}</Text>
            </View>

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
    }
})
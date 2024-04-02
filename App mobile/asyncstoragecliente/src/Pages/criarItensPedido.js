import { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import apiLocal from '../../apiLocal'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from './dashboard';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export default function CriarItensPedido() {
    
    const [pedidoId, setPedidoId] = useState('')
    const [user, setUser] = useState('')


  useEffect(() => {
    async function getPedidoId(){
        const idp = await AsyncStorage.getItem('@idpedido')
        const pedidoId = JSON.parse(idp)
        setPedidoId(pedidoId)
    }
    getPedidoId()
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
        <SafeAreaView>
            <StatusBar style='auto' />
            <Text>Pedido N:{pedidoId}</Text>
            <Text>Nome: {user}</Text>
            <Text>Itens do Pedido</Text>
        </SafeAreaView>
    )
}
import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import apiLocal from '../../apiLocal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

export default function ListarPedidosCliente() {
    const [clienteId, setClienteId] = useState('')
    const [list, setList] = useState(null)

    const navigation = useNavigation()

    useEffect(() => {
        async function handleClienteId() {
            const id = await AsyncStorage.getItem('@id')
            const cliId = JSON.parse(id)
            setClienteId(cliId)
        }
        handleClienteId()
    },[])

    useEffect(() => {
        async function Listar() {
            setList('')
            try {
                if (!clienteId) {
                    return
                }
                const resposta = await apiLocal.get(`/ListarPedidoCliente/${clienteId}`)
                setList(resposta.data)

            } catch (error) {
                console.log(error)
            }
        }
        Listar()
    }, [clienteId])

    function handleVoltar() {
        setList('')
        navigation.navigate('Dashboard')
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>
                <Text>Pedidos Efetuados</Text>
                {list !== null ? (
                    list.length > 0 ? (
                        list.map((item, index) => (
                            <React.Fragment key={index}>
                                <Text>{item.n_pedido}</Text>
                                <Text>{item.status}</Text>
                                <Text>{item.entregador}</Text>
                                <Text>{item.valor_total}</Text>
                            </React.Fragment>
                        ))
                    ) : (
                        <Text>Nenhum pedido encontrado</Text>
                    )
                ) : (
                    <Text>Carregando..</Text>
                )}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={handleVoltar}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
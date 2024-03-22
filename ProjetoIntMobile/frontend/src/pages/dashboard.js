import {StatusBar, StyleSheet, Text, SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export default function Dashboard(){

    const [user, setUser] = useState('')

    useEffect(() => {
        async function handleName(){
            const iNome = await AsyncStorage.getItem('@nome')
            const nome = JSON.parse(iNome)
            setUser(nome)
        }
        handleName()
    },[])

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <Text>Seja bem-vindo, {user}</Text>
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

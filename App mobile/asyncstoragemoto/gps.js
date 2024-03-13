import { getCurrentPositionAsync, requestBackgroundPermissionsAsync } from 'expo-location'
import React, { useState, useEffect } from 'react'



export default function Gps(){
    const [localizacao, setLocalizacao] = useState(null)

    useEffect(() => {
        async function requistarLocal(){
            const { granted } = await requestBackgroundPermissionsAsync()
            if (granted) {
                const positionAtual = await getCurrentPositionAsync()
                setLocalizacao(positionAtual)
            }
            console.log(positionAtual)
        }
        requistarLocal()
    }, [])
}
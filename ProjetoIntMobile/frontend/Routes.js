import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './src/pages/loginUser'

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            >

            </Stack.Screen>
        </Stack.Navigator>
    )
}
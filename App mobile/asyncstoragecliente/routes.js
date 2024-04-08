import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginCli from "./src/Pages/loginCli";
import Dashboard from "./src/Pages/dashboard";
import CriarCli from "./src/Pages/criarCli";
import CriarItensPedido from "./src/Pages/criarItensPedido";
import ListarPedidosCliente from "./src/Pages/ListarPedido";

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='LoginCli'
                component={LoginCli}
                options={{ headerShown: false }}>
            </Stack.Screen>
         <Stack.Screen 
             name='Dashboard'
             component={Dashboard}
             options={{ headerShown: false }}>
         </Stack.Screen>
         <Stack.Screen 
             name='CriarCli'
             component={CriarCli}
             options={{ headerShown: false }}>
         </Stack.Screen>
         <Stack.Screen 
             name='CriarItensPedido'
             component={CriarItensPedido}
             options={{ headerShown: false }}>
         </Stack.Screen>
         <Stack.Screen 
             name='ListarPedido'
             component={ListarPedidosCliente}
             options={{ headerShown: false }}>
         </Stack.Screen>
     </Stack.Navigator>
    )
}
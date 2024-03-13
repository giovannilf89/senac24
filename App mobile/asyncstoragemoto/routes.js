import React from "react";
import { createNativeStackNavigator} from '@react-navigation/native-stack'


import Login from "./src/pages/login";
import Dashboard from "./src/pages/dashboard";

const Stack = createNativeStackNavigator()

export default function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name='Login'
            component={Login}
            options={{headerShown: false}}
            />
             <Stack.Screen
            name='Dashboard'
            component={Dashboard}
            options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
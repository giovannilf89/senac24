import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './src/pages/loginUser'
import Dashboard from './src/pages/dashboard'
import CadUser from './src/pages/createUser'
import CreateSchedule from './src/pages/createSchedule'

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            >
            </Drawer.Screen>
            <Drawer.Screen
                name='CadUser'
                component={CadUser}
                options={{ headerShown: false }}
            >
            </Drawer.Screen>
            <Drawer.Screen
                name='Dashboard'
                component={Dashboard}
                options={{ headerShown: false }}
            >
            </Drawer.Screen>
            <Drawer.Screen
            name='Schedule'
            component={CreateSchedule}
            options={{ headerShown: false}}
            >
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}
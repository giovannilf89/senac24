import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen'; // Importando a tela HomeScreen do diretório src
import Tela_2 from './Tela_2'; // Importando a tela Tela_2 do diretório src

const Drawer = createDrawerNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home - Tela 1" component={HomeScreen} />
        <Drawer.Screen name="Tela_2" component={Tela_2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

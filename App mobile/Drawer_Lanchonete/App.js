import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator >
        <Drawer.Screen name="Veia Lanches" component={Home} />
        <Drawer.Screen name="Lanches rápidos" component={Tela1} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 20 }}>
              Lanchonete da "Veia"
        </Text>
      </View>

      {/* View para conter a imagem e centralizar */}
      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 90 }}>
        <Image
          source={require('./imagens/abertura.jpg')} 
          style={{  borderRadius: 15, width: 400, height: 200, marginTop: 30 }}
         
        />
      </View>

      {/* Frase na parte de baixo da tela */}
      <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 16 }}>
              A melhor comida de boteco da região{'\n'}
              Rua da Macarronada n. 46 quadra 3{'\n'}
              Centro - Bauru - SP - Cep 17000-00
        </Text>
      </View>
    </View>
  );
}


function Tela1({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      
      <View style={{ flex: 1, paddingLeft: 20 }}>
        <Image
          source={require('./imagens/Lanche1.jpeg')}
          style={{ width: 100, height: 100, borderRadius: 15 }} />
      </View>

      {/* Texto à direita */}
      <View style={{ flex: 2, paddingRight: 20 }}>
        <Text style={{ fontSize: 16 }}>
          Pedaços de paleta bovina, marinada por 24 horas em cerveja, vinho e ervas,
          com bacon, champignon e cenoura, guarnecidos de cebola palha frita e farofa de ovos.
        </Text>
      </View>

    </View>
  );
}

const Drawer = createDrawerNavigator();


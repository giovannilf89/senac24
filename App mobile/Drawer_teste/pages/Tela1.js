
import { View, Text, Image } from 'react-native';

export default function Tela1({ navigation }) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={{ flex: 1, paddingLeft: 20 }}>
          <Image
            source={require('../imagens/Lanche1.jpeg')}
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
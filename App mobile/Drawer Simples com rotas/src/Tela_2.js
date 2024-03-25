import * as React from 'react';
import { Button, View } from 'react-native';

export default function Tela_2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Home - Tela 1" />
    </View>
  );
}

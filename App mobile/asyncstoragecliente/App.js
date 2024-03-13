import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes';

export default function App() {
  return (
    <NavigationContainer>
        <AppRoutes />
    </NavigationContainer>
  );
}



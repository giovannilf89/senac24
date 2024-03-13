import * as React from 'react';
import { NavigationContainer, Stack } from '@react-navigation/native';
import AppRoutes from './routes';

export default function App() {
  return (
    <NavigationContainer>
        <AppRoutes />
    </NavigationContainer>
  );
}
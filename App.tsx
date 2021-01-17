// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import ModalScreen from './screens/ModalScreen';
import MainStackScreen from './navigation/navigation';
import { UrlProvider } from './Context';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <UrlProvider>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="Main"
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen name="Player" component={ModalScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </UrlProvider>
    </SafeAreaProvider>
  );
}

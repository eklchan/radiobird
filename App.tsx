// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UrlProvider } from './Context';
import RootNavigation from './RootNavigation';
import { enableScreens } from 'react-native-screens';

export default function App() {
  enableScreens();
  return (
    <SafeAreaProvider>
      <UrlProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </UrlProvider>
    </SafeAreaProvider>
  );
}

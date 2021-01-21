// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UrlProvider } from './Context';
import RootNavigation from './RootNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <UrlProvider>
        <RootNavigation />
      </UrlProvider>
    </SafeAreaProvider>
  );
}

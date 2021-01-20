// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UrlProvider } from './Context';
import RootNavigation from './RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('countryRadio');
    console.log(jsonValue, 'JSON');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e, 'ERROR');
  }
};

const localData = async () => {
  let responseData = await getData();
  console.log(responseData);
};
localData();

console.log(localData, 'LOCALDATA');
export default function App() {
  return (
    <SafeAreaProvider>
      <UrlProvider>
        <RootNavigation />
      </UrlProvider>
    </SafeAreaProvider>
  );
}

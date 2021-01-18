import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ModalScreen from './screens/ModalScreen';
import MainStackScreen from './navigation/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { useUrl } from './Context';
import { StyleSheet, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'native-base';

const RootStack = createStackNavigator();

const RootNavigation = () => {
  const station: any = useUrl();

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: `I am listening to ${station.name} using RadioBird! `,
      });
    } catch (error) {
      console.log(error, 'SHARE PRESS');
    }
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Player"
          component={ModalScreen}
          options={{
            title: `${station && station.name}`,
            headerRight: () => {
              return (
                <Button
                  onPress={handleSharePress}
                  style={styles.shareButton}
                  rounded
                  transparent
                >
                  <Ionicons name="share-social" size={24} color="black" />
                </Button>
              );
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  shareButton: {
    marginRight: 10,
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

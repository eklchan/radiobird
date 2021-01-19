import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PlayerScreen from './screens/PlayerScreen';
import MainStackScreen from './navigation/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { useUrl } from './Context';
import { StyleSheet, Share, View } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
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
          component={PlayerScreen}
          options={{
            title: `${station && station.name}`,
            headerRight: () => {
              return (
                <View style={styles.iconsContainer}>
                  <Button
                    onPress={handleSharePress}
                    style={styles.buttonsContainer}
                    transparent
                  >
                    <Ionicons name="share-social" size={24} color="black" />
                  </Button>
                  <Button style={styles.buttonsContainer} transparent>
                    <Entypo
                      name="dots-three-vertical"
                      size={24}
                      color="black"
                    />
                  </Button>
                </View>
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
  buttonsContainer: {
    marginRight: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

import React, { useState } from 'react';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchButton from '../components/SearchButton';
import HomeTopTabs from './toptabs';
import AboutUsScreen from '../screens/AboutUsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ContactScreen from '../screens/ContactScreen';
import RecentsScreen from '../screens/RecentsScreen';
import NationalScreen from '../screens/NationalScreen';
import LocalScreen from '../screens/LocalScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input, Button } from 'native-base';
import 'react-native-console-time-polyfill';

const HomeStack = createStackNavigator();
const FavouritesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

const SearchScreens = ({ navigation }) => {
  const [input, setInput] = useState('');

  // const testStations = () => {
  //   console.time('stations');
  //   let store = [];
  //   let storeObj = {};

  //   allStations.forEach((station) => {
  //     if (station.country) {
  //       if (storeObj[station.country]) {
  //         storeObj[station.country]++;
  //       } else {
  //         storeObj[station.country] = 1;
  //       }
  //     }
  //     if (station.country === 'Hong Kong') {
  //       store.push(station.name, station.url);
  //     }
  //   });

  //   console.timeEnd('stations');
  // };

  // useEffect(() => {
  //   testStations();
  // });

  const handleInputChange = (text: string) => {
    setInput(text);
  };

  const handleClearInput = () => {
    setInput('');
  };

  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="search"
        component={SearchScreen}
        options={{
          headerTitle: () => {
            return (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <HeaderBackButton
                  style={{ marginLeft: 0 }}
                  onPress={navigation.goBack}
                />
                <Input
                  onChangeText={(text) => handleInputChange(text)}
                  value={input}
                  placeholder="Search Radio Stations"
                />
                {!!input && (
                  <Button
                    rounded
                    transparent
                    onPress={handleClearInput}
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  >
                    <Ionicons name="close" size={24} color="black" />
                  </Button>
                )}
              </View>
            );
          },
        }}
      />
    </SearchStack.Navigator>
  );
};

const HomeScreens = ({ navigation }) => {
  return (
    <HomeStack.Navigator detachInactiveScreens={true}>
      <HomeStack.Screen
        name="home"
        component={HomeTopTabs}
        options={{
          headerTitle: 'Home Screen',
          headerRight: () => {
            return <SearchButton navigation={navigation} />;
          },
        }}
      />
      <HomeStack.Screen
        name="recents"
        component={RecentsScreen}
        options={{
          headerTitle: 'Recent Listens',
          headerRight: () => {
            return <SearchButton navigation={navigation} />;
          },
        }}
      />
      <HomeStack.Screen
        name="national"
        component={NationalScreen}
        options={{
          headerTitle: 'UK National Radio',
          headerRight: () => {
            return <SearchButton navigation={navigation} />;
          },
        }}
      />
      <HomeStack.Screen
        name="local"
        component={LocalScreen}
        options={{
          headerTitle: 'Local London Radio',
          headerRight: () => {
            return <SearchButton navigation={navigation} />;
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const FavouriteScreens = ({ navigation }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <FavouritesStack.Navigator>
      <FavouritesStack.Screen
        name="search"
        options={{
          headerTitle: 'Favourites',
          headerRight: () => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Button
                  transparent
                  style={{ marginRight: 11 }}
                  onPress={() => {
                    setDeleteModal(true);
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="black"
                  />
                </Button>
                <SearchButton navigation={navigation} />
              </View>
            );
          },
        }}
      >
        {() => (
          <FavouritesScreen
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
          />
        )}
      </FavouritesStack.Screen>
    </FavouritesStack.Navigator>
  );
};

const ProfileScreens = ({ navigation }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          headerRight: () => {
            return <SearchButton navigation={navigation} />;
          },
        }}
      />
      <ProfileStack.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
          headerRight: () => {
            return <SearchButton navigation={navigation} />;
          },
        }}
      />
      <ProfileStack.Screen
        name="about"
        component={AboutUsScreen}
        options={{
          headerTitle: 'About Us',
          headerRight: () => {
            return <SearchButton navigation={navigation} />;
          },
        }}
      />
      <ProfileStack.Screen
        name="contact"
        component={ContactScreen}
        options={{
          headerTitle: 'Contact',
          headerRight: () => {
            return <SearchButton navigation={navigation} />;
          },
        }}
      />
    </ProfileStack.Navigator>
  );
};

export { ProfileScreens, FavouriteScreens, SearchScreens, HomeScreens };

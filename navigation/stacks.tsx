import React, { useState, useEffect } from 'react';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchButton from '../components/SearchButton';
import HomeTopTabs from './toptabs';
import AboutUsScreen from '../screens/AboutUsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RecentsScreen from '../screens/RecentsScreen';
import NationalScreen from '../screens/NationalScreen';
import LocalScreen from '../screens/LocalScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input, Button } from 'native-base';
import 'react-native-console-time-polyfill';
import stationsuk from '../stationsuk.json';
import { Station, Navigation } from '../interfaces';

const HomeStack = createStackNavigator();
const FavouritesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

interface navProps {
  navigation: Navigation;
}

const SearchScreens = ({ navigation }: navProps) => {
  const [input, setInput] = useState<string>('');
  const [filteredStations, setFilteredStations] = useState<Array<Station>>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    setLoadingState(true);
    const getResults = async () => {
      if (input.split('').length > 2) {
        const filteredResults = await stationsuk.filter((station) => {
          if (station.name.toUpperCase().includes(input.toUpperCase())) {
            return station;
          }
        });
        setFilteredStations(filteredResults);
      } else if (!input) {
        setFilteredStations([]);
      }
      setLoadingState(false);
    };

    getResults();
  }, [input]);

  const handleInputChange = (text: string) => {
    setInput(text);
    setLoadingState(true);
  };

  const handleClearInput = () => {
    setInput('');
  };

  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="search"
        options={{
          headerTitle: () => {
            return (
              <View style={searchStyles.inputWrap}>
                <HeaderBackButton onPress={() => navigation.goBack} />
                <Input
                  onChangeText={(text) => handleInputChange(text)}
                  value={input}
                  placeholder="Search UK Radio Stations"
                />
                {!!input && (
                  <Button
                    rounded
                    transparent
                    onPress={handleClearInput}
                    style={searchStyles.clearButton}
                  >
                    <Ionicons name="close" size={24} color="black" />
                  </Button>
                )}
              </View>
            );
          },
        }}
      >
        {() => (
          <SearchScreen
            filteredStations={filteredStations}
            input={input}
            loadingState={loadingState}
          />
        )}
      </SearchStack.Screen>
    </SearchStack.Navigator>
  );
};

const searchStyles = StyleSheet.create({
  clearButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const HomeScreens = ({ navigation }: navProps) => {
  return (
    <HomeStack.Navigator detachInactiveScreens={true}>
      <HomeStack.Screen
        name="home"
        component={HomeTopTabs}
        options={{
          headerTitle: () => (
            <View style={homeStyles.headerWrap}>
              <Image
                source={require('../assets/RadioBirdLogo.png')}
                style={homeStyles.headerLogo}
              />
              <Text style={homeStyles.headerText}>RadioBird</Text>
            </View>
          ),
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

const homeStyles = StyleSheet.create({
  headerWrap: { flexDirection: 'row', alignItems: 'center' },
  headerLogo: { height: 40, width: 43 },
  headerText: { fontWeight: 'bold', fontSize: 17, marginLeft: 15 },
});

const FavouriteScreens = ({ navigation }: navProps) => {
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

const ProfileScreens = ({ navigation }: navProps) => {
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
    </ProfileStack.Navigator>
  );
};

export { ProfileScreens, FavouriteScreens, SearchScreens, HomeScreens };

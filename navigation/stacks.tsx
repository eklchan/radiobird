import React from 'react';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchButton from '../components/SearchButton';
import HomeTopTabs from './toptabs';
import AboutUsScreen from '../screens/AboutUsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ContactScreen from '../screens/ContactScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const FavouritesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

const SearchScreens = ({ navigation }) => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="search"
        component={SearchScreen}
        options={{
          headerTitle: 'Search',
          headerLeft: () => {
            return <HeaderBackButton onPress={navigation.goBack} />;
          },
        }}
      />
    </SearchStack.Navigator>
  );
};

const HomeScreens = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
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
    </HomeStack.Navigator>
  );
};

const FavouriteScreens = ({ navigation }) => {
  return (
    <FavouritesStack.Navigator>
      <FavouritesStack.Screen
        name="search"
        component={FavouritesScreen}
        options={{
          headerTitle: 'My Favourites',
          headerRight: () => {
            return <SearchButton navigation={navigation} />;
          },
        }}
      />
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

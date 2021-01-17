import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchButton from '../components/SearchButton';
import HomeTopTabs from './toptabs';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const FavouritesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

const SearchScreens = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="search"
        component={SearchScreen}
        options={{
          headerTitle: 'Search',
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
    </ProfileStack.Navigator>
  );
};

export { ProfileScreens, FavouriteScreens, SearchScreens, HomeScreens };

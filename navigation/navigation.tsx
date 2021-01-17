import MusicTabBar from '../components/MusicTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import {
  HomeScreens,
  SearchScreens,
  FavouriteScreens,
  ProfileScreens,
} from './stacks';

const BottomTab = createBottomTabNavigator();
const ControlTab = createBottomTabNavigator();

type TabBarIconProps = {
  name: any;
  colour?: string;
};

const TabBarIcon: FunctionComponent<TabBarIconProps> = ({ name, colour }) => {
  return <Ionicons size={25} name={name} colour={colour} />;
};

const MainStackScreen = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => <TabBarIcon name="home-sharp" />,
          unmountOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesNavigator}
        options={{
          tabBarIcon: () => <TabBarIcon name="heart" />,
          unmountOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: () => <TabBarIcon name="person-circle-outline" />,
          unmountOnBlur: true,
        }}
      />
    </BottomTab.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <ControlTab.Navigator
      initialRouteName="homescreen"
      tabBar={({ navigation }) => <MusicTabBar navigation={navigation} />}
    >
      <ControlTab.Screen name="homescreen" component={HomeScreens} />
      <ControlTab.Screen name="search" component={SearchScreens} />
    </ControlTab.Navigator>
  );
};

const FavouritesNavigator = () => {
  return (
    <ControlTab.Navigator
      initialRouteName="favouritescreen"
      tabBar={({ navigation }) => <MusicTabBar navigation={navigation} />}
    >
      <ControlTab.Screen name="favouritescreen" component={FavouriteScreens} />
      <ControlTab.Screen name="search" component={SearchScreens} />
    </ControlTab.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <ControlTab.Navigator
      initialRouteName="profilescreen"
      tabBar={({ navigation }) => <MusicTabBar navigation={navigation} />}
    >
      <ControlTab.Screen name="profilescreen" component={ProfileScreens} />
      <ControlTab.Screen name="search" component={SearchScreens} />
    </ControlTab.Navigator>
  );
};

export default MainStackScreen;

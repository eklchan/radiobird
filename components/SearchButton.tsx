import React from 'react';
import { Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('search');
      }}
    >
      <FontAwesome name="search" size={22} color="black" />
    </TouchableOpacity>
  );
};

export default SearchButton;

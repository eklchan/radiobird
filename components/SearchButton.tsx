import React from 'react';
import { Button } from 'react-native';

const SearchButton = ({ navigation }) => {
  return (
    <Button
      title="search"
      onPress={() => {
        navigation.navigate('search');
      }}
    />
  );
};

export default SearchButton;

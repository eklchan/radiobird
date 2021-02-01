import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Navigation } from '../interfaces';

interface props {
  navigation: Navigation;
}

const SearchButton = ({ navigation }: props) => {
  return (
    <TouchableOpacity
      style={styles.searchButton}
      onPress={() => {
        navigation.navigate('search');
      }}
    >
      <FontAwesome name="search" size={20} color="black" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  searchButton: {
    marginRight: 18,
  },
  icon: {
    padding: 5,
  },
});

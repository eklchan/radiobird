import { Button } from 'native-base';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Header, Content, Form, Item, Picker } from 'native-base';

const SetLocationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to RadioBird</Text>
        <Text style={styles.locationText}>Please select your Country:</Text>
        <View style={styles.dropdownWrap}>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select your SIM"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
          </Item>
        </View>
        <Button style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </Button>
      </View>
    </View>
  );
};

export default SetLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  welcomeContainer: {
    alignSelf: 'center',
    marginTop: 20,
    // backgroundColor: 'red',
  },
  welcomeText: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 19,
    marginTop: 20,
  },
  nextButton: {
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    elevation: -1,
  },
  buttonText: {
    fontSize: 20,
    padding: 12,
  },
  input: {
    color: 'black',
  },
  dropdownMenu: {
    // marginTop: 20,
  },
  dropdownWrap: {
    marginTop: 10,
  },
  placeholder: {
    color: 'black',
  },
});

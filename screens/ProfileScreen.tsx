import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { List, ListItem, Left, Right, Icon } from 'native-base';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';
import * as Linking from 'expo-linking';
import { Navigation } from '../interfaces';

interface navProps {
  navigation: Navigation;
}

const ProfileScreen = ({ navigation }: navProps) => {
  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });

  const buttonOpacity = 0.9;
  const underlayColour = '#cfcfcf';

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <List>
          <ListItem>
            <View style={styles.rowOne}>
              <Image
                source={require('../assets/RadioBirdPic.png')}
                style={styles.logoStyle}
              />
              <Text style={styles.versionText}>Version 1.0</Text>
            </View>
          </ListItem>
          <TouchableHighlight
            activeOpacity={buttonOpacity}
            underlayColor={underlayColour}
            onPress={() => {
              navigation.navigate('settings');
            }}
          >
            <ListItem>
              <Left>
                <Text style={styles.listItemText}>Settings</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={buttonOpacity}
            underlayColor={underlayColour}
            onPress={() => {
              navigation.navigate('about');
            }}
          >
            <ListItem>
              <Left>
                <Text style={styles.listItemText}>About Us</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={buttonOpacity}
            underlayColor={underlayColour}
            onPress={() => Linking.openURL('mailto:radiobird@gmail.com')}
          >
            <ListItem>
              <Left>
                <Text style={styles.listItemText}>Contact</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </TouchableHighlight>
        </List>
      </View>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  rowOne: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 200,
  },
  avatarCard: {
    borderRadius: 40,
  },
  mainName: {
    fontSize: 17,
    fontFamily: 'Lato_900Black',
  },
  listItemText: {
    fontSize: 17,
    fontFamily: 'Lato_700Bold',
    paddingVertical: 2,
  },
  logoStyle: {
    height: 150,
    width: 190,
  },
  versionText: {
    fontSize: 16,
    marginTop: 11,
  },
});

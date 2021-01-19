import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Thumbnail, Card, List, ListItem } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';

const ProfileScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <List>
          <ListItem>
            <View style={styles.rowOne}>
              <Card style={styles.avatarCard}>
                <Thumbnail
                  large
                  circular
                  source={{ uri: 'https://i.pravatar.cc/300' }}
                />
              </Card>
              <Text style={styles.mainName}>edwardklc1993@gmail.com</Text>
            </View>
          </ListItem>
          <ListItem>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('settings');
              }}
            >
              <Text style={styles.listItemText}>Settings</Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('about');
              }}
            >
              <Text style={styles.listItemText}>About Us</Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem>
            <TouchableOpacity onPress={() => navigation.navigate('contact')}>
              <Text style={styles.listItemText}>Contact</Text>
            </TouchableOpacity>
          </ListItem>
        </List>
      </View>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    marginHorizontal: 15,
  },
  rowOne: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});

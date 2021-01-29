import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        RadioBird is a React Native App deveolped by Edward Chan (So it should
        say About Me technically, though that sounds weird). RadioBird delivers
        more than 20,000 stations across the globe to users. Currently, the only
        home country supported is the UK. In future, RadioBird aims to support
        more countries including the United States.
      </Text>
      <Text style={styles.text}>
        In addition to providing thousands of radio stations, RadioBird also
        allows you to save stations, add alarms or a sleep Timer so you can wake
        up/fall asleep to your favourite station.{' '}
      </Text>
      <Text style={styles.text}>
        If you notice any bugs or would like to see additional features, please
        contact Edward using the Contact tab.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default AboutUsScreen;

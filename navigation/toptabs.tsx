import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ForYou from '../screens/HomeTabScreens/ForYou';

const HomeTopTabs = () => {
  const initialLayout = { width: Dimensions.get('window').width };

  const FirstRoute = () => <ForYou />;

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'For You' },
    { key: 'second', title: 'News' },
    { key: 'third', title: 'Music' },
    { key: 'fourth', title: 'Sport' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: SecondRoute,
    fourth: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {},
});

export default HomeTopTabs;

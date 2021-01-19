import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ForYou from '../screens/HomeTabScreens/ForYou';
import { TabBar } from 'react-native-tab-view';

const HomeTopTabs = () => {
  const initialLayout = { width: Dimensions.get('window').width };

  const FirstRoute = () => <ForYou />;

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'green' }]} />
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
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'hsl(226, 0%, 75%)' }}
      labelStyle={{ color: 'hsl(226, 0%, 98%)' }}
      style={{ backgroundColor: 'hsl(226, 88%, 67%)' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={initialLayout}
      swipeEnabled={false}
      lazy={true}
      style={styles.views}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    backgroundColor: 'green',
  },
  views: {
    backgroundColor: '#ebebeb',
  },
});

export default HomeTopTabs;

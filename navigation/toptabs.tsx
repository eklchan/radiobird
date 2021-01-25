import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ForYou from '../screens/HomeTabScreens/ForYou';
import { TabBar } from 'react-native-tab-view';
import News from '../screens/HomeTabScreens/News';
import Music from '../screens/HomeTabScreens/Music';
import Sport from '../screens/HomeTabScreens/Sport';

const HomeTopTabs = ({ navigation }) => {
  const initialLayout = { width: Dimensions.get('window').width };

  const First = ({ jumpTo }) => (
    <ForYou jumpTo={jumpTo} navigation={navigation} />
  );

  const Second = () => <News />;

  const Third = () => <Music />;

  const Fourth = () => <Sport />;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'forYou', title: 'For You' },
    { key: 'news', title: 'News' },
    { key: 'music', title: 'Music' },
    { key: 'sports', title: 'Sport' },
  ]);

  const renderScene = SceneMap({
    forYou: First,
    news: Second,
    music: Third,
    sports: Fourth,
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

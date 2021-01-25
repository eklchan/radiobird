// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Image,
//   Text,
//   View,
//   Button,
//   Dimensions,
// } from 'react-native';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import stationsuk from '../stationsuk.json';
// import { useUrl, useUrlUpdate } from '../Context';
// import { Container, Header, Content, Tab, Tabs } from 'native-base';
// import { TabView, SceneMap } from 'react-native-tab-view';

// const HomeScreen = ({ navigation }) => {
//   const setStationUrl = useUrlUpdate();

//   // const handleStop = () => {
//   //   sound.unloadAsync();
//   // };

//   // const handleTest = async () => {
//   //   const hi = await sound.getStatusAsync();
//   //   console.log(hi, 'HI');
//   // };

//   const sortedStations = stationsuk.sort((a, b) => b.votes - a.votes);

//   const renderStations = sortedStations.slice(0, 6).map((station, i) => {
//     // console.log(station.favicon, 'sep', i, 'FAVICON');
//     const [source, setSource] = useState(true);

//     const handleError = () => {
//       console.log('ERROR', station.name);
//       setSource(false);
//     };

//     const handleClick = async () => {
//       console.log('CLICK', station.name, station.url_resolved, 'poo');
//       setStationUrl<any>(station.url_resolved);
//     };

//     return (
//       <View style={styles.station} key={station.name}>
//         <TouchableOpacity onPress={handleClick} style={styles.button}>
//           <Text>{station.name}</Text>
//           <Text>{station.votes}</Text>
//           <Text>{station.language}</Text>
//           {source && (
//             <Image
//               onError={handleError}
//               source={{ uri: `${station.favicon}` }}
//               style={{ height: 100, width: 100, margin: 5 }}
//               key={station.name}
//             />
//           )}
//         </TouchableOpacity>
//       </View>
//     );
//   });

//   const initialLayout = { width: Dimensions.get('window').width };

//   const FirstRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
//   );

//   const SecondRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
//   );

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'first', title: 'First' },
//     { key: 'second', title: 'Second' },
//     { key: 'third', title: 'Third' },
//     { key: 'fourth', title: 'Fourth' },
//   ]);

//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//     third: SecondRoute,
//     fourth: SecondRoute,
//   });

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={initialLayout}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   safeAreaView: {
//     flex: 1,
//     // marginTop: Constants.statusBarHeight,
//     flexDirection: 'column',
//   },
//   container: {
//     // backgroundColor: 'blue',
//     marginHorizontal: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
//   station: {
//     margin: 10,
//     alignSelf: 'center',
//   },
//   button: {
//     backgroundColor: 'grey',
//   },
//   stopButton: {
//     backgroundColor: 'pink',
//     height: 40,
//     width: 40,
//     margin: 20,
//   },
//   statusButton: {
//     backgroundColor: 'green',
//     height: 40,
//     margin: 40,
//     width: 20,
//   },
//   bottomBar: {
//     position: 'absolute',
//     bottom: 0,
//     backgroundColor: 'purple',
//   },
//   scroll: {
//     color: 'white',
//   },
// });

// export default HomeScreen;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import CoinDetailsScreen from './src/screens/CoinDetailsScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.appName}>Crypto App</Text>
      {/* <HomeScreen /> */}
      <CoinDetailsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#121212',
    // backgroundColor: '#0F3460',
    backgroundColor: '#293462',
    paddingTop: 50
  },
  appName: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'AppleColorEmoji'
  }
});

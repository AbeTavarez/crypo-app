import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import CoinDetailsScreen from './src/screens/CoinDetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';

export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#121212'
        }
      }}
    >
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.appName}>CryptoNite</Text>
        <Navigation />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    // backgroundColor: '#0F3460',
    // backgroundColor: '#293462',
    paddingTop: 50
  },
  appName: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 15
  }
});

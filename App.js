import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import CoinItem from './src/components/CoinItem';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CoinItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50
  }
});

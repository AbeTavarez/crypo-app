import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import CoinItem from './src/components/CoinItem';
import Cryptocurrencies from './assets/data/cryptocurrencies.json';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={Cryptocurrencies}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
      />
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

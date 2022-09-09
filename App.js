import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.coinContainer}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogosmarcas.net%2Fwp-content%2Fuploads%2F2020%2F08%2FBitcoin-Logo.png&f=1&nofb=1'
          }}
        />
        <View>
          <Text style={styles.title}>Bitcoin</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>1</Text>
            </View>
            <Text style={styles.text}>BTC</Text>
            <AntDesign
              name="caretdown"
              size={12}
              color="white"
              style={{ alignSelf: 'center', marginRight: 5 }}
            />
            <Text style={styles.text}>0.63%</Text>
          </View>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <Text style={styles.text}>28000.45</Text>
          <Text style={styles.text}>MCap 1.056 T</Text>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50
  },
  coinContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    // borderBottomColor: '#282828',
    padding: 15
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 5
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3
  },
  text: {
    color: '#fff',
    marginRight: 5
  },
  rank: {
    fontWeight: 'bold',
    color: '#fff'
  },
  rankContainer: {
    backgroundColor: '#585858',
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 5
  }
});

import { StyleSheet, Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

const CoinItem = () => {
  return (
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
  );
};
export default CoinItem;

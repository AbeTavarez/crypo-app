import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const CoinItem = ({ marketCoin }) => {
  const {
    id,
    name,
    current_price,
    market_cap,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    image
  } = marketCoin;

  const navigation = useNavigation();

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${Math.floor(marketCap / 1000000000000)} T`;
    } else if (marketCap > 1e9) {
      return `${Math.floor(marketCap / 1000000000)} B`;
    } else if (marketCap > 1e6) {
      return `${Math.floor(marketCap / 1000000)} M`;
    } else if (marketCap > 1e3) {
      return `${Math.floor(marketCap / 1000)} K`;
    } else {
      return marketCap;
    }
  };

  const pricePercentageColor =
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';

  return (
    <Pressable
      onPress={() => navigation.navigate('CoinDetailsScreen', { coinId: id })}
      style={styles.coinContainer}
    >
      <Image
        style={styles.image}
        source={{
          uri: image
        }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'}
            size={12}
            color={pricePercentageColor}
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
          <Text style={{ color: pricePercentageColor }}>
            {price_change_percentage_24h.toFixed(3)}%
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
        <Text style={styles.text}>{current_price}</Text>
        <Text style={{ color: '#fff' }}>
          MCap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};
export default CoinItem;

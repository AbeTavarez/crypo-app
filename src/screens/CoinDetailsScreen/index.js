import { Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import CoinDetailsHeader from './components/CoinDetailsHeader';
import cryptoCoin from '../../../assets/data/cryptocoin.json';
import { AntDesign } from '@expo/vector-icons';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel
} from '@rainbow-me/animated-charts';

const CoinDetailsScreen = ({}) => {
  const {
    image: { small },
    symbol,
    name,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h
    },
    prices
  } = cryptoCoin;

  const pricePercentageColor =
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';

  const screenWidth = Dimensions.get('window').width;

  const formatCurrency = (value) => {
    'worklet';
    if (value === '') {
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      <ChartPathProvider
        data={{
          points: prices.map((price) => ({ x: price[0], y: price[1] })),
          // points: prices.map(([x, y]) => ({ x, y })),
          smoothingStrategy: 'bezier'
        }}
      >
        <CoinDetailsHeader
          small={small}
          symbol={symbol}
          market_cap_rank={market_cap_rank}
        />

        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <ChartYLabel format={formatCurrency} style={styles.currentPrice} />
            {/* <Text style={styles.currentPrice}>${current_price.usd}</Text> */}
          </View>

          <View
            style={{
              backgroundColor: pricePercentageColor,
              ...styles.priceChangeContainer
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'}
              size={12}
              color={'white'}
              style={{ alignSelf: 'center', marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h.toFixed(2)}
            </Text>
          </View>
        </View>

        <View>
          <ChartPath
            height={screenWidth / 2}
            stroke="yellow"
            // stroke={current_price.usd > prices[0][1] ? '#16c784' : '#ea3943'}
            strokeWidth={2}
            width={screenWidth}
          />
          <ChartDot
            style={{
              backgroundColor:
                current_price.usd > prices[0][1] ? '#16c784' : '#ea3943'
            }}
            // style={{ backgroundColor: 'red' }}
          />
        </View>
      </ChartPathProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  priceContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    color: '#fff',
    fontSize: 15
  },
  currentPrice: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  priceChange: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  },
  priceChangeContainer: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5
  }
});

export default CoinDetailsScreen;

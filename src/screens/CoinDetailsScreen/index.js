import { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  ActivityIndicator
} from 'react-native';
import CoinDetailsHeader from './components/CoinDetailsHeader';
import cryptoCoin from '../../../assets/data/cryptocoin.json';
import { AntDesign } from '@expo/vector-icons';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel
} from '@rainbow-me/animated-charts';
import { useRoute } from '@react-navigation/native';
import {
  getCoinDetailsData,
  getCoinMarketChart
} from '../../services/apis/cryptoapi';
import { styles } from './styles';

const CoinDetailsScreen = ({}) => {
  // ===== Coin Data fetching ===== >
  const [coinData, setCoinData] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [coinValue, setCoinValue] = useState('1');
  const [usdValue, setUsdValue] = useState('');

  const route = useRoute();
  const {
    params: { coinId }
  } = route;

  // Func will fetch: coin data and coin market data
  const fetchCoinData = async (coinId) => {
    setIsFetching(true);
    const fetchedData = await getCoinDetailsData(coinId);
    const fetchedCoinMarketData = await getCoinMarketChart(coinId);
    setCoinData(fetchedData);
    setCoinMarketData(fetchedCoinMarketData);
    setUsdValue(fetchedData.market_data.current_price.usd.toString());
    setIsFetching(false);
  };
  // fetching on load
  useEffect(() => {
    fetchCoinData(coinId);
  }, []);

  if (!coinData || !coinMarketData || isFetching) {
    return <ActivityIndicator size="large" />;
  }

  const {
    image: { small },
    symbol,
    name,
    market_data: { market_cap_rank, current_price, price_change_percentage_24h }
  } = coinData;

  const { market_caps } = coinMarketData;
  // console.log(coinMarketData);

  // const [usdValue, setUsdValue] = useState(current_price.usd.toString());

  const screenWidth = Dimensions.get('window').width;

  // =====> Currency Cal
  const onChangeCoinValue = (value) => {
    setCoinValue(value); // set val in state
    const floatVal = parseFloat(value.replace(',', '.')) || 0;
    setUsdValue((floatVal * current_price.usd).toString());
  };

  const onChangeUsdValue = (value) => {
    setUsdValue(value);
    const floatVal = parseFloat(value.replace(',', '.')) || 0;
    setCoinValue((floatVal / current_price.usd).toString());
  };

  const formatCurrency = (value) => {
    'worklet';
    if (value === '') {
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const pricePercentageColor =
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';

  return (
    <ScrollView style={styles.container}>
      <ChartPathProvider
        data={{
          points:
            market_caps &&
            market_caps.map((price) => ({ x: price[0], y: price[1] })),
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
            height={screenWidth}
            // stroke="yellow"
            stroke={
              current_price.usd > market_caps && market_caps[0][1]
                ? '#16c784'
                : '#ea3943'
            }
            // strokeWidth={2}
            width={screenWidth}
          />
          <ChartDot
            style={{
              backgroundColor:
                current_price.usd > market_caps && market_caps[0][1]
                  ? '#16c784'
                  : '#ea3943'
            }}
          />
        </View>

        <View style={styles.currCalContainer}>
          <View style={styles.calRow}>
            <Text style={styles.calText}>{symbol.toUpperCase()}</Text>
            <TextInput
              style={styles.textInput}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={onChangeCoinValue}
            />
          </View>

          <View style={styles.calRow}>
            <Text style={styles.calText}>USD</Text>
            <TextInput
              placeholder="Amount"
              style={styles.textInput}
              value={usdValue}
              keyboardType="number-pad"
              onChangeText={onChangeUsdValue}
            />
          </View>
        </View>
      </ChartPathProvider>
    </ScrollView>
  );
};

export default CoinDetailsScreen;

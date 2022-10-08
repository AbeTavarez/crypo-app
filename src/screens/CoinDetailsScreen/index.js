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
import FilterComponent from './components/FilterComponent';

const filterDaysArray = [
  { filterDay: '1', filterText: '24h' },
  { filterDay: '7', filterText: '7d' },
  { filterDay: '30', filterText: '30d' },
  { filterDay: '365', filterText: '1y' },
  { filterDay: 'max', filterText: 'All' }
];

const CoinDetailsScreen = ({}) => {
  // ===== Coin Data fetching ===== >
  const [coinData, setCoinData] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [coinValue, setCoinValue] = useState('1');
  const [usdValue, setUsdValue] = useState('');
  const [selectedRange, setSelectedRange] = useState('1');

  const route = useRoute();
  const {
    params: { coinId }
  } = route;

  // Func will fetch: coin data and coin market data
  const fetchCoinData = async (coinId) => {
    setIsFetching(true);
    const fetchedData = await getCoinDetailsData(coinId);
    setCoinData(fetchedData);
    setUsdValue(fetchedData.market_data.current_price.usd.toString());
    setIsFetching(false);
  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };
  // fetching on load
  useEffect(() => {
    fetchCoinData(coinId);
    fetchMarketCoinData(1);
  }, []);

  if (!coinData || !coinMarketData || isFetching) {
    return <ActivityIndicator size="large" />;
  }

  const {
    id,
    image: { small },
    symbol,
    name,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h
    },
    description,
    liquidity_score,
    developer_score,
    genesis_date,
    hashing_algorithm,
    blockchain_site,
    chat_url
  } = coinData;

  const { prices } = coinMarketData;
  // console.log(coinMarketData);
  // console.log(coinData);

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
      if (current_price.usd < 1) {
        return `$${current_price.usd}`;
      }
      return `$${current_price.usd.toFixed(2)}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const pricePercentageColor =
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || '#fff';

  const removeTagsRegex = /<[^>]*>+/g;

  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
  };

  return (
    <ScrollView style={styles.container}>
      {/* {prices.length > 0 && ( */}
      <ChartPathProvider
        data={{
          points: prices.map((price) => ({ x: price[0], y: price[1] }))
        }}
      >
        <CoinDetailsHeader
          coinId={id}
          image={small}
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
              name={
                price_change_percentage_24h < 0
                  ? 'caretdown'
                  : 'caretup' || '#fff'
              }
              size={12}
              color={'white'}
              style={{ alignSelf: 'center', marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h?.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.filtersContainer}>
          {filterDaysArray.map((day) => (
            <FilterComponent
              filterDay={day.filterDay}
              filterText={day.filterText}
              selectedRange={selectedRange}
              setSelectedRange={onSelectedRangeChange}
              key={day.filterDay}
            />
          ))}
        </View>
        <View>
          <ChartPath
            width={screenWidth}
            height={screenWidth / 2}
            strokeWidth={2}
            stroke={current_price.usd > prices[0][1] ? '#16c784' : '#ea3943'}
          />
          <ChartDot
            size={10}
            style={{
              backgroundColor:
                current_price.usd > prices[0][1] ? '#16c784' : '#ea3943'
            }}
          />
        </View>
        {/* ============== Calculate ====================== */}
        <View>
          <Text style={styles.header}>Calculate</Text>
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
        </View>

        <View style={styles.highlightsContainer}>
          <Text style={styles.header}>Stats</Text>
          <Text style={styles.textDetail}>
            Liquidity Score: {liquidity_score}
          </Text>
          <Text style={styles.textDetail}>
            Developer Score: {developer_score}
          </Text>
          <Text style={styles.textDetail}>Genesis Date: {genesis_date}</Text>
          <Text style={styles.textDetail}>
            hashing Algorithm: {hashing_algorithm}
          </Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.header}>About {symbol.toUpperCase()}</Text>
          <Text style={styles.textDetail}>
            {description.en.replaceAll(removeTagsRegex, '')}
          </Text>
        </View>
      </ChartPathProvider>
      {/* )} */}
    </ScrollView>
  );
};

export default CoinDetailsScreen;

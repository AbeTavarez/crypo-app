import { Text, View, Image, ScrollView } from 'react-native';
import CoinDetailsHeader from './components/CoinDetailsHeader';
import cryptoCoin from '../../../assets/data/cryptocoin.json';

const CoinDetailsScreen = ({}) => {
  const {
    image: { small },
    symbol,
    name,
    market_data: { market_cap_rank }
  } = cryptoCoin;

  return (
    <ScrollView>
      <CoinDetailsHeader
        small={small}
        symbol={symbol}
        market_cap_rank={market_cap_rank}
      />
    </ScrollView>
  );
};

export default CoinDetailsScreen;

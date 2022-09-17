import { Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useWatchList } from '../../../../Contexts/WatchListContext';
import Animated, { BounceIn } from 'react-native-reanimated';

const CoinDetailsHeader = ({ coinId, image, symbol, market_cap_rank }) => {
  const navigation = useNavigation();
  const { watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId } =
    useWatchList();

  const checkCoinWatchListed = () => {
    return watchListCoinIds.some((coinIdVal) => coinIdVal === coinId);
  };
  // Adds or remove coin from watchList
  const handleWatchListCoin = () => {
    if (checkCoinWatchListed()) {
      return removeWatchListCoinId(coinId);
    }
    return storeWatchListCoinId(coinId);
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="white"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={styles.text}>{market_cap_rank}</Text>
        </View>
      </View>

      <Animated.View entering={BounceIn}>
        <Ionicons
          name={checkCoinWatchListed() ? 'star' : 'star-outline'}
          size={25}
          color={checkCoinWatchListed() ? '#ffbf00' : '#fff'}
          onPress={handleWatchListCoin}
        />
      </Animated.View>
    </View>
  );
};

export default CoinDetailsHeader;

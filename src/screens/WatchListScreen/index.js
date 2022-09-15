import { View, Text, FlatList } from 'react-native';
import { useWatchList } from '../../Contexts/WatchListContext';
import CoinItem from '../../components/CoinItem';

const WatchListScreen = () => {
  const { watchListCoinIds } = useWatchList();
  console.log(watchListCoinIds);
  return (
    <View>
      <FlatList data={watchListCoinIds} />
    </View>
  );
};

export default WatchListScreen;

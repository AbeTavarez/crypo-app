import { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useWatchList } from '../../Contexts/WatchListContext';
import CoinItem from '../../components/CoinItem';
import { getWatchListedCoins } from '../../services/apis/cryptoapi';

const WatchListScreen = () => {
  const { watchListCoinIds } = useWatchList();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWatchListedCoins();
  }, []);

  // useEffect(() => {
  //   fetchWatchListedCoins();
  // }, [watchListCoinIds]);

  const fetchWatchListedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchListedCoinsData = await getWatchListedCoins(
      1,
      transformCoinIds()
    );
    // setCoins((prevState) => [...prevState, ...watchListedCoinsData]);
    setCoins(watchListedCoinsData);
    setLoading(false);
  };

  const transformCoinIds = () => {
    return watchListCoinIds.join('%2C');
  };

  // console.log('data====================', transformCoinIds());
  // console.log('coins==============', coins);
  // console.log('here', watchListCoinIds);
  return (
    <View>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="#fff"
            onRefresh={fetchWatchListedCoins}
          />
        }
      />
    </View>
  );
};

export default WatchListScreen;

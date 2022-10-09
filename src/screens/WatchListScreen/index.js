import { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useWatchList } from '../../Contexts/WatchListContext';
import CoinItem from '../../components/CoinItem';
import { getWatchListedCoins } from '../../services/apis/cryptoapi';
import { Ionicons } from '@expo/vector-icons';

const WatchListScreen = () => {
  const { watchListCoinIds } = useWatchList();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWatchListedCoins();
  }, []);

  //Todo:  For pagination
  //:? if watchListCoinIds.length !=== coins.length then fetch more
  useEffect(() => {
    if (watchListCoinIds.length > 0) {
      fetchWatchListedCoins();
    }
  }, [watchListCoinIds]);

  const fetchWatchListedCoins = async () => {
    if (loading || !watchListCoinIds.length) {
      console.log('returning...');
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

  const transformCoinIds = () => watchListCoinIds.join('%2C');

  console.log('COINS', coins);

  return (
    <View>
      {coins.length ? (
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
      ) : (
        <View style={styles.container}>
          <Text style={styles.addCoins}>Looks pretty empty here...</Text>
          <Text style={styles.addCoins}>
            Add coins by tapping the{' '}
            <Ionicons name={'star'} size={25} color={'#ffbf00'} />
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'royalblue',
    borderRadius: 5,
    marginHorizontal: 15
  },
  addCoins: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: 'bold'
  }
});

export default WatchListScreen;

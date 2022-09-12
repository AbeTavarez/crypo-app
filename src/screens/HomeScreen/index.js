import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import CoinItem from '../../components/CoinItem';
import { getMarketData } from '../../services/apis/cryptoapi';

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async (pageNumber) => {
    if (loading) return;

    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((prevState) => [...prevState, ...coinsData]);
    setLoading(false);
  };

  const refreshCoins = async () => {
    if (loading) return;

    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };
  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      onEndReached={() => fetchCoins(coins.length / 50 + 1)}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="#fff"
          onRefresh={refreshCoins}
        />
      }
    />
  );
};

export default HomeScreen;

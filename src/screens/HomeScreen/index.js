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

  const fetchCoins = async () => {
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  const refreshCoins = async () => {
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };
  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
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

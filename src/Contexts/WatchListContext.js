import { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create context
const WatchListContext = createContext();

// ===== UseWatchList Hook
export const useWatchList = () => useContext(WatchListContext);

const WatchListProvider = ({ children }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState([]);

  useEffect(() => {
    getWatchListData();
  }, []);

  const getWatchListData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('@watchlist_coins');
      setWatchListCoinIds(jsonData !== null ? JSON.parse(jsonData) : []);
    } catch (e) {
      console.log(e);
    }
  };

  const storeWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = [...watchListCoinIds, coinId];
      const jsonData = JSON.stringify(newWatchList);
      await AsyncStorage.setItem('@watchlist_coins', jsonData);
      setWatchListCoinIds(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };

  const removeWatchListCoinId = async (coinId) => {
    const newWatchList = watchListCoinIds.filter(
      (coinIdVal) => coinIdVal !== coinId
    );
    const jsonData = JSON.stringify(newWatchList);
    await AsyncStorage.setItem('@watchlist_coins', jsonData);
    setWatchListCoinIds(newWatchList);
  };
  return (
    <WatchListContext.Provider
      value={{ watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListProvider;

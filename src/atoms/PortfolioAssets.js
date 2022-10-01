import { atom, selector } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWatchListedCoins } from '../services/apis/cryptoapi';

//* 1a  Selector will get all coin in local storage
export const allPortfolioBoughtAssets = selector({
  key: 'allPortfolioBoughtAssets',
  get: async () => {
    const jsonValue = await AsyncStorage.getItem('@portfolio_coins');
    return jsonValue !== null ? JSON.parse(jsonValue) : []; // this will be the initial value of the atom
  }
});

//* 2b Selector will get coins from API
export const allPortfolioBoughtAssetsFromAPI = selector({
  key: 'allPortfolioBoughtAssetsFromAPI',
  get: async ({ get }) => {
    // we get the coins from the atom state
    const boughtPortfolioAssets = get(allPortfolioBoughtAssetsInStorage);
    // fetch coin data from API using -> boughtPortfolioAssets
    const portfolioAssetsMarketData = await getWatchListedCoins(
      1,
      boughtPortfolioAssets.map((asset) => asset.id).join(',')
    );
    const boughtAssets = boughtPortfolioAssets.map((asset) => {
      // in each iteration we're going to match the curr asset.id to the item.id from portfolioAssetsMarketData
      const portfolioAsset = portfolioAssetsMarketData.filter(
        (item) => asset.id === item.id
      )[0];
      return {
        ...boughtAssets,
        currentPrice: portfolioAsset.current_price,
        priceChangePercentage: portfolioAsset.price_change_percentage_24
      };
    });
    return boughtAssets.sort(
      (i1, i2) =>
        i1.quantityBought * i1.currentPrice <
        i2.quantityBought * i2.currentPrice
    );
  }
});

//* 1a Stores assets from local storage to state
export const allPortfolioBoughtAssetsInStorage = atom({
  key: 'allPortfolioBoughtAssetsInStorage',
  default: allPortfolioBoughtAssets
});

//* 2b This atom will have the latest coins prices from the API as default value
export const allPortfolioAssets = atom({
  key: 'allPortfolioAssets', // unique ID (with respect to other atoms/selectors)
  // default: [] // default value (aka initial value)
  default: allPortfolioBoughtAssetsFromAPI // allPortfolioBoughtAssets get function will return an initial value
});

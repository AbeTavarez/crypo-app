import { atom, selector } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create selector
export const allPortfolioBoughtAssets = selector({
  key: 'allPortfolioBoughtAssets',
  get: async () => {
    const jsonValue = await AsyncStorage.getItem('@portfolio_coins');
    return jsonValue !== null ? JSON.parse(jsonValue) : [];

    // return [{ id: 'bitcon' }]; / / this will be the initial value of the atom
  }
});

// create an new atom
export const allPortfolioAssets = atom({
  key: 'allPortfolioAssets', // unique ID (with respect to other atoms/selectors)
  // default: [] // default value (aka initial value)
  default: allPortfolioBoughtAssets // allPortfolioBoughtAssets get function will return an initial value
});

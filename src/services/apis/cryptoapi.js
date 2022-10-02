import axios from 'axios';

export const getMarketData = async (pageNumber = 1) => {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
    );

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getCoinDetailsData = async (coinId) => {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getCoinMarketChart = async (coinId, currency = 'usd') => {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=1&interval=hourly`
    );

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getWatchListedCoins = async (page = 1, coinIds) => {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${page}&sparkline=false`
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getAllCoins = async () => {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/list?include_platform=false`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

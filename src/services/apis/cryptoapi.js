import axios from 'axios';

export const getMarketData = async () => {
  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
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

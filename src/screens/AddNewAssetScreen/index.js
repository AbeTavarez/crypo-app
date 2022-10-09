import { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { getAllCoins, getCoinDetailsData } from '../../services/apis/cryptoapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

//=== Recoil
import { useRecoilState } from 'recoil';
import { allPortfolioBoughtAssetsInStorage } from '../../atoms/PortfolioAssets';
import styles from './styles';

const AddNewAssetScreen = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  console.log('assetsInStorage', assetsInStorage);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);

  const isQuantityEntered = () => boughtAssetQuantity === '';

  const fetchAllCoins = async () => {
    if (loading) return;

    setLoading(true);
    const fetchedAllCoins = await getAllCoins();
    setAllCoins(fetchedAllCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async () => {
    if (loading) return;

    setLoading(true);
    const coinInfo = await getCoinDetailsData(selectedCoinId);
    console.log('COIN INFO:::', coinInfo.market_data.current_price.usd);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };

  const onAddNewAsset = async () => {
    // console.log('SELECTED COIN:', selectedCoin.market_data.current_price.usd);

    const newAsset = {
      id: selectedCoin.id,
      unique_id: `${selectedCoin.id}-${uuid.v4()}`,
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBrought: selectedCoin.market_data.current_price.usd
    };
    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem('@portfolio_coins', jsonValue);
    setAssetsInStorage(newAssets);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item) => setSelectedCoinId(item.id)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: '#fff' }}
        resetValue={false}
        placeholder={selectedCoinId || 'Select a coin...'}
        placeholderTextColor="#fff"
        textInputProps={{
          underlineColorAndroid: 'transparent',
          style: styles.textInput
        }}
      />

      {selectedCoin && (
        <>
          <View style={styles.boughtQuantityContainer}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                value={boughtAssetQuantity}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={setBoughtAssetQuantity}
                style={{ color: '#fff', fontSize: 90 }}
              />
              <Text style={styles.ticker}>
                {' '}
                {selectedCoin?.symbol?.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.pricePerCoin}>
              ${selectedCoin?.market_data.current_price.usd}
            </Text>
          </View>

          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: isQuantityEntered() ? '#303030' : '#1469E1'
            }}
            onPress={onAddNewAsset}
            disabled={isQuantityEntered()}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: isQuantityEntered() ? 'grey' : '#fff'
              }}
            >
              Add New Asset
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AddNewAssetScreen;

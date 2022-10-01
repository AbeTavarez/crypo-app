import { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { getAllCoins, getCoinDetailsData } from '../../services/apis/cryptoapi';
import styles from './styles';

//=== Recoil
import { useRecoilState } from 'recoil';
import { allPortfolioBoughtAssetsInStorage } from '../../atoms/PortfolioAssets';

const AddNewAssetScreen = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  console.log(selectedCoin);
  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);

  const isQuantityEntered = () => boughtAssetQuantity === '';

  const onAddNewAsset = () => {};

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
    setSelectedCoin(coinInfo);
    setLoading(false);
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

      {selectedCoinId && (
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
              <Text style={styles.ticker}>BTC</Text>
            </View>
            <Text style={styles.pricePerCoin}>$40000 per coin</Text>
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

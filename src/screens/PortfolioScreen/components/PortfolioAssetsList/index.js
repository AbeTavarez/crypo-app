import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import PortfolioAssetItem from '../PortfolioAssetItem';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

// Recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  allPortfolioAssets,
  allPortfolioBoughtAssetsInStorage
} from '../../../../atoms/PortfolioAssets';

const PortfolioAssetsList = () => {
  //* gets a single value from state
  const assets = useRecoilValue(allPortfolioAssets);
  //* gets the entire state
  const [storageAssets, setStorageAssets] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );

  // console.log('PortfolioAssetsList', assets);

  const navigation = useNavigation();

  const getCurrentBalance = () =>
    assets.length &&
    assets
      .reduce(
        (total, currAsset) =>
          total + currAsset.currentPrice * currAsset.quantityBought,
        0
      )
      .toFixed(2);

  const getCurrentValueChange = () => {
    const currBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currAsset) =>
        total + currAsset.priceBrought * currAsset.quantityBought,
      0
    );
    return (currBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currAsset) =>
        total + currAsset.priceBrought * currAsset.quantityBought,
      0
    );
    return currBalance > 0
      ? (((currBalance - boughtBalance) / boughtBalance) * 100).toFixed(2)
      : 0;
  };

  const isChangePositive = () => getCurrentValueChange() >= 0;

  const onDeleteAsset = async (asset) => {
    const newAssets = storageAssets.filter(
      (coin, idx) => coin.unique_id !== asset.item.unique_id
    );
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem('@portfolio_coins', jsonValue);
    setStorageAssets(newAssets);
  };

  const renderDeleteButton = (data) => {
    return (
      <Pressable
        style={styles.deleteButton}
        onPress={() => onDeleteAsset(data)}
      >
        <FontAwesome name="trash-o" size={24} color="#fff" />
      </Pressable>
    );
  };

  return (
    <SwipeListView
      data={assets}
      renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
      rightOpenValue={-75}
      disableRightSwipe
      renderHiddenItem={(data, rowMap) => renderDeleteButton(data)}
      keyExtractor={(id, idx) => `${id}-${idx}`}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}>Current Balance</Text>
              <Text style={styles.currentBalanceValue}>
                ${getCurrentBalance()}
              </Text>
              <Text
                style={{
                  ...styles.valueChange,
                  color: isChangePositive() ? 'green' : 'red'
                }}
              >
                ${getCurrentValueChange()} (All Time)
              </Text>
            </View>
            <View
              style={{
                ...styles.priceChangePercentageContainer,
                backgroundColor: isChangePositive() ? 'green' : 'red'
              }}
            >
              <AntDesign
                name={isChangePositive() ? 'caretup' : 'caretdown'}
                size={12}
                color={'white'}
                style={{ alignSelf: 'center', marginRight: 5 }}
              />
              <Text style={styles.percentageChange}>
                {getCurrentPercentageChange()}%
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.assetsLabel}>Your Assets</Text>
          </View>
        </>
      }
      ListFooterComponent={
        <Pressable
          onPress={() => navigation.navigate('AddNewAssetScreen')}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Add New Asset</Text>
        </Pressable>
      }
    />
  );
};

export default PortfolioAssetsList;

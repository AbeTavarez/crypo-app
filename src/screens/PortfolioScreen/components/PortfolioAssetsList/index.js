import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PortfolioAssetItem from '../PortfolioAssetItem';
import { useNavigation } from '@react-navigation/native';
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
  return (
    <View>
      <FlatList
        data={assets}
        renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
        ListHeaderComponent={
          <>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.currentBalance}>Current Balance</Text>
                <Text style={styles.currentBalanceValue}>
                  ${getCurrentBalance()}
                </Text>
                <Text style={styles.valueChange}>
                  ${getCurrentValueChange()} (All Time)
                </Text>
              </View>
              <View style={styles.priceChangePercentageContainer}>
                <AntDesign
                  name="caretup"
                  size={12}
                  color={'white'}
                  style={{ alignSelf: 'center', marginRight: 5 }}
                />
                <Text style={styles.percentageChange}>1.2%</Text>
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
    </View>
  );
};

export default PortfolioAssetsList;

import { Suspense } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PortfolioAssetsList from './components/PortfolioAssetsList';

const Loading = () => (
  <View style={styles.container}>
    <View>
      <ActivityIndicator />
    </View>
    <Text style={styles.text}>Loading Please Wait...</Text>
  </View>
);

const PortfolioScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Suspense fallback={<Loading />}>
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    margin: 10
  }
});

export default PortfolioScreen;

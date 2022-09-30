import { Suspense } from 'react';
import { View, Text } from 'react-native';
import PortfolioAssetsList from './components/PortfolioAssetsList';

const PortfolioScreen = () => {
  return (
    <View>
      <Suspense>
        <PortfolioAssetsList
          fallback={<Text style={{ color: '#fff' }}>loading...</Text>}
        />
      </Suspense>
    </View>
  );
};

export default PortfolioScreen;

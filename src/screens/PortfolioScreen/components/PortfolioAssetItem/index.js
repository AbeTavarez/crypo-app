import { View, Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

const PortfolioAssetItem = ({ assetItem }) => {
  // console.log('debug', assetItem);
  const {
    name,
    currentPrice,
    image,
    priceBrought,
    priceChangePercentage,
    quantityBought,
    ticker
  } = assetItem;
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.ticker}>{ticker}</Text>
      </View>

      <View style={{ marginLeft: 'auto' }}>
        <Text style={styles.title}>${currentPrice}</Text>
        <View style={{ flexDirection: 'row' }}>
          <AntDesign
            name="caretup"
            size={12}
            color={'#16c784'}
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
          <Text style={{ color: '#16c784', fontWeight: '600' }}>
            {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <Text style={styles.title}>$80000</Text>
        <Text style={styles.ticker}>
          {quantityBought}
          {ticker}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;

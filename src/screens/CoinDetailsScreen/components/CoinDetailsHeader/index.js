import { Text, View, Image } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const CoinDetailsHeader = ({ small, symbol, market_cap_rank }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="white"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.tickerContainer}>
        <Image source={{ uri: small }} style={styles.image} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={styles.text}>{market_cap_rank}</Text>
        </View>
      </View>

      <EvilIcons name="star" size={30} color="white" />
    </View>
  );
};

export default CoinDetailsHeader;

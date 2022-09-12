import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CoinDetailsScreen" component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;

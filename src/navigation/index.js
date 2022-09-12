import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="root"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="root" component={BottomTabNavigator} />
      <Stack.Screen name="CoinDetailsScreen" component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;

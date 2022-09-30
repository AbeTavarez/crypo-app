import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AddNewAssetScreen from '../screens/AddNewAssetScreen/index.js';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="root"
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetailsScreen"
        component={CoinDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewAssetScreen"
        component={AddNewAssetScreen}
        options={{
          title: 'Add New Asset',
          headerStyle: {
            backgroundColor: '#121212'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;

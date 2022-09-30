import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import WatchListProvider from './src/Contexts/WatchListContext';
import Animated, { FlipInEasyX } from 'react-native-reanimated';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#121212'
        }
      }}
    >
      <RecoilRoot>
        <WatchListProvider>
          <View style={styles.container}>
            <StatusBar style="light" />
            <Animated.View entering={FlipInEasyX.duration(1000)}>
              <Text style={styles.appName}>CryptoNite</Text>
            </Animated.View>
            <Navigation />
          </View>
        </WatchListProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50
  },
  appName: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1CD6CE',
    paddingBottom: 15
  }
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  priceContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    color: '#fff',
    fontSize: 15
  },
  currentPrice: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  priceChange: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  },
  priceChangeContainer: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5
  },
  currCalContainer: {
    flexDirection: 'row'
    // flex: 1
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    height: 40,
    margin: 10,
    padding: 10,
    fontSize: 14,
    color: '#fff'
  },
  calRow: {
    flex: 1,
    flexDirection: 'row'
  },
  calText: {
    color: '#fff',
    fontSize: 15,
    alignSelf: 'center',
    flex: 1
  }
});

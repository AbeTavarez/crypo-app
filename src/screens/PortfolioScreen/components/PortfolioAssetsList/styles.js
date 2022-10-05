import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  currentBalance: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600'
  },
  currentBalanceValue: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 1
  },
  valueChange: {
    // color: '#16c784',
    fontSize: 16
    // fontWeight: '700'
  },
  percentageChange: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700'
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10
  },
  priceChangePercentageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 3,
    paddingVertical: 8,
    borderRadius: 5
  },
  assetsLabel: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#4169E1',
    padding: 10,
    alignItems: 'center',
    marginVertical: 25,
    marginHorizontal: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600'
  }
});

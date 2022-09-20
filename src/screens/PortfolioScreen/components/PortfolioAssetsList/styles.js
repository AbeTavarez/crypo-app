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
    color: '#16c784',
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
    backgroundColor: '#16c784',
    paddingHorizontal: 3,
    paddingVertical: 8,
    borderRadius: 5
  }
});

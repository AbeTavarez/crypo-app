import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  ticker: {
    color: 'grey',
    fontWeight: '600'
  },
  quantityContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end'
  }
});

export default styles;

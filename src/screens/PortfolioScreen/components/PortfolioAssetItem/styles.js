import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#121212'
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
  ticker: {
    color: 'grey',
    fontWeight: '600'
  },
  quantityContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end'
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: 'center'
  }
});

export default styles;

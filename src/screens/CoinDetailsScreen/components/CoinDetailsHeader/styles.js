import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: 25,
    height: 25
  },
  tickerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tickerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  rankContainer: {
    backgroundColor: '#585858',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5
  }
});

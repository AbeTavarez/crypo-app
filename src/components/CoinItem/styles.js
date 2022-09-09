import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    // borderBottomColor: '#282828',
    padding: 15
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 5
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3
  },
  text: {
    color: '#fff',
    marginRight: 5
  },
  rank: {
    fontWeight: 'bold',
    color: '#fff'
  },
  rankContainer: {
    backgroundColor: '#585858',
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 5
  }
});

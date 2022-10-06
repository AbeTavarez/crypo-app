import { View, Text } from 'react-native';

const FilterComponent = ({ filterDay, filterText }) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        paddingVertical: 5,
        backgroundColor: '#1e1e1e'
      }}
    >
      <Text style={{ color: '#fff' }}>{filterText}</Text>
    </View>
  );
};

export default FilterComponent;

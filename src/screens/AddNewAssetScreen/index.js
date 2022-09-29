import { Text, View } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './styles';
const AddNewAssetScreen = () => {
  return (
    <View>
      <SearchableDropdown
        inItemSelect={(item) => console.log(item)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: '#fff' }}
        items={[]}
        resetValue={false}
        placeholder={'Select a coin...'}
        placeholderTextColor="#fff"
        textInputProps={{
          underlineColorAndroid: 'transparent',
          style: styles.textInput
        }}
      />
    </View>
  );
};

export default AddNewAssetScreen;

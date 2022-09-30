import { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './styles';

const AddNewAssetScreen = () => {
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState('');
  return (
    <View style={{ flex: 1 }}>
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

      <View style={styles.boughtQuantityContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            value={boughtAssetQuantity}
            placeholder="0"
            keyboardType="numeric"
            onChangeText={setBoughtAssetQuantity}
            style={{ color: '#fff', fontSize: 90 }}
          />
          <Text style={styles.ticker}>BTC</Text>
        </View>
        <Text style={styles.pricePerCoin}>$40000 per coin</Text>
      </View>

      <Pressable style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Add New Asset</Text>
      </Pressable>
    </View>
  );
};

export default AddNewAssetScreen;

//import liraries
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// create a component
type phoneInputProps = {
  secureTextEntry: boolean;
  keyboardType: any;
  //national code
  valueCodeNational: number;
  setValueCodeNational: any;
  //phone
  valuePhone: string;
  setValuePhone: any;
  placeholderValuePhone: string;
};
const CustomPhoneInput = ({
  secureTextEntry,
  keyboardType,
  //national code
  valueCodeNational,
  setValueCodeNational,
  //phone
  valuePhone,
  setValuePhone,
  placeholderValuePhone,
}: phoneInputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.codeCountryInputContainer}>
        <TextInput
          style={styles.textInput}
          value={valueCodeNational + ''}
          onChangeText={setValueCodeNational}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
      <View style={styles.phoneInputContainer}>
        <TextInput
          style={styles.textInput}
          value={valuePhone}
          onChangeText={setValuePhone}
          placeholder={placeholderValuePhone}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeCountryInputContainer: {
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginTop: 5,
    marginRight: 5,
  },
  phoneInputContainer: {
    flex: 1,
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  textInput: {
    fontSize: 14,
  },
});

//make this component available to the app
export default CustomPhoneInput;

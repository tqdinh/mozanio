//import liraries
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// create a component
type imageInputProps = {
  value: string;
  placeholder: any;
  onPress: any;
};
const CustomImageInput = ({ placeholder, onPress, value }: imageInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.ImageInputContainer}
        placeholder={placeholder}
        value={value}
      />
      <TouchableOpacity style={styles.buttonAddLogo} onPress={onPress}>
        <Icon name="add-photo-alternate" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  ImageInputContainer: {
    flex: 1,
  },
  buttonAddLogo: {
    width: 40,
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default CustomImageInput;

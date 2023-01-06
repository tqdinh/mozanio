//import liraries
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// create a component
type imageInputProps = {
  value: Date;
  onPress: any;
  nameIcon: string;
};
const CustomTimeInput = ({ onPress, value, nameIcon }: imageInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.ImageInputContainer}
        value={value.toTimeString().slice(0, 5)}
      />
      <TouchableOpacity style={styles.buttonAddLogo} onPress={onPress}>
        <Icon name={nameIcon} size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: 175,
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
export default CustomTimeInput;

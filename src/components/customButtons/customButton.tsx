//import liraries
import { SystemGrey00 } from '@path/localization/colors/colors';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
type buttonProp = {
  text: string;
  color?: string;
  onPress: any;
  disabled: boolean;
};
const CustomButton = ({ text, onPress, color, disabled }: buttonProp) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        color ? { backgroundColor: color } : { backgroundColor: SystemGrey00 },
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  textButton: {
    width: 200,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

//make this component available to the app
export default CustomButton;

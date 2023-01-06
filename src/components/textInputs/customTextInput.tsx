//import liraries
import { SystemBlack, SystemGrey03 } from '@path/localization/colors/colors';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// create a component
type textInputProps = {
  value: string | number;
  setValue: any;
  placeholder: string;
  secureTextEntry: boolean;
  keyboardType: any;
  onPressHidingPassword: any;
  title: string | undefined;
  type: string;
  numberOfLines: number;
  multiLines: boolean;
  editable: boolean;
  textAlignVertical: 'center' | 'bottom' | 'auto' | 'top' | undefined;
};
const CustomTextInput = ({
  value,
  setValue,
  secureTextEntry,
  placeholder,
  keyboardType,
  onPressHidingPassword,
  title,
  type,
  numberOfLines,
  multiLines,
  textAlignVertical,
  editable,
}: textInputProps) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.textTitle}>{title}</Text>
      <View style={[styles.container]}>
        <TextInput
          autoCapitalize="none"
          style={styles.textInput}
          value={value + ''}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          numberOfLines={numberOfLines}
          multiline={multiLines}
          textAlignVertical={textAlignVertical}
          editable={editable}
        />
        <Icon
          name={secureTextEntry == true ? 'ios-eye' : 'ios-eye-off'}
          size={20}
          color="grey"
          onPress={type == 'password' ? onPressHidingPassword : ''}
          style={type == 'password' ? styles.icon : styles.visible}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: SystemGrey03,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 7,
  },
  textTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: SystemBlack,
    letterSpacing: 1.5,
    lineHeight: 12,
    marginBottom: 5,
  },
  icon: {
    marginRight: 14,
  },
  visible: {
    display: 'none',
  },
});

//make this component available to the app
export default CustomTextInput;

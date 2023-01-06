//import liraries
import {
  SystemBlue,
  SystemGrey01,
  SystemPrimary,
} from '@path/localization/colors/colors';
import { formatVND, numberWithSpaces } from '@path/utils/utilities';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type buttonProp = {
  onPressTotalAmount: any;
  onPressPlaceOrder: any;
  totalAmount: number;
  buttonCaption: string;
  disabled?: boolean;
};

// create a component
const CustomBottomInfoOrder = ({
  totalAmount,
  onPressTotalAmount,
  onPressPlaceOrder,
  buttonCaption,
  disabled,
}: buttonProp) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.textPrice} onPress={onPressTotalAmount}>
        {/* {formatVND(Math.ceil(totalAmount))} */}
        {numberWithSpaces(Number(totalAmount))} đ
      </Text>
      {disabled ? (
        <View style={[styles.button, { backgroundColor: SystemGrey01 }]}>
          <Text style={styles.textButton}>{buttonCaption}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={onPressPlaceOrder}>
          <Text style={styles.textButton}>{buttonCaption}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  textPrice: {
    width: 100,
    fontFamily: 'Inter-Medium',
    color: SystemBlue,
    letterSpacing: 0.15,
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: SystemPrimary,
    flex: 1,
    marginHorizontal: 10,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    letterSpacing: 0.15,
    fontSize: 16,
    textAlign: 'center',
  },
});

//make this component available to the app
export default CustomBottomInfoOrder;

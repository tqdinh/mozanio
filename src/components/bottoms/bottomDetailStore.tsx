//import liraries
import { SystemGrey01, SystemPrimary } from '@path/localization/colors/colors';
import { formatVND, numberWithSpaces } from '@path/utils/utilities';
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// create a component

type buttonProp = {
  onPressCheckout: any;
  itemCount: number;
  totalAmount: number;
};

const CustomBottomDetailStore = ({
  itemCount,
  totalAmount,
  onPressCheckout,
}: buttonProp) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.cartContainer}>
        <Icon name="cart-outline" size={24} color={SystemPrimary} />
        <Text style={styles.textCart}>{itemCount}</Text>
      </View>
      <TouchableOpacity
        disabled={itemCount ? false : true}
        style={[
          styles.buttonContainer,
          { backgroundColor: itemCount ? SystemPrimary : SystemGrey01 },
        ]}
        onPress={onPressCheckout}>
        <Text style={styles.text}>
          Thanh toán: {numberWithSpaces(totalAmount)} đ
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 'ios' === Platform.OS ? '1%' : 0,
    width: Dimensions.get('screen').width,
    height: 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
  cartContainer: {
    width: 100,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#354C86',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    justifyContent: 'center',
  },
  textCart: {
    fontSize: 16,
    letterSpacing: 0.15,
    fontFamily: 'Inter-Medium',
    color: SystemPrimary,
    marginLeft: 8,
  },
});

//make this component available to the app
export default CustomBottomDetailStore;

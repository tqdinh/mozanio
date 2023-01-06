//import liraries
import { SystemBlack, SystemPrimary } from '@path/localization/colors/colors';
import { formatVND, numberWithSpaces } from '@path/utils/utilities';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// create a component

type buttonProp = {
  itemCount: number;
  onPressPlus: any;
  onPressMinus: any;
  onPressSelect: any;
  totalAmount: number;
};

const BottomDetailStoreAddItem = ({
  itemCount,
  onPressPlus,
  onPressMinus,
  onPressSelect,
  totalAmount,
}: buttonProp) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.buttonCircle} onPress={onPressMinus}>
          <Text style={styles.textButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textquantity}>{itemCount}</Text>
        <TouchableOpacity style={styles.buttonCircle} onPress={onPressPlus}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={onPressSelect}>
        <Text style={styles.text}>
          {/* Chọn {formatVND(Math.ceil(totalAmount))} */}
          {numberWithSpaces(Number(totalAmount))} đ
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: 68,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
  quantityContainer: {
    width: 100,
    marginHorizontal: 10,
    height: 33,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SystemPrimary,
    borderRadius: 8,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    justifyContent: 'center',
  },
  buttonCircle: {
    width: 33,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7dbe7',
    borderRadius: 50,
  },
  textButton: {
    fontSize: 15,
    color: SystemPrimary,
  },
  textquantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: SystemBlack,
    letterSpacing: 0.5,
  },
  editQuantityItem: {
    width: 105,
    height: 33,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

//make this component available to the app
export default BottomDetailStoreAddItem;

//import liraries
import {
  SystemGrey00,
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import {
  basketActions,
  selectLatestBasketBranchID,
  selectTotalItemCountOnBasket,
} from '@path/redux/Slices/BasketSlice';
import {
  branchesActions,
  BranchModel,
  selectAllBranchs,
} from '@path/redux/Slices/BranchesSlice';
import { RootState } from '@path/redux/stores/store';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
// create a component
const BottomNotificationModal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [branch, setBranch] = useState<BranchModel>();
  const totalQuantities = useSelector(selectTotalItemCountOnBasket);
  const basketBranchId = useSelector(selectLatestBasketBranchID);
  const branchDetail = useSelector(
    (state: RootState) => state.branch.branchItem,
  );

  useEffect(() => {
    dispatch(basketActions.getOrCreateBasket());
  }, []);

  useEffect(() => {
    if (basketBranchId)
      dispatch(branchesActions.getBranchDetail({ id: basketBranchId }));
  }, [basketBranchId]);

  useEffect(() => {
    if (branchDetail) setBranch(branchDetail);
  }, [branchDetail]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Checkout');
      }}
      style={totalQuantities === 0 ? { display: 'none' } : styles.container}>
      <View style={styles.buttonContainer}>
        <IconFontAwesome name="shopping-cart" size={16} color="#FFF" />
      </View>
      <View style={styles.infomationContainer}>
        <Text style={styles.textTitle}>
          Sản phẩm trong giỏ hàng:{' '}
          <Text style={styles.textDes}>{totalQuantities} sản phẩm</Text>
        </Text>
        <Text style={styles.textTitle}>
          Cửa hàng: <Text style={styles.textDes}>{branch?.display_name}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#F0F8FF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: SystemPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonCloseContainer: {
    width: 25,
    height: 25,
    backgroundColor: SystemSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  infomationContainer: {
    flex: 1,
    marginLeft: 10,
  },
  textTitle: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  textDes: {
    fontSize: 12,
    color: SystemGrey00,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
});

//make this component available to the app
export default BottomNotificationModal;

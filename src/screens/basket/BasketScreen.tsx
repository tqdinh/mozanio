//import liraries
import CustomBottomInfoOrder from '@path/components/bottoms/bottomInfoOrder';
import {
  SystemBlack,
  SystemBlue,
  SystemGrey01,
  SystemGrey04,
  SystemGrey05,
  SystemOrange,
  SystemSecondary,
} from '@path/localization/colors/colors';
import {
  basketActions,
  selectAllBasketItem,
  selectTotalAmountOnBasket,
} from '@path/redux/Slices/BasketSlice';
import { numberWithSpaces } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
// create a component
const BasketScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(basketActions.getOrCreateBasket());
  }, []);

  const listBasketItem = useSelector(selectAllBasketItem);
  const totalAmount = useSelector(selectTotalAmountOnBasket);
  const discountedAmount = 0;
  const finalAmount = totalAmount - discountedAmount;

  const onPressPlaceOrder = () => {
    navigation.navigate('Checkout');
  };
  const onPressTotalAmount = () => {};

  const renderedItems = listBasketItem.map((item: any) => {
    return (
      <View style={styles.itemContainer} key={item.product_id}>
        <View style={styles.leftItemContainer}>
          <Image
            source={require('../../assets/images/img.png')}
            style={styles.imageItem}
          />
          <View style={styles.infoItemContainer}>
            <Text style={styles.textTitleItem}>
              {item.product.name} (x{item.quantity}){' '}
            </Text>
            <Text style={styles.textSizeItem}>Size: Lớn</Text>
            <TouchableOpacity key={item.key}>
              <Text style={styles.buttonEdit}>Sửa</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.RightItemContainer}>
          <Text style={styles.textPriceItem}>
            {numberWithSpaces(Number(item.subtotal))} đ
          </Text>
          <TouchableOpacity style={styles.buttonRemove}>
            <Text
              style={{
                fontSize: 10,
                color: '#FFFFFF',
                fontFamily: 'Inter-Black',
              }}>
              X
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });
  const desc = '42/1 Ung Văn Khiêm, phường 25, quận Bình Thạnh';
  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Thông tin giao hàng</Text>
          <View style={{ marginTop: 15 }}>
            <View style={styles.textPhoneContainer}>
              <View style={styles.left}>
                <Icon name="phone" size={19} color={SystemBlack} />
                <Text style={styles.textPhone}>+84 0901234567</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.buttonEdit}>Sửa</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressContainer}>
              <View style={styles.left}>
                <Icon name="map" size={19} color={SystemBlack} />
                <Text style={styles.textAddress}>{`${desc.slice(
                  0,
                  35,
                )}... `}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.buttonEdit}>Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.ListitemContainer}>
          <View style={styles.titleListItemContainer}>
            <Text style={styles.title}>Thông tin đơn hàng</Text>
            <TouchableOpacity>
              <Text style={styles.buttonEdit}>Thêm</Text>
            </TouchableOpacity>
          </View>
          {renderedItems}
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.textPriceContainer}>
            <Text style={[styles.textTitlePrice, { color: SystemBlack }]}>
              Tạm tính
            </Text>
            <Text style={[styles.textPrice, { color: SystemBlack }]}>
              {totalAmount} đ
            </Text>
          </View>
          <View style={styles.textPriceContainer}>
            <Text style={[styles.textTitlePrice, { color: SystemBlack }]}>
              Giảm
            </Text>
            <Text style={[styles.textPrice, { color: SystemSecondary }]}>
              -{discountedAmount} đ
            </Text>
          </View>
          <View style={styles.textPriceContainer}>
            <Text style={[styles.textTitlePrice, { color: SystemBlue }]}>
              Thành tiền
            </Text>
            <Text style={[styles.textPrice, { color: SystemBlue }]}>
              {finalAmount} đ
            </Text>
          </View>
        </View>
        <View style={styles.discountContainer}>
          <TouchableOpacity style={styles.buttonDiscount}>
            <Icon2 name="attach-money" size={24} color={SystemOrange} />
            <Text style={styles.nameDiscount}>Tiền mặt</Text>
            <Icon2 name="chevron-right" size={24} color={SystemBlack} />
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity style={styles.buttonDiscount}>
            <Icon3 name="brightness-percent" size={24} color={SystemOrange} />
            <Text style={styles.nameDiscount}>Giảm 10%</Text>
            <Icon2 name="chevron-right" size={24} color={SystemBlack} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomBottomInfoOrder
        totalAmount={finalAmount}
        onPressPlaceOrder={onPressPlaceOrder}
        onPressTotalAmount={onPressTotalAmount}
        buttonCaption="Đặt hàng"
      />
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    width: Dimensions.get('screen').width,
    height: 187,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    color: SystemBlack,
    fontSize: 20,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.15,
  },
  textPhoneContainer: {
    height: 54,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
  },
  left: {
    width: 329,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  textPhone: {
    width: 295,
    height: 19,
    fontFamily: 'Inter-Regular',
    color: SystemBlack,
    alignItems: 'center',
    letterSpacing: 0.15,
  },
  buttonEdit: {
    color: SystemSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.1,
  },
  addressContainer: {
    height: 54,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textAddress: {
    width: 295,
    height: 19,
    fontFamily: 'Inter-Regular',
    color: SystemBlack,
    alignItems: 'center',
    letterSpacing: 0.15,
  },
  ListitemContainer: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  priceContainer: {
    width: Dimensions.get('screen').width,
    height: 165,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  textPriceContainer: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
  },
  textTitlePrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    alignItems: 'center',
    letterSpacing: 0.15,
  },
  textPrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    alignItems: 'center',
    letterSpacing: 0.5,
  },
  discountContainer: {
    height: 54,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDiscount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameDiscount: {
    color: SystemBlack,
    letterSpacing: 0.15,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  titleListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContainer: {
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  imageItem: {
    height: 64,
    width: 64,
    borderRadius: 6,
  },
  leftItemContainer: {
    width: 262,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItemContainer: {
    width: 188,
    height: 61,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  textTitleItem: {
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    letterSpacing: 0.1,
  },
  textSizeItem: {
    color: SystemGrey01,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  RightItemContainer: {
    width: 102,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textPriceItem: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: SystemBlack,
    letterSpacing: 0.1,
  },
  buttonRemove: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SystemGrey04,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

//make this component available to the app

export default BasketScreen;

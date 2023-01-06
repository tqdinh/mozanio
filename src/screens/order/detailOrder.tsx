//import liraries
import BottomDetailOrder from '@path/components/bottoms/bottomDetailOrder';
import {
  SystemBlack,
  SystemGreen,
  SystemGrey00,
  SystemGrey01,
  SystemGrey05,
  SystemPrimary,
} from '@path/localization/colors/colors';
import Navigation from '@path/navigation/appNavigation';
import { paymentActions } from '@path/redux/Slices/Pay/PaymentSlice';
import {
  formatDay,
  formatTime,
  getPaymentMethodName,
  numberWithSpaces,
} from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
// create a component
if ('ios' == Platform.OS) {
  Icon.loadFont();
}

interface DetailOrderProps {
  route: any;
}
const DetailOrderScreen = ({ route }: DetailOrderProps) => {
  const Item = route?.params?.item;
  const Status = route?.params?.status;
  const NameIcon = route?.params?.nameIcon;
  const Color = route?.params?.color;
  const ItemOrder = Item?.items;
  const orderUser = Item?.user;
  const vendorBranch = Item.vendor_branch;
  const shippingAddress = Item.shipping_address;
  const transactions = Item?.transactions;
  console.log(`FileName:DetailOrderScreen  - `);
  const orderIds = ItemOrder.map((order: any) => order.id);
  console.log(
    `FileName:DetailOrderScreen - Ordetail: id:${Item.id} ref:${
      Item.ref
    } is_paid:${Item.is_paid} transaction:${JSON.stringify(
      transactions,
    )} orderIds: ${orderIds}`,
  );

  // const currentTrackingOrder = useSelector(selectCurrentOrderStatus)
  // console.log(JSON.stringify(currentTrackingOrder));
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const ref = Item.ref
  //   const interval = setInterval(() => {
  //     dispatch(orderActions.getOrderDetail(ref))
  //   }, 20 * 1000);
  //   return () => clearInterval(interval);
  // }, [])
  // console.log("Current status", currentTrackingOrder.status)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPressPay = () => {
    dispatch(paymentActions.clearCurrentPayment());
    navigation.navigate('PayAgainScreen', { Item, ItemOrder });
  };
  const renderItemOrder = ItemOrder.map((item: any, index: any) => {
    const priceItem = item.unit_price * item.quantity;
    const sizeItem = item.extra.size_config.size.product_size.display_name;
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textQuantity}>{item.quantity}x</Text>
          <View>
            <Text style={styles.textName}>{item.product.name}</Text>
            <Text style={styles.textSize}>{sizeItem}</Text>
          </View>
        </View>
        <Text style={styles.textPrice}>{numberWithSpaces(priceItem)} đ</Text>
      </View>
    );
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.storeContainer}>
          {vendorBranch.logo ? (
            <Image
              source={{ uri: vendorBranch.logo.url }}
              style={styles.imageStore}
            />
          ) : (
            <Image
              source={require('../../assets/images/imgStore.png')}
              style={styles.imageStore}
            />
          )}

          <View style={styles.infoStore}>
            <Text style={styles.textNameStore}>
              {Item.vendor_branch.display_name}
            </Text>
            <Text style={styles.textAddressStore}>
              {Item.vendor_branch.address}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {'HOLD' == Item.status ? (
                true == Item.is_paid ? (
                  <View style={styles.statusContainer}>
                    <Icon name={NameIcon} size={12} color={SystemGreen} />
                    <Text style={[styles.textStatus, { color: SystemGreen }]}>
                      {Status}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statusContainer}>
                    <Icon name={NameIcon} size={12} color={Color} />
                    <Text style={[styles.textStatus, { color: Color }]}>
                      Chưa thanh toán
                    </Text>
                  </View>
                )
              ) : (
                <View style={styles.statusContainer}>
                  <Icon name={NameIcon} size={12} color={Color} />
                  <Text style={[styles.textStatus, { color: Color }]}>
                    {Status}
                  </Text>
                </View>
              )}

              <Text style={styles.textTimeOrder}>
                <Text>{formatTime(Item.date_created)}</Text> •{' '}
                <Text>{formatDay(Item.date_created)}</Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoShipContainer}>
          <Text style={styles.title}>Thông tin giao hàng</Text>
          <View style={{ marginTop: 15 }}>
            <View style={styles.textPhoneContainer}>
              <Icon name="phone" size={14} color={SystemBlack} />
              <Text style={styles.textPhone}>{orderUser.phone_number}</Text>
            </View>
            <View style={styles.addressShipContainer}>
              <Icon name="map" size={14} color={SystemBlack} />
              <Text style={styles.textAddressShip}>{shippingAddress}</Text>
            </View>
          </View>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.title}>Thông tin đơn hàng</Text>
          {renderItemOrder}
          <View>
            <View style={styles.totalContainer}>
              <View style={styles.itemTotalContaienr}>
                <Text style={styles.textTotal}>Tạm tính</Text>
                <Text style={styles.textTotal}>
                  {numberWithSpaces(Item.total)} đ
                </Text>
              </View>
              <View style={styles.itemTotalContaienr}>
                <Text style={styles.textDiscount}>Giảm giá</Text>
                <Text style={styles.textDiscount}>0 đ</Text>
              </View>
              <View style={styles.itemTotalContaienr}>
                <Text style={styles.textTotal}>Tổng cộng</Text>
                <Text style={styles.textTotal}>
                  {numberWithSpaces(Item.subtotal)} đ
                </Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              {transactions.length > 0 ? (
                transactions[0].status == 'COMPLETED' ? (
                  <View style={styles.itemTotalContaienr}>
                    <Text style={styles.textTotal}>Thanh toán</Text>
                    <Text>
                      ({getPaymentMethodName(transactions[0].payment_method)})
                    </Text>
                  </View>
                ) : (
                  <></>
                )
              ) : (
                <View style={styles.itemTotalContaienr}>
                  <Text style={styles.textTotal}>Thanh toán</Text>
                  <Text>(Không xác định)</Text>
                </View>
              )}
            </View>
            <View style={styles.wavy}></View>
          </View>
        </View>
      </ScrollView>
      <BottomDetailOrder
        onClickCancel={() => {}}
        onClickPay={onPressPay}
        onClickRateClick={() => {}}
        status={Status}
        paid={Item.is_paid}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storeContainer: {
    marginTop: 15,
    height: 110,
    backgroundColor: '#FFF',
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  imageStore: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoStore: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  textNameStore: {
    color: SystemPrimary,
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  textAddressStore: {
    height: 38,
    color: SystemBlack,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.15,
    alignSelf: 'stretch',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: 12,
    letterSpacing: 0.4,
    fontFamily: 'Inter-Regular',
    marginLeft: 5,
  },
  textTimeOrder: {
    fontSize: 12,
    color: SystemGrey00,
    letterSpacing: 0.4,
    fontFamily: 'Inter-Regular',
  },
  title: {
    color: SystemBlack,
    fontSize: 20,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.15,
  },
  infoShipContainer: {
    backgroundColor: '#FFF',
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  textPhoneContainer: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
  },
  textPhone: {
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    color: SystemBlack,
    alignItems: 'center',
    letterSpacing: 0.15,
    fontSize: 14,
  },
  addressShipContainer: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textAddressShip: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: SystemBlack,
    alignItems: 'center',
    letterSpacing: 0.15,
  },
  orderContainer: {
    backgroundColor: '#FFF',
    borderTopColor: SystemGrey05,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  itemContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textQuantity: {
    width: 30,
    fontSize: 14,
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.1,
  },
  textName: {
    width: 200,
    fontSize: 14,
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.1,
    textAlign: 'left',
  },
  textSize: {
    color: SystemGrey01,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.1,
    fontSize: 14,
  },
  textPrice: {
    color: SystemBlack,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.1,
  },
  totalContainer: {
    borderTopColor: SystemGrey05,
    borderTopWidth: 1,
    marginTop: 20,
    paddingVertical: 20,
  },
  itemTotalContaienr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  textTotal: {
    fontSize: 14,
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.1,
  },
  textDiscount: {
    fontSize: 14,
    color: SystemGrey01,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.1,
  },
  wavy: {},
});

//make this component available to the app
export default DetailOrderScreen;

import { storage } from '@path/App';
import CustomBottomInfoOrder from '@path/components/bottoms/bottomInfoOrder';
import { ProgressiveImage } from '@path/components/lazyLoadImage/ProgressiveImage';
import CustomAlert from '@path/components/modals/alert';
import CustomModalLoading from '@path/components/modals/loading';
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
  accountActions,
  selectAccountInfo,
  selectPhoneNumberAccountInfo,
} from '@path/redux/Slices/AccountSlice';
import {
  basketActions,
  selectAllBasketItem,
  selectLatestBasketBranchID,
  selectTotalAmountOnBasket,
} from '@path/redux/Slices/BasketSlice';
import {
  checkoutActions,
  selectUrlCreateCheckout,
} from '@path/redux/Slices/CheckoutSlice';
import { RootState } from '@path/redux/stores/store';
import { formatLongText, numberWithSpaces } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
  PAYMENT_METHOD_ATM_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_I_BANKING,
  PAYMENT_METHOD_I_MASTER_VISA_JBC,
  PAYMENT_METHOD_MOZANIO_WALLET,
} from '@path/constants/constant';
import { paymentActions } from '@path/redux/Slices/Pay/PaymentSlice';
import Modal from 'react-native-modalbox';
import { IconButton, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { UNPAID_ORDER_EXISTS } from '@path/utils/error';
import { orderActions } from '@path/redux/Slices/OrderSlice';
import { PAYMENT_STATUS } from '@path/utils/PaymentStatus';
// create a component
if ('ios' == Platform.OS) {
  IconSimpleLineIcons.loadFont();
  Icon.loadFont();
  IconMaterialIcons.loadFont();
  IconMaterialCommunityIcons.loadFont();
  IconMaterialIcons.hasIcon;
}
const { width, height } = Dimensions.get('window');

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const status = useSelector((state: RootState) => state.checkout.status);

  const accountPhoneInformation = useSelector(selectPhoneNumberAccountInfo);
  const accountInformation = useSelector(selectAccountInfo);

  const latestBranchIdBasket = useSelector(selectLatestBasketBranchID);

  var initPhone = '';
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) initPhone = user.phone_number;

  const [paymentMethodIndex, setPaymentMethodIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(initPhone);
  const [editButtonPhoneCaption, setEditButtonPhoneCaption] =
    useState<string>('S???a');

  const [shippingAddress, setShippingAddress] = useState('42/1 Ung V??n Khi??m');
  const [shippingAddressEditable, setShippingAddressEditable] =
    useState<boolean>(false);
  const [editButtonAddressCaption, setEditButtonAddressCaption] =
    useState<string>('S???a');
  const [phoneNumberEditable, setPhoneNumberEditable] =
    useState<boolean>(false);

  if (null != accountPhoneInformation && null == phoneNumber) {
    setPhoneNumber(accountPhoneInformation);
  }

  const supportedPaymentMethodType = [
    // {
    //   type: PAYMENT_METHOD_INVALID,
    //   name: 'Ch???n ph????ng th???c',
    //   icon: 'note-text-outline',
    //   navigationName: 'WaitForResult',
    //   isActive: false,
    // },
    // {
    //   type: PAYMENT_METHOD_CASH,
    //   name: 'Ti???n m???t',
    //   method: 'CASH',
    //   icon: 'note-text-outline',
    //   navigationName: 'WaitForResult',
    //   isActive: true,
    // },
    {
      type: PAYMENT_METHOD_ATM_CARD,
      name: 'ATM Card',
      code: 'VNBANK',
      method: 'CARD_ATM',
      icon: 'credit-card',
      navigationName: 'SelectPaymentScreen',
      isActive: true,
    },
    {
      type: PAYMENT_METHOD_MOZANIO_WALLET,
      name: 'V?? Mozanio',
      icon: 'envelope',
      navigationName: 'SelectPaymentScreen',
      isActive: true,
    },
    // {
    //   type: PAYMENT_METHOD_I_BANKING,
    //   name: 'Internet Banking',
    //   icon: 'note-text-outline',
    //   navigationName: 'SelectPaymentScreen',
    //   isActive: true,
    // },
    {
      type: PAYMENT_METHOD_I_MASTER_VISA_JBC,
      name: 'International Card',
      code: 'INTCARD',
      method: 'CARD_INTER',
      icon: 'cc-visa',
      navigationName: 'SelectPaymentScreen',
      isActive: true,
    },
  ];

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertWarning, setShowAlertWarning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(accountActions.getAccountDetail());
    dispatch(basketActions.getOrCreateBasket());
    dispatch(paymentActions.clearCurrentPayment());
  }, []);

  useEffect(() => {
    if (status == 'idle') {
      setShowModal(false);
      console.log('idle');
    } else if (status == 'success') {
      setShowModal(false);
      console.log('success');
      // navigation.navigate('Confirm', {
      //   list: listBasketItem,
      //   store: latestBranchIdBasket,
      //   total: totalAmount,
      //   final: finalAmount,
      // });
    } else if (status == 'pending') {
      console.log('pending');
      if ('ios' != Platform.OS) setShowModal(true);
    } else {
      setShowAlertWarning(true);
      setShowModal(false);
    }
  }, [status]);

  const urlCheckoutSuccess = useSelector(selectUrlCreateCheckout);
  const checkoutStatus = useSelector(
    (state: RootState) => state.checkout.status,
  );
  const order = useSelector(
    (state: RootState) => state.order.payload.currentSelectedItem,
  );

  const payment = useSelector((state: RootState) => state.payment.payment);

  const paymentStatus = useSelector(
    (state: RootState) => state.payment.payment_status,
  );

  const listBasketItem = useSelector(selectAllBasketItem);
  const totalAmount = useSelector(selectTotalAmountOnBasket);
  const discountedAmount: number = 0;
  const finalAmount = totalAmount - discountedAmount;
  //const address = '42/1 Ung V??n Khi??m, ph?????ng 25, qu???n B??nh Th???nh';
  const navigateToSelectPaymentScreen = () => {};

  useEffect(() => {
    if ('success' == checkoutStatus) {
      dispatch(basketActions.clearBasket());
      dispatch(basketActions.getOrCreateBasket());
      dispatch(checkoutActions.updateStatusToIdle());
      dispatch(paymentActions.clearCurrentPayment());
    }
  });

  useEffect(() => {
    if (order) {
      const selectedMethod = supportedPaymentMethodType[paymentMethodIndex];
      switch (selectedMethod.type) {
        case PAYMENT_METHOD_CASH:
          break;
        case PAYMENT_METHOD_MOZANIO_WALLET:
          navigation.navigate('PaymentConfirmScreen', {
            order: order,
            list: listBasketItem,
            store: latestBranchIdBasket,
            total: totalAmount,
            final: finalAmount,
          });
          break;
        default:
          dispatch(
            paymentActions.requestPayment({
              bank_code: supportedPaymentMethodType[paymentMethodIndex].code,
              locale: 'vn',
              target_id: order.id,
              target_type: 'ORDER',
              payment_method:
                supportedPaymentMethodType[paymentMethodIndex].method,
              amount: Number(order.total),
              currency: 1,
            }),
          );
          break;
      }
    }
  }, [order]);

  useEffect(() => {
    if (payment) {
      navigation.navigate('SelectPaymentScreen', {
        url: payment.payment_url,
        id: payment.id,
        ref: order.ref,
      });
    }
  }, [payment]);

  useEffect(() => {
    if (paymentStatus === PAYMENT_STATUS.COMPLETED) {
      navigation.navigate('CongratsScreen', {
        list: order.items,
        store: order.vendor_branch.id,
        total: order.subtotal,
        final: order.total,
      });
      // dispatch(orderActions.clearCurrentOrder());
    }
    if (paymentStatus === PAYMENT_STATUS.FAILED) {
      navigation.navigate('MainScreen');
      dispatch(orderActions.clearCurrentOrder());
    }
  }, [paymentStatus]);

  const deleteOneBasketItem = (ref: string) => {
    dispatch(basketActions.removeUserBasketItem({ ref }));
  };

  const onPressRemoveItem = (item: any) => {
    Alert.alert(
      'Th??ng b??o',
      `Xo??  ${item.product.name} ra kh???i ????n hi???n t???i `,
      [
        {
          text: 'H???y',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '?????ng ?? ',
          onPress: () => {
            if (item.ref) {
              console.log('on press reme item', JSON.stringify(item.ref));
              deleteOneBasketItem(item.ref);
            } else {
              console.log('There is no ref on item ', JSON.stringify(item.ref));
            }
          },
        },
      ],
    );
  };
  const placeAnOrder = () => {
    setShowAlert(false);
    dispatch(
      checkoutActions.createCheckout({
        email: 'dinh.truong@zien.vn',
        shipping_address: shippingAddress,
        billing_address: 'cccc',
        payment_method: 'pay-in-advance',
      }),
    );
    //setShowModal(true);
  };
  const onPressPlaceOrder = () => {
    setShowAlert(true);
  };

  const onPressTotalAmount = () => {};

  const RenderPaymentMethod = ({ index, item }: any) => {
    return (
      <TouchableOpacity
        style={styles.paymentItem}
        onPress={() => {
          setPaymentMethodIndex(index);
          setModalVisible(false);
        }}>
        <Icon name={item.icon} size={25} color={'#354C86'} />
        <Text style={{ marginHorizontal: 10, color: '#000' }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const PaymentMethodModal = () => {
    return (
      <Modal
        entry="bottom"
        backdropPressToClose={true}
        isOpen={modalVisible}
        style={styles.modalBox}
        onClosed={() => setModalVisible(false)}>
        <View style={styles.content}>
          <View style={styles.paymentTitle}>
            <View style={{ opacity: 0 }}>
              <IconButton icon="close" size={20} disabled />
            </View>
            <Title>Ph????ng th???c thanh to??n</Title>
            <IconButton
              icon="close"
              size={20}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
          <FlatList
            style={{ width: '100%' }}
            data={supportedPaymentMethodType}
            keyExtractor={(item, index) => index.toString()}
            renderItem={RenderPaymentMethod}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
          />
        </View>
      </Modal>
    );
  };

  const renderedItems = listBasketItem.map((item: any) => {
    return (
      <View style={styles.itemContainer} key={item.ref}>
        <View style={styles.leftItemContainer}>
          <ProgressiveImage
            thumbnailSource={require('../../assets/images/imageVoucher.png')}
            source={
              item?.thumbnail
                ? { uri: item?.thumbnail }
                : require('../../assets/images/imageVoucher.png')
            }
            style={styles.imageItem}
            resizeMode="cover"
          />
          <View style={styles.infoItemContainer}>
            <Text style={styles.textTitleItem}>
              {formatLongText(item.product.name, 20)} (x{item.quantity}){' '}
            </Text>
            <Text style={styles.textSizeItem}>
              Size: {item.extra?.size_config?.size?.product_size?.display_name}
            </Text>
          </View>
        </View>
        <View style={styles.RightItemContainer}>
          <Text style={styles.textPriceItem}>
            {numberWithSpaces(Number(item.subtotal))} ??
          </Text>
          <TouchableOpacity
            style={styles.buttonRemove}
            onPress={() => onPressRemoveItem(item)}>
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

  return (
    <SafeAreaView style={styles.container}>
      <CustomModalLoading showModal={showModal} />
      <CustomAlert
        showAlert={showAlertWarning}
        title={'Th??ng b??o'}
        description={'Hi???n t???i h??? th???ng ??ang g???p s??? c???, xin vui l??ng th??? l???i.'}
        onPressAccept={() => {}}
        onPressCancel={() => {
          setShowAlertWarning(false);
        }}
        type="warning"
      />
      <CustomAlert
        showAlert={showAlert}
        title={'Th??ng b??o'}
        description={`B???n ch???c ch???n ?????t h??ng giao t???i ?????a ch??? : ${shippingAddress}.`}
        onPressAccept={() => {
          placeAnOrder();
        }}
        onPressCancel={() => {
          setShowAlert(false);
        }}
        type="notification"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Th??ng tin giao h??ng</Text>
          <View style={{ marginTop: 15 }}>
            <View style={styles.phoneContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconSimpleLineIcons
                  name="phone"
                  size={19}
                  color={SystemBlack}
                />
                {phoneNumberEditable ? (
                  <TextInput
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={(text: string) => {
                      setPhoneNumber(text);
                    }}
                    textAlignVertical="center"
                    style={styles.textPhoneInput}
                  />
                ) : (
                  <Text style={styles.textPhone}>{phoneNumber}</Text>
                )}
                <Text
                  onPress={() => {
                    if (!phoneNumberEditable) {
                      setPhoneNumberEditable(true);
                      setEditButtonPhoneCaption('C???p nh???t');
                    } else {
                      const oldPhoneNumber = accountInformation.phone_number;
                      const newAccountInfo = accountInformation;
                      delete newAccountInfo.created_time;
                      delete newAccountInfo.updated_time;
                      delete newAccountInfo.avatar;
                      newAccountInfo.phone_number = phoneNumber;
                      console.log('new account with new phone', newAccountInfo);

                      if (phoneNumber != oldPhoneNumber) {
                        console.log('new phone number', phoneNumber);
                        dispatch(
                          accountActions.updateAccountDetail(newAccountInfo),
                        );
                      } else {
                        console.log(accountInformation.phone_number);
                        console.log(phoneNumber);
                        console.log('Same phone number not update');
                      }

                      setPhoneNumberEditable(false);
                      setEditButtonPhoneCaption('S???a');
                    }
                  }}
                  style={styles.buttonEdit}>
                  {editButtonPhoneCaption}
                </Text>
              </View>
            </View>
            <View style={styles.addressContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconSimpleLineIcons name="map" size={19} color={SystemBlack} />
                {shippingAddressEditable ? (
                  <TextInput
                    keyboardType="default"
                    value={shippingAddress}
                    onChangeText={(text: string) => {
                      setShippingAddress(text);
                    }}
                    textAlignVertical="center"
                    style={styles.textAdressInput}
                  />
                ) : (
                  <Text style={styles.textAdress}>{shippingAddress}</Text>
                )}
                <Text
                  onPress={() => {
                    if (!shippingAddressEditable) {
                      setEditButtonAddressCaption('C???p nh???t');
                      setShippingAddressEditable(true);
                    } else {
                      setShippingAddressEditable(false);
                      setEditButtonAddressCaption('S???a');
                    }
                  }}
                  style={styles.buttonEdit}>
                  {editButtonAddressCaption}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.ListitemContainer}>
          <Text style={styles.title}>Th??ng tin ????n h??ng</Text>
          {renderedItems}
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.textPriceContainer}>
            <Text style={[styles.textTitlePrice, { color: SystemBlack }]}>
              T???m t??nh
            </Text>
            <Text style={[styles.textPrice, { color: SystemBlack }]}>
              {numberWithSpaces(Number(totalAmount))} ??
            </Text>
          </View>
          <View style={styles.textPriceContainer}>
            <Text style={[styles.textTitlePrice, { color: SystemBlack }]}>
              Gi???m
            </Text>
            <Text style={[styles.textPrice, { color: SystemSecondary }]}>
              -{discountedAmount} ??
            </Text>
          </View>
          <View style={styles.textPriceContainer}>
            <Text style={[styles.textTitlePrice, { color: SystemBlue }]}>
              Th??nh ti???n
            </Text>
            <Text style={[styles.textPrice, { color: SystemBlue }]}>
              {numberWithSpaces(Number(finalAmount))} ??
            </Text>
          </View>
        </View>
        <View style={styles.discountContainer}>
          <TouchableOpacity
            style={styles.buttonDiscount}
            onPress={() => {
              setModalVisible(true);
            }}>
            <IconMaterialIcons
              name="attach-money"
              size={24}
              color={SystemOrange}
            />
            <Text style={styles.nameDiscount}>
              {supportedPaymentMethodType[paymentMethodIndex].name}
            </Text>
            <IconMaterialIcons
              name="chevron-right"
              size={24}
              color={SystemBlack}
            />
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity style={styles.buttonDiscount}>
            <IconMaterialCommunityIcons
              name="brightness-percent"
              size={24}
              color={SystemOrange}
            />
            <Text style={styles.nameDiscount}>Gi???m 0%</Text>
            <IconMaterialIcons
              name="chevron-right"
              size={24}
              color={SystemBlack}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomBottomInfoOrder
        totalAmount={finalAmount}
        onPressPlaceOrder={onPressPlaceOrder}
        onPressTotalAmount={onPressTotalAmount}
        buttonCaption="?????t h??ng"
        disabled={listBasketItem.length > 0 ? false : true}
      />
      <PaymentMethodModal />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
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
  phoneContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
  },
  textPhoneInput: {
    flex: 1,
    color: SystemBlack,
    marginHorizontal: 5,
    fontSize: 13,
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  textPhone: {
    flex: 1,
    color: SystemBlack,
    marginHorizontal: 5,
    fontSize: 13,
    paddingHorizontal: 10,
  },
  buttonEdit: {
    color: SystemSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.1,
    fontSize: 13,
  },
  addressContainer: {
    height: 50,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
  },
  textAdressInput: {
    flex: 1,
    color: SystemBlack,
    marginHorizontal: 5,
    fontSize: 13,
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  textAdress: {
    flex: 1,
    color: SystemBlack,
    marginHorizontal: 5,
    fontSize: 13,
    paddingHorizontal: 10,
  },
  buttonEdititem: {
    color: SystemSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.1,
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
    backgroundColor: '#d7dbe7',
  },
  leftItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItemContainer: {
    height: 61,
    flexDirection: 'column',
    marginLeft: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 20,
  },
  modalBox: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height,
    width,
    backgroundColor: 'transparent',
  },
  content: {
    width: width,
    height: '70%',
    borderTopLeftRadius: 20,
    alignItems: 'center',
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 22,
  },
  paymentItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  paymentTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
  },
});

//make this component available to the app

export default CheckoutScreen;

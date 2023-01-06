//import liraries
import CustomAlert from '@path/components/modals/alert';
import CustomModalLoading from '@path/components/modals/loading';
import {
  SystemBlack,
  SystemBlue,
  SystemGreen,
  SystemGrey00,
  SystemGrey01,
  SystemGrey05,
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import {
  accountActions,
  selectAccountInfo,
} from '@path/redux/Slices/AccountSlice';
import { selectCreatePasscodeStatus } from '@path/redux/Slices/Pay/CreatePasscodeSlice';
import { paymentActions } from '@path/redux/Slices/Pay/PaymentSlice';
import { RootState } from '@path/redux/stores/store';
import { Denominations } from '@path/utils/json/Denominations';
import { PaymentMenthods } from '@path/utils/json/PaymentMenthods';
import { PAYMENT_STATUS } from '@path/utils/PaymentStatus';
import { maskCurrency } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
// create a component
const TopUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [denomination, setDenomination] = useState<any>(Denominations[0]);
  const [valueTextInput, setValueTextInput] = useState<any>(
    maskCurrency(Denominations[0].money.toString()),
  );
  const [paymentMenthods, setPaymentMenthods] = useState(
    PaymentMenthods[0].method,
  );
  const [paymentCode, setPaymentCode] = useState(PaymentMenthods[0].code);
  const [showAlertNotifications, setShowAlertNotifications] = useState(false);
  const [showAlertWarning, setShowAlertWarning] = useState(false);
  const accountInfo = useSelector(selectAccountInfo);
  const hadPassCode = accountInfo?.had_pass_code;

  useEffect(() => {
    console.log('Get user account');
    dispatch(accountActions.getAccountDetail());
  }, []);

  const checkIfHadPassCode = () => {};
  const onChangeValueTextInput = (text: any) => {
    const textFormatCurrency = maskCurrency(text);
    setValueTextInput(textFormatCurrency);
  };
  const renderItemDenominations = ({ item, index }: any) => {
    const denominations = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 9,
    }).format(item.money);
    return (
      <TouchableOpacity
        style={[
          styles.itemDenominations,
          {
            backgroundColor: denomination === item ? SystemGreen : '#00AB564D',
          },
        ]}
        key={item.id}
        onPress={() => {
          if (denomination !== item) {
            setDenomination(item);
            const textDenomination = maskCurrency(item?.money + '');
            setValueTextInput(textDenomination);
          } else {
            setDenomination(null);
            setValueTextInput(0);
          }
        }}>
        <Text
          style={[
            styles.textItemDenominations,
            { color: denomination === item ? '#FFF' : SystemGreen },
          ]}>
          {denominations}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItemPaymentMenthods = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        key={item.id}
        style={[styles.itemMethods, styles.shadow]}
        onPress={() => {
          setPaymentMenthods(item.method);
          setPaymentCode(item.code);
        }}>
        <View style={{ flexDirection: 'row' }}>
          <IconMaterialIcons
            name={
              paymentMenthods === item.method
                ? 'radio-button-on'
                : 'radio-button-off'
            }
            size={20}
            color={
              paymentMenthods === item.method ? SystemPrimary : SystemBlack
            }
          />
          <Text
            style={[
              styles.textNamePaymentMenthod,
              {
                color:
                  paymentMenthods === item.method ? SystemPrimary : SystemBlack,
              },
            ]}>
            {item.display_name}
          </Text>
        </View>
        <IconEvilIcons name="chevron-right" color={SystemBlack} size={20} />
      </TouchableOpacity>
    );
  };
  const onClickAccept = () => {
    try {
      dispatch(
        paymentActions.requestPayment({
          bank_code: paymentCode,
          locale: 'vn',
          target_id: accountInfo?.wallet.id,
          target_type: 'WALLET',
          payment_method: paymentMenthods,
          amount: valueTextInput.replace(/[, ]+/g, '').trim(),
          currency: 1,
        }),
      );
      setShowAlertNotifications(false);
    } catch (error) {
      console.log(error);
    }
  };
  const loadingWebViewPayment = useSelector(
    (root: RootState) => root.payment.isLoading,
  );
  const payment = useSelector((root: RootState) => root.payment.payment);

  const paymentStatus = useSelector(
    (root: RootState) => root.payment.payment_status,
  );

  useEffect(() => {
    if (PAYMENT_STATUS.COMPLETED == paymentStatus) {
      navigation.navigate('TopupResultScreen', {
        item: { status: true, name: 'orders', amount: valueTextInput },
      });
    }
    if (PAYMENT_STATUS.FAILED == paymentStatus) {
      navigation.navigate('TopupResultScreen', {
        item: { status: false, name: 'orders' },
      });
    }
  }, [paymentStatus]);

  useEffect(() => {
    // if (payment && PAYMENT_STATUS.FAILED != payment?.status
    //   && payment && PAYMENT_STATUS.COMPLETED != payment?.status) {
    //   navigation.navigate('SelectPaymentScreen', {
    //     url: payment.payment_url,
    //     id: payment.id,
    //   });
    // }
    if (payment) {
      navigation.navigate('SelectPaymentScreen', {
        url: payment.payment_url,
        id: payment.id,
      });
    }
  }, [payment]);

  return (
    <View style={styles.container}>
      <CustomAlert
        showAlert={showAlertNotifications}
        title={'Thông báo'}
        description={'Bạn chắc chắn với quyết định này?'}
        onPressAccept={onClickAccept}
        onPressCancel={() => {
          setShowAlertNotifications(false);
        }}
        type={'notification'}
      />
      <CustomAlert
        showAlert={showAlertWarning}
        title={'Thông báo'}
        description={
          'Xin vui lòng chọn phương thức thanh toán và nhập số tiền đầy đủ.'
        }
        onPressAccept={undefined}
        onPressCancel={() => {
          setShowAlertWarning(false);
        }}
        type={'warning'}
      />
      <CustomModalLoading showModal={loadingWebViewPayment} />
      <View style={[styles.topUpValueContainer, styles.shadow]}>
        <View style={styles.textInputTopUpValueContainer}>
          <TextInput
            style={styles.textInputTopUpValue}
            textAlign="center"
            maxLength={11}
            value={valueTextInput}
            onChangeText={onChangeValueTextInput}
            keyboardType="numeric"
          />
          <Text style={styles.textCurrency}>đ</Text>
        </View>
        {/* <Text style={styles.textErrorValueTopUp}>
          Số tiền phải chia hết cho 1000
        </Text> */}
        <FlatList
          style={styles.listDenominations}
          data={Denominations}
          numColumns={3}
          renderItem={renderItemDenominations}
        />
      </View>
      <FlatList
        style={styles.listPaymenMenthods}
        data={PaymentMenthods}
        renderItem={renderItemPaymentMenthods}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={[styles.textTotal, { color: SystemBlack }]}>
              Số tiền nạp
            </Text>
            <Text style={[styles.textTotal, { color: SystemBlack }]}>
              {valueTextInput} đ
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={[styles.textTotal, { color: SystemGrey01 }]}>
              Phí dịch vụ
            </Text>
            <Text style={[styles.textTotal, { color: SystemGrey01 }]}>0 đ</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={[styles.textTotal, { color: SystemBlack }]}>
              Tổng thanh toán
            </Text>
            <Text style={[styles.textTotal, { color: SystemPrimary }]}>
              {valueTextInput} đ
            </Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={styles.buttonAccept}
          onPress={() => {
            if (false == hadPassCode) {
              Alert.alert(
                `Bạn chưa thiết lập passcode`,
                'Vui lòng thiết lập passcode trươc khi nạp tiền',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      // onCancelPress()
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'Ok',
                    onPress: () => {
                      navigation.navigate('Passcode');
                    },
                  },
                ],
              );
            } else {
              if (paymentMenthods && valueTextInput) {
                setShowAlertNotifications(true);
              } else {
                setShowAlertWarning(true);
              }
            }
          }}>
          <Text style={styles.textButtonAccept}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  topUpValueContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInputTopUpValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputTopUpValue: {
    flex: 1,
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: SystemGrey00,
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: SystemPrimary,
  },
  textCurrency: {
    position: 'absolute',
    right: 0,
    height: 40,
    width: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: SystemGrey01,
    fontFamily: 'Inter-Medium',
  },
  textErrorValueTopUp: {
    textAlign: 'center',
    marginTop: 20,
    color: SystemSecondary,
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: 'Inter-Medium',
  },
  listDenominations: {
    marginTop: 20,
  },
  itemDenominations: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 0.5,
    borderColor: SystemGreen,
    borderRadius: 5,
  },
  textItemDenominations: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  listPaymenMenthods: {
    marginTop: 20,
  },
  itemMethods: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  textNamePaymentMenthod: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: SystemGrey05,
  },
  totalContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  textTotal: {
    fontSize: 14,
    letterSpacing: 0.5,
    fontFamily: 'Inter-Medium',
  },
  buttonAccept: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: SystemPrimary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textButtonAccept: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
});

//make this component available to the app
export default TopUpScreen;

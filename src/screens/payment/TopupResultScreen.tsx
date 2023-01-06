//import liraries
import CustomAlert from '@path/components/modals/alert';
import {
  SystemBlack,
  SystemBlue,
  SystemGreen,
  SystemGrey01,
  SystemOrange,
  SystemPrimary,
  SystemSecondary,
  SystemYellow,
} from '@path/localization/colors/colors';
import { accountActions } from '@path/redux/Slices/AccountSlice';
import { selectPayment } from '@path/redux/Slices/Pay/PaymentSlice';
import { RootState } from '@path/redux/stores/store';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { maskCurrency, numberWithSpaces } from '../../utils/utilities';
// create a component
const TopupResultScreen = ({ route }: any) => {
  const itemHistoryPayment = route?.params?.item;
  // const amount = route?.params?.item?.amount;
  // console.log(route?.params);
  const dispatch = useDispatch();
  // const payment = useSelector(selectPayment);
  // const [showAlert, setShowAlert] = useState(false);
  const [statusHistory, setStatusHistory] = useState('');
  const navigation = useNavigation();

  const paymentResponse = useSelector(
    (root: RootState) => root.payment.payment,
  );
  // console.log('Payment paymentResponse:', typeof paymentResponse?.created_time);
  // if (paymentResponse?.created_time) {
  //   const utcDate = new Date(paymentResponse?.created_time)
  //   console.log(utcDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
  // }

  useEffect(() => {
    if (itemHistoryPayment.status === true) {
      setStatusHistory('thành công');
    } else {
      setStatusHistory('thất bại');
    }
  }, [itemHistoryPayment.status]);
  let background = '';
  let nameIcon = '';
  let detailHistoryDisplayName = '';
  if (false == itemHistoryPayment.status) {
    background = SystemOrange;
  } else {
    background = SystemBlue;
  }

  switch (itemHistoryPayment.name) {
    case 'transfers':
      //background = SystemGreen;
      nameIcon = 'arrowup';
      detailHistoryDisplayName = 'Chuyển khoản';
      break;
    case 'receive':
      //background = SystemOrange;
      nameIcon = 'arrowdown';
      detailHistoryDisplayName = 'Nhận tiền';
      break;
    case 'orders':
      //background = SystemBlue;
      nameIcon = 'shoppingcart';
      detailHistoryDisplayName = 'Thanh toán đơn hàng';
      break;
    case 'refund':
      // background = SystemYellow;
      nameIcon = 'sync';
      detailHistoryDisplayName = 'Hoàn tiền';
      break;
    case 'refuse':
      // background = SystemSecondary;
      nameIcon = 'exclamation';
      detailHistoryDisplayName = 'Giao dịch đã bị Hủy';
      break;
  }
  console.log();
  return (
    <View style={styles.container}>
      <View style={[styles.detailContainer, styles.shadow]}>
        <Text style={styles.textTitle}>
          {itemHistoryPayment.name === 'refuse'
            ? detailHistoryDisplayName
            : detailHistoryDisplayName + ' ' + `${statusHistory}`}
        </Text>
        <View
          style={[
            styles.statusContainer,
            { backgroundColor: background },
            styles.shadow,
          ]}>
          <IconAntDesign name={nameIcon} size={20} color="#FFF" />
        </View>
        <Text style={styles.textTotalPayment}>
          {/* {maskCurrency()} đ */}
          {numberWithSpaces(paymentResponse?.amount)} đ
        </Text>
      </View>
      <View style={[styles.detailContainer, styles.shadow]}>
        <View style={styles.itemDetail}>
          <Text style={styles.textTitleDetail}>Phương thức thanh toán:</Text>

          <Text style={styles.textDesDetail}>
            {paymentResponse?.payment_method == 'CARD_INTER'
              ? 'Thẻ quốc tế'
              : paymentResponse?.payment_method == 'CARD_ATM'
              ? 'Thẻ ATM'
              : 'Không xác định'}
          </Text>
        </View>
        <View style={styles.itemDetail}>
          <Text style={styles.textTitleDetail}>Mã giao dịch:</Text>
          <Text style={styles.textDesDetail}>
            {paymentResponse?.payment_code}
          </Text>
        </View>
        {paymentResponse?.created_time ? (
          <View style={styles.itemDetail}>
            <Text style={styles.textTitleDetail}>Ngày khởi tạo:</Text>
            <Text style={styles.textDesDetail}>
              {new Date(paymentResponse?.created_time).toLocaleString('en-US', {
                timeZone: 'Asia/Jakarta',
              })}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.ButtonAcceptContainer, styles.shadow]}
        onPress={() => {
          dispatch(accountActions.getAccountDetail());
          navigation.navigate('MainScreen');
        }}>
        <Text style={styles.textButtonAccept}>Xong</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: 'Inter-Bold',
    color: SystemBlack,
    marginBottom: 20,
  },
  statusContainer: {
    width: 60,
    height: 60,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  textTotalPayment: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
    color: SystemBlack,
    textAlign: 'center',
    marginBottom: 20,
  },
  detailContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 20,
  },
  itemDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textTitleDetail: {
    fontSize: 14,
    color: SystemBlack,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  textDesDetail: {
    fontSize: 14,
    color: SystemGrey01,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
  ButtonAcceptContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: SystemPrimary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textButtonAccept: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
});

//make this component available to the app
export default TopupResultScreen;

//import liraries
import {
  SystemBlack,
  SystemGreen,
  SystemGrey01,
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import { formatDay, numberWithSpaces } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
// create a component
const DetailHistoryPaymentScreen = ({ route }: any) => {
  const { detail } = route.params;
  const Date = formatDay(detail.created_time);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={[styles.detailContainer, styles.shadow]}>
        <Text style={styles.textTitle}>
          {detail.target_type.model === 'wallet'
            ? 'Nạp tiền vào Mozanio'
            : 'Thanh toán đơn hàng'}{' '}
          {detail.status === 'COMPLETED' ? 'thành công' : 'thất bại'}
        </Text>
        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor:
                detail.status === 'COMPLETED' ? SystemGreen : SystemSecondary,
            },
            styles.shadow,
          ]}>
          <IconAntDesign
            name={
              detail.target_type.model === 'wallet'
                ? 'creditcard'
                : 'shoppingcart'
            }
            size={20}
            color="#FFF"
          />
        </View>
        <Text style={styles.textTotalPayment}>
          {numberWithSpaces(detail.amount)} đ
        </Text>
      </View>
      <View style={[styles.detailContainer, styles.shadow]}>
        <View style={styles.itemDetail}>
          <Text style={styles.textTitleDetail}>Phương thức:</Text>
          <Text style={styles.textDesDetail}>
            {detail.payment_method === 'CARD_ATM'
              ? 'Thẻ ngân hàng nội địa'
              : 'Thẻ ngân hàng quốc tế'}
          </Text>
        </View>
        <View style={styles.itemDetail}>
          <Text style={styles.textTitleDetail}>Mã giao dịch:</Text>
          <Text style={styles.textDesDetail}>{detail.payment_code}</Text>
        </View>
        <View style={styles.itemDetail}>
          <Text style={styles.textTitleDetail}>Ngày khởi tạo:</Text>
          <Text style={styles.textDesDetail}>{Date}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.ButtonAcceptContainer, styles.shadow]}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.textButtonAccept}>Xác nhận</Text>
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
export default DetailHistoryPaymentScreen;

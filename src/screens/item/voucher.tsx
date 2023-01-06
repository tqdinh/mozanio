//import liraries
import {
  SystemBlack,
  SystemGrey01,
  SystemGrey05,
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

interface voucherProp {
  title: string;
}
// create a component
const voucher = new Array(3).fill(0);
const Voucher = ({ title }: voucherProp) => {
  const renderItemVoucher = ({ item, index }: any) => {
    return (
      <View style={[styles.itemContainer, styles.shadow]}>
        <View style={styles.circleLeft} />
        <View style={styles.circleRight} />
        <View style={styles.dashedLine} />
        <Text style={styles.titleVoucher}>E-voucher</Text>
        <Text style={styles.expiryVoucher}>HSD: còn 3 ngày</Text>
        <View style={styles.detailVoucherContainer}>
          <Image
            source={require('../../assets/images/imageVoucher.png')}
            style={styles.imageItem}
          />
          <View style={styles.informationVoucher}>
            <Text style={styles.nameVoucher}>
              Ưu đãi khách hàng mới Miễn phí lần đầu tiên
            </Text>
            <Text style={styles.priceVoucher}>50.000Đ</Text>
            <Text style={styles.buttonUseVoucher}>DÙNG NGAY</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text
          style={styles.textButtonAll}
          onPress={() => console.log('See more...')}>
          Tất cả
        </Text>
      </View>
      <FlatList
        data={voucher}
        renderItem={renderItemVoucher}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    height: 273,
    backgroundColor: '#FFFFFF',
  },
  textTitleContainer: {
    height: 24,
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    width: 200,
    height: 24,
    fontSize: 20,
    color: SystemBlack,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontFamily: 'Inter-Medium',
  },
  textButtonAll: {
    width: 42,
    height: 17,
    fontSize: 14,
    color: SystemSecondary,
    fontFamily: 'Inter',
    lineHeight: 17,
    letterSpacing: 0.1,
  },
  itemContainer: {
    width: 350,
    height: 190,
    backgroundColor: '#F8F8FF',
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 8,
    flexDirection: 'column',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  dashedLine: {
    position: 'absolute',
    width: 330,
    top: 49.5,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: SystemGrey05,
    alignSelf: 'center',
  },
  circleLeft: {
    top: 41,
    left: -9,
    position: 'absolute',
    width: 17,
    height: 17,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  circleRight: {
    top: 41,
    right: -9,
    position: 'absolute',
    width: 17,
    height: 17,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  titleVoucher: {
    position: 'absolute',
    top: 16,
    left: 20,
    fontFamily: 'Inter-Medium',
    color: SystemBlack,
    lineHeight: 17,
    letterSpacing: 0.1,
  },
  expiryVoucher: {
    position: 'absolute',
    top: 16,
    right: 20,
    fontFamily: 'Inter',
    color: SystemGrey01,
    lineHeight: 17,
    letterSpacing: 0.1,
  },
  detailVoucherContainer: {
    top: 65,
    alignSelf: 'center',
    position: 'absolute',
    width: 316,
    height: 109,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageItem: {
    width: 109,
    height: 109,
    borderRadius: 8,
  },
  informationVoucher: {
    width: 195,
    height: 109,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  nameVoucher: {
    width: 155,
    height: 34,
    fontFamily: 'Inter-Medium',
    color: SystemBlack,
    lineHeight: 17,
    letterSpacing: 0.1,
  },
  priceVoucher: {
    fontSize: 20,
    fontFamily: 'Inter-Medium',
    color: SystemBlack,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  buttonUseVoucher: {
    textAlign: 'right',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: SystemPrimary,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
});

//make this component available to the app
export default Voucher;

//import liraries
import {
  SystemBlack,
  SystemGreen,
  SystemGrey02,
  SystemPrimary,
  SystemSecondary,
  SystemYellow,
} from '@path/localization/colors/colors';
import {
  historyPaymentActions,
  selectListHistoryPayment,
  selectLoadingHistoryPayment,
  selectLoadingMoreHistoryPayment,
  selectNextListHistoryPayment,
} from '@path/redux/Slices/Pay/HistoryPaymentSlice';
import { convertToNiceDate, numberWithSpaces } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
// create a component
const HistoriesPaymentScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const listHistoryPayment = useSelector(selectListHistoryPayment);
  const isLoading = useSelector(selectLoadingHistoryPayment);
  const isLoadingMore = useSelector(selectLoadingMoreHistoryPayment);
  const newListHistoryPayment = [...listHistoryPayment];
  const onLoadMoreCall = () => {
    dispatch(historyPaymentActions.getMoreListHistoryPaymnet());
  };
  const nextPageListHistoryPayment = useSelector(selectNextListHistoryPayment);
  const renderItemHistoryPayment = ({ item, any }: any) => {
    const price = numberWithSpaces(item.amount);
    const date = convertToNiceDate(new Date(item?.created_time).toString());
    const target_type = item?.target_type.model;
    // console.log(JSON.stringify(item, null, 2));
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('DetailHistoryPaymentScreen', { detail: item });
        }}
        style={[styles.itemHistoryPaymentContainer, styles.shadow]}>
        <View style={styles.leftContainer}>
          <View
            style={[
              styles.backgounrIconHistoryPayment,
              {
                backgroundColor:
                  item.status === 'COMPLETED' ? SystemGreen : SystemSecondary,
              },
            ]}>
            <IconAntDesign
              name={target_type === 'wallet' ? 'creditcard' : 'shoppingcart'}
              size={15}
              color="#FFF"
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.textTitle}>
              {target_type === 'wallet'
                ? 'Dịch vụ ví Mozanio'
                : 'Thanh toán đơn hàng'}
            </Text>
            <Text style={styles.textDes}>
              {item.payment_method === 'CARD_ATM'
                ? 'Thẻ ngân hàng nội địa'
                : 'Thẻ ngân hàng quốc tế'}
            </Text>
            <Text style={styles.textDate}>{date}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.textMoney}>{price} đ</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <IconAntDesign
              name={item.status === 'COMPLETED' ? 'checkcircle' : 'closecircle'}
              size={10}
              color={
                item.status === 'COMPLETED' ? SystemGreen : SystemSecondary
              }
            />
            <Text
              style={[
                styles.textStatus,
                {
                  color:
                    item.status === 'COMPLETED' ? SystemGreen : SystemSecondary,
                },
              ]}>
              {item.status === 'COMPLETED' ? 'Thành công' : 'Thất bại'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const footerListHistoryPayment = () => {
    return (
      <View
        style={[
          isLoadingMore === true && nextPageListHistoryPayment !== null
            ? styles.footerListBranchContainer
            : { display: 'none' },
        ]}>
        <ActivityIndicator size="small" color={SystemPrimary} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={newListHistoryPayment}
        renderItem={renderItemHistoryPayment}
        ListFooterComponent={footerListHistoryPayment}
        onEndReachedThreshold={0.01}
        onEndReached={onLoadMoreCall}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              dispatch(
                historyPaymentActions.getListHistoryPayment({
                  limit: 10,
                }),
              );
            }}
          />
        }
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemHistoryPaymentContainer: {
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  leftContainer: {
    flexDirection: 'row',
  },
  backgounrIconHistoryPayment: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 14,
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
  textDes: {
    fontSize: 10,
    color: SystemGrey02,
    marginTop: 2,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
  textDate: {
    fontSize: 10,
    color: SystemGrey02,
    marginTop: 2,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
  textStatus: {
    fontSize: 10,
    marginTop: 5,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
    marginLeft: 5,
  },
  textMoney: {
    fontSize: 12,
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
  footerListBranchContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default HistoriesPaymentScreen;

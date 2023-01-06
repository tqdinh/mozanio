//import liraries
import {
  SystemBlack,
  SystemGreen,
  SystemGrey00,
  SystemGrey01,
  SystemGrey05,
  SystemOrange,
  SystemSecondary,
} from '@path/localization/colors/colors';
import {
  orderActions,
  OrderItemPayload,
  selectAllOrders,
} from '@path/redux/Slices/OrderSlice';
import { RootState } from '@path/redux/stores/store';
import {
  formatDay,
  formatTime,
  getPaymentMethodName,
  numberWithSpaces,
} from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Type from '../item/type';
// create a component
const listType = [
  { id: 0, type: 'HOLD', name: 'Chờ nhận' },
  { id: 1, type: 'PROCESSING', name: 'Đang pha chế' },
  { id: 2, type: 'DONE', name: 'Chờ nhận hàng' },
  { id: 3, type: 'COMPLETED', name: 'Đã thanh toán' },
];
const address = '42/1 Ung Văn Khiêm, phường 25, quận Bình Thạnh';
const HistoryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoadingOrder =
    useSelector((root: RootState) => root.order.status) == 'loading'
      ? true
      : false;

  const listOrder = useSelector(selectAllOrders);

  const [orders, setOrders] = useState<Array<OrderItemPayload>>([]);

  const onLoadMoreCall = () => {
    dispatch(orderActions.getMoreOrderHistory());
  };
  const onRefreshCall = () => {
    dispatch(orderActions.getOrderHistory());
  };
  useEffect(() => {
    dispatch(orderActions.getOrderHistory());
    // const interval = setInterval(() => {
    //   console.log('Get history updated');
    //   dispatch(orderActions.getOrderHistory());
    // }, 20000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (listOrder) {
      setOrders(listOrder);
    }
  }, [listOrder]);

  const getItemName = (items: any) => {
    let ret = '';
    items.forEach((element: any) => {
      ret = ret.concat(element.product.name + ' + ');
    });
    let finalString = ret.substring(0, ret.lastIndexOf(' + '));
    // return ret.substring(0, ret.lastIndexOf(' + ')).substring(0, 20);
    return ret.substring(0, ret.lastIndexOf(' + '));
  };

  const [filterType, setFilterType] = useState('HOLD');
  const [color, setColor] = useState(SystemOrange);
  const [height, setHeight] = useState(100);
  const [status, setStatus] = useState('Chờ xác nhận');
  const [nameIcon, setNameIcon] = useState('hourglass-start');
  let renderList = orders.filter(e => e.status === filterType);
  const getType = (type: string) => {
    switch (type) {
      case 'PROCESSING':
        renderList = orders.filter(e => e.status == 'PROCESSING');
        console.log('procesingList', renderList.length);
        setFilterType('PROCESSING');
        setColor('#007AFF');
        // setHeight(100);
        setNameIcon('hourglass-start');
        setStatus('Đang xử lý');
        break;
      case 'COMPLETED':
        renderList = orders.filter(e => e.status == 'COMPLETED');
        console.log('completedList', renderList.length);
        setFilterType('COMPLETED');
        setColor(SystemGreen);
        // setHeight(135);
        setNameIcon('check-circle');
        setStatus('Đã hoàn thành');
        break;
      case 'HOLD':
        renderList = orders.filter(e => e.status == 'HOLD');
        console.log('holdList', renderList.length);
        setFilterType('HOLD');
        setColor(SystemOrange);
        // setHeight(100);
        setNameIcon('hourglass-start');
        setStatus('Chờ xác nhận');
        break;
      case 'DONE':
        renderList = orders.filter(e => e.status == 'DONE');
        console.log('holdList', renderList.length);
        setFilterType('DONE');
        setColor(SystemOrange);
        // setHeight(100);
        setNameIcon('hourglass-start');
        setStatus('Chờ nhận hàng');
        break;

      default:
        renderList = orders;
        console.log('total', renderList.length);
        break;
    }
  };
  const RenderOrder = ({ item }: any) => {
    const transactions = item?.transactions;
    // console.log(
    //   'Filename:HistoryScreen -> RenderOrder',
    //   `Order id: ${item.id} is_paid: ${item.is_paid} status:${item.status
    //   } transaction:${JSON.stringify(transactions)}`,
    // );

    const GoToDetail = () => {
      navigation.navigate('DetailOrder', {
        item,
        nameIcon,
        filterType,
        color,
        status,
      });
    };
    let nameItem;
    if (item?.items.length <= 2) {
      nameItem = item.items.map((e: any) => e.product.name).join(', ');
    } else {
      nameItem =
        `${item.items[0].product.name}, ${item.items[1].product.name}, ` +
        (item.items.length - 2) +
        ' món';
    }
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.orderContainer]}
        onPress={GoToDetail}>
        <View style={styles.infoOrder}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {'HOLD' == item.status ? (
              false == item.is_paid ? (
                <View style={styles.statusOrder}>
                  <Icon
                    name={nameIcon}
                    size={9}
                    style={{ marginRight: 5 }}
                    color={color}
                  />
                  <Text style={[styles.textStatusOrder, { color: color }]}>
                    Chưa thanh toán
                  </Text>
                </View>
              ) : (
                <View style={styles.statusOrder}>
                  <Icon
                    name={nameIcon}
                    size={9}
                    style={{ marginRight: 5 }}
                    color={SystemGreen}
                  />
                  <Text
                    style={[styles.textStatusOrder, { color: SystemGreen }]}>
                    {status}
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.statusOrder}>
                <Icon
                  name={nameIcon}
                  size={9}
                  style={{ marginRight: 5 }}
                  color={SystemGreen}
                />
                <Text style={[styles.textStatusOrder, { color: SystemGreen }]}>
                  {status}
                </Text>
              </View>
            )}

            <Text style={styles.timeOrder}>
              <Text>{formatTime(item.date_created)}</Text>•{' '}
              <Text>{formatDay(item.date_created)}</Text>
            </Text>
          </View>
          <Text style={styles.textNameItem}>{nameItem}</Text>
          <Text style={styles.textPriceAndQuantity}>
            {transactions.length > 0 ? (
              <Text>
                {numberWithSpaces(item.total) + ' đ'}
                {/* (-{}-) */}
                {transactions[0].status == 'COMPLETED'
                  ? ` (${getPaymentMethodName(
                      transactions[0].payment_method,
                    )} ) `
                  : ''}
              </Text>
            ) : (
              <Text>{numberWithSpaces(item.total) + ' đ'}</Text>
            )}
            • <Text>{item.items.length} món</Text>
          </Text>
          <View
            style={
              item.status === 'COMPLETED'
                ? styles.optionsOrder
                : { display: 'none' }
            }>
            <TouchableOpacity>
              <Text style={styles.textButtonOrder}>Đánh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.textButtonOrder}>Đặt lại</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Icon
          name="chevron-right"
          size={9}
          style={styles.icon}
          color={SystemGrey01}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <Text style={[styles.titleHeader]}>Lịch sử đơn hàng</Text>
      <Type data={listType} onClicked={getType} />
      {renderList.length > 0 ? (
        <FlatList
          data={renderList}
          renderItem={RenderOrder}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          onEndReached={onLoadMoreCall}
          style={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingOrder}
              onRefresh={() => {
                dispatch(orderActions.getOrderHistory());
              }}
            />
          }
        />
      ) : (
        <FlatList
          data={[1]}
          renderItem={() => (
            <View style={styles.emptyContainer}>
              <Icon name="glass" size={30} color={SystemBlack} />
              <Text style={styles.textEmpty}>
                Hiện tại chúng tôi chưa tìm thấy đơn hàng nào
              </Text>
            </View>
          )}
          style={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingOrder}
              onRefresh={() => {
                dispatch(orderActions.getOrderHistory());
              }}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 100,
  },
  emptyContainer: {
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    paddingTop: Dimensions.get('screen').height / 3,
  },
  textEmpty: {
    width: 200,
    textAlign: 'center',
    color: SystemGrey01,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.15,
  },
  orderContainer: {
    backgroundColor: '#FFF',
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoOrder: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  optionsOrder: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textButtonOrder: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: SystemSecondary,
    letterSpacing: 0.1,
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 20,
  },
  textPriceAndQuantity: {
    fontSize: 14,
    color: SystemBlack,
    letterSpacing: 0.25,
    fontFamily: 'Inter-Regular',
  },
  statusOrder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStatusOrder: {
    fontSize: 12,
    letterSpacing: 0.4,
    fontFamily: 'Inter-Regular',
  },
  textNameItem: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#000',
    letterSpacing: 0.1,
  },
  timeOrder: {
    fontSize: 12,
    color: SystemGrey00,
    letterSpacing: 0.4,
    fontFamily: 'Inter-Regular',
  },
  titleHeader: {
    fontFamily: 'Inter-Medium',
    fontSize: 19,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: '1%',
    color: SystemBlack,
  },
});

//make this component available to the app
export default HistoryScreen;

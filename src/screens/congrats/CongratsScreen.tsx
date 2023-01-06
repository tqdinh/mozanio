//import liraries
import {
  SystemBlack,
  SystemGrey01,
  SystemGrey05,
  SystemPrimary,
} from '@path/localization/colors/colors';
import { selectAllBasketItem } from '@path/redux/Slices/BasketSlice';
import {
  branchesActions,
  BranchModel,
  selectAllBranchs,
} from '@path/redux/Slices/BranchesSlice';
import { orderActions, selectAllOrders } from '@path/redux/Slices/OrderSlice';
import { formatLongText, numberWithSpaces } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
// create a component
if ('ios' == Platform.OS) Icon.loadFont();
const CongratsScreen = ({ route }: any) => {
  // const listItem = route?.params?.list;
  // const finalAmount = route?.params?.final;
  // const totalAmount = route?.params?.total;
  // const branchID = route?.params?.store;

  const { list, final, total, store } = route.params;

  //Get branch order
  const [branch, setBranch] = useState<BranchModel>();

  const listBranch = useSelector(selectAllBranchs);
  useEffect(() => {
    if (listBranch) {
      listBranch.filter(e => {
        if (e.id == store) {
          setBranch(e);
          // console.log(e.name);
        }
      });
    }
  }, []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getOrderHistory());
    dispatch(branchesActions.getListBranch());
  }, []);
  const renderItemOrder = list.map((item: any, index: any) => {
    const displayNameSize =
      item.extra.size_config.size.product_size.display_name;
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textQuantity}>{item.quantity}x</Text>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.textName}>
              {formatLongText(item.product.name, 20)}
            </Text>
            <Text style={styles.textSize}>{displayNameSize}</Text>
          </View>
        </View>
        <Text style={styles.textPrice}>
          {numberWithSpaces(Number(item.subtotal))} đ
        </Text>
      </View>
    );
  });
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.successBadge}>
            <Icon name="check" size={20} color={'#FFF'} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.textTitle}>Đặt hàng thành công</Text>
            <Text style={styles.textDes}>
              Đơn hàng của bạn đang được xử lý và giao trong thời gian sớm nhất
            </Text>
          </View>
        </View>
        <View style={styles.storeContainer}>
          <Image
            source={require('../../assets/images/imgStore.png')}
            style={styles.imageStore}
          />
          <View style={styles.infoStore}>
            <View>
              <Text style={styles.textNameStore}>{branch?.display_name}</Text>
              <Text style={styles.textAddressStore}>{branch?.address}</Text>
            </View>
            <Text style={styles.textDistance}>Cách đâu 1.0km</Text>
          </View>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.textTitle}>Thông tin đơn hàng</Text>
          <View>
            {renderItemOrder}
            <View style={styles.totalContainer}>
              <View style={styles.itemTotalContaienr}>
                <Text style={styles.textTotal}>Tạm tính</Text>
                <Text style={styles.textTotal}>
                  {numberWithSpaces(Number(total))} đ
                </Text>
              </View>
              <View style={styles.itemTotalContaienr}>
                <Text style={styles.textDiscount}>Giảm giá</Text>
                <Text style={styles.textDiscount}>0đ</Text>
              </View>
              <View style={styles.itemTotalContaienr}>
                <Text style={styles.textTotal}>Tổng cộng</Text>
                <Text style={styles.textTotal}>
                  {numberWithSpaces(Number(final))} đ
                </Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <View style={styles.itemTotalContaienr}>
                <Text style={styles.textTotal}>Thanh toán</Text>
                <Text style={styles.textTotal}>Tiền mặt</Text>
              </View>
            </View>
            <View style={styles.wavy}></View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.bottomCofirmContainer, styles.shadow]}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            dispatch(orderActions.clearCurrentOrder());
            navigation.navigate('MainScreen');
          }}>
          <Text style={styles.textButton}>Quay về trang chủ</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#FFF',
  },
  successBadge: {
    position: 'absolute',
    top: -20,
    width: 40,
    height: 40,
    backgroundColor: '#00AB56',
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    height: 142,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.15,
  },
  textDes: {
    width: 238,
    marginTop: 7,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    letterSpacing: 0.25,
    color: SystemGrey01,
  },
  storeContainer: {
    backgroundColor: '#FFF',
    height: 110,
    padding: 15,
    borderTopColor: SystemGrey05,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  imageStore: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoStore: {
    marginLeft: 12,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  textNameStore: {
    color: SystemPrimary,
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    alignSelf: 'stretch',
  },
  textAddressStore: {
    width: 250,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: SystemBlack,
  },
  textDistance: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: SystemGrey01,
    letterSpacing: 0.25,
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
  bottomCofirmContainer: {
    width: Dimensions.get('screen').width,
    height: 68,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  buttonContainer: {
    width: Dimensions.get('screen').width - 16,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SystemPrimary,
    borderRadius: 8,
  },
  textButton: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Inter-Bold',
    letterSpacing: 1.25,
  },
});

//make this component available to the app
export default CongratsScreen;

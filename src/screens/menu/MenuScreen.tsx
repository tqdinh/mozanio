//import liraries
import CustomBottomDetailStore from '@path/components/bottoms/bottomDetailStore';
import { ProgressiveImage } from '@path/components/lazyLoadImage/ProgressiveImage';
import {
  SystemBlack,
  SystemGreen,
  SystemGrey00,
  SystemGrey01,
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import { MenuCategoriesModal } from '@path/models/categories';
import {
  basketActions,
  selectAllBasketItem,
  selectLatestBasketBranchID,
  selectTotalAmountOnBasket,
  selectTotalItemCountOnBasket,
} from '@path/redux/Slices/BasketSlice';
import {
  menuCategoriesAction,
  selectMenuCategories,
} from '@path/redux/Slices/Categories/MenuCategoriesSlice';
import {
  selectServiceCategories,
  serviceCategoriesAction,
} from '@path/redux/Slices/Categories/ServiceCategoriesSlice';
import {
  menuActions,
  selectAllMenu,
  selectCurrentSelectedMenuItem,
} from '@path/redux/Slices/MenuSlice';
import { paymentActions } from '@path/redux/Slices/Pay/PaymentSlice';
import { supportedBankActions } from '@path/redux/Slices/Pay/SupportedBankSlice';
import { RootState } from '@path/redux/stores/store';
import { numberWithSpaces } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
if ('ios' == Platform.OS) IconFontAwesome.loadFont();
// create a component
const MenuScreen = ({ route }: any) => {
  //get params
  const detailBranch = route?.params;
  const branchId = detailBranch.id;
  //useDispatch
  const dispatch = useDispatch();
  //useNavigation
  const navigation = useNavigation();
  //useSelector
  const listMenuItem = useSelector(selectAllMenu);
  const listBasketItem = useSelector(selectAllBasketItem);
  const totalQuantities = useSelector(selectTotalItemCountOnBasket);
  const totalAmount = useSelector(selectTotalAmountOnBasket);
  const menuCategories = useSelector(selectMenuCategories);
  const serviceCategories = useSelector(selectServiceCategories);
  const latestBranchIdBasket = useSelector(selectLatestBasketBranchID);
  const latestSelectedMenuItem = useSelector(selectCurrentSelectedMenuItem);
  const isLoadingMenu = useSelector((state: RootState) => state.menu.isLoading);
  //useState
  const [idItemMenuCategoriesList, setIdItemMenuCategoriesList] = useState<
    any[]
  >([]);
  const [idItemServiceCategoriesList, setIdItemServiceCategoriesList] =
    useState<any[]>([]);
  //other
  //useEffect
  useEffect(() => {
    dispatch(menuActions.getListMenu(branchId));
    dispatch(supportedBankActions.getListSupportedBank('VSZ6FBY1'));
  }, []);
  useEffect(() => {
    dispatch(basketActions.getOrCreateBasket());
  }, []);
  useEffect(() => {
    if (detailBranch.vendor) {
      dispatch(
        menuCategoriesAction.getListMenuCategories({
          vendor_id: detailBranch.vendor,
        }),
      );
    }
    dispatch(serviceCategoriesAction.getListServiceCategories());
  }, []);

  //function
  const newFormatedMenuItem: any[] = [];
  listMenuItem.results?.forEach((menuItem: any) => {
    let itemCount: number = 0;
    let refMap = new Map([]);
    listBasketItem.forEach((basket: any) => {
      if (menuItem.id == basket.product_id) {
        itemCount = itemCount + basket.quantity;
        refMap.set(basket.ref, basket.quantity);
      }
    });
    newFormatedMenuItem.push({
      menuItem: menuItem,
      quantities: itemCount,
      ref: refMap,
    });
  });

  const onLoadMoreCall = () => {
    dispatch(menuActions.getMoreListMenu());
  };

  const clearBasket = () => {
    dispatch(basketActions.clearBasket());
  };

  const deleteBasket = () => {
    dispatch(basketActions.deleteBasket());
  };

  const onCheckoutClick = () => {
    dispatch(paymentActions.clearCurrentPayment());
    navigation.navigate('Checkout', detailBranch);
  };

  const onItemClick = ({ menuItem, ref, index }: any) => {
    dispatch(basketActions.clearBasketError());
    navigation.navigate('DetailMenu', { menuItem, ref, index, branchId });
  };

  const createOrPlus = (item: any) => {
    console.log('CREATE ONE ', JSON.stringify(item));
    if (0 == item.ref.size) {
      createOneBasketItem(
        item.menuItem.id,
        'app_vendor.BranchMenuItems',
        1,
        branchId,
      );
    } else {
      console.log('add one more ');
      const baseItemRef = `app_vendorbranchmenuitems-${item.menuItem.id}`;
      const baseItemCount = item.ref.has(baseItemRef)
        ? item.ref.get(baseItemRef)
        : 0;
      plusOneItem(baseItemCount, baseItemRef);
    }
  };
  const showWarningExistedBasket = (onOkPress: any) => {
    Alert.alert(
      'Thông báo.',
      `Bạn đang có ${totalQuantities} sản phẩm ở chi nhánh khác, bạn có muốn xóa khỏi giỏ hàng hiện tại.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            try {
              onOkPress();
            } catch (err) {
              console.log(err);
            }
          },
        },
      ],
    );
  };

  const addItemQuantity = ({ item }: any) => {
    if (undefined == latestBranchIdBasket || latestBranchIdBasket == branchId) {
      createOrPlus(item);
    } else {
      if (totalQuantities > 0) {
        showWarningExistedBasket(() => {
          clearBasket();
          createOrPlus(item);
        });
      } else {
        clearBasket();
        createOrPlus(item);
      }
    }
  };
  const removeItemQuantify = ({ item }: any) => {
    if (undefined == latestBranchIdBasket || latestBranchIdBasket == branchId) {
      if (totalQuantities > 0) {
        deleteOrMinus(item);
      } else {
        Alert.alert('Thông báo.', 'Giỏ hàng hiện tại đang trống.', [
          { text: 'OK', onPress: () => {} },
        ]);
      }
    } else {
      showWarningExistedBasket(() => {
        clearBasket();
      });
    }
  };
  const deleteOrMinus = (item: any) => {
    if (0 != item.ref.size) {
      const first = [...item.ref][0];
      const key = first[0];
      const value = first[1];
      if (1 == item.quantities) {
        deleteOneBasketItem(key);
      } else {
        if (item.quantities >= 2) {
          if (value >= 2) {
            minusOneItem(value, key);
          } else {
            deleteOneBasketItem(key);
          }
        }
      }
    }
  };

  const plusOneItem = (quantity: number, ref: any) => {
    const newQuantities = quantity + 1;
    updateOneBasketItem(ref, newQuantities);
  };

  const minusOneItem = (quantity: number, ref: any) => {
    const newQuantities = quantity - 1;
    const newRef = ref;
    if (newQuantities >= 0) {
      updateOneBasketItem(newRef, newQuantities);
    }
  };

  const updateOneBasketItem = (ref: string, quantity: number) => {
    dispatch(
      basketActions.updateUserBasketItem({
        ref: ref,
        quantity: quantity,
      }),
    );
  };

  const createOneBasketItem = (
    productId: number,
    productType: string,
    quantity: number,
    itemBranchId: string,
  ) => {
    dispatch(
      basketActions.addUserBasketItemWithDefaulConfig({
        product_id: productId,
        product_type: productType,
        quantity: quantity,
        branchId: itemBranchId,
      }),
    );
    // dispatch(
    //   basketActions.addUserBasketItemWithDefaulConfig({
    //     product_id: productId,
    //     product_type: productType,
    //     quantity: quantity,
    //   }),
    // );
  };

  const deleteOneBasketItem = (ref: string) => {
    dispatch(basketActions.removeUserBasketItem({ ref }));
  };
  //animation
  //customitem
  const itemViewRender = ({ item, index }: any) => {
    const menuItem = item.menuItem;
    const quantities = item.quantities;
    const ref = item.ref;
    const imageUrl =
      undefined != menuItem.item.thumbnail ? menuItem.item.thumbnail.url : '';
    return (
      <TouchableOpacity
        disabled={detailBranch.status === 'OPENING' ? false : true}
        style={[styles.itemContainer, styles.shadow]}
        onPress={() => onItemClick({ menuItem, ref, index, branchId })}
        key={menuItem.id}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ProgressiveImage
            thumbnailSource={
              imageUrl
                ? require('../../assets/images/imageVoucher.png')
                : require('../../assets/images/imageVoucher.png')
            }
            source={
              imageUrl
                ? { uri: imageUrl }
                : require('../../assets/images/imageVoucher.png')
            }
            style={styles.imageItem}
            resizeMode="cover"
          />
          <View
            style={
              detailBranch.status === 'OPENING'
                ? { display: 'none' }
                : styles.stopServingContainer
            }>
            <Text style={styles.textStopServing}>Hết món</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.infoItemContainer}>
            <Text style={styles.nameItem}>{menuItem.name}</Text>
            <Text style={styles.priceItem}>
              Giá: {numberWithSpaces(Number(menuItem.default_price))} đ
            </Text>
          </View>
          <View style={styles.editQuantityItem}>
            <TouchableOpacity
              disabled={detailBranch.status === 'OPENING' ? false : true}
              style={styles.buttonCircle}
              onPress={() => removeItemQuantify({ item, quantities, ref })}>
              <Text style={styles.textButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.textquantity}>{quantities}</Text>
            <TouchableOpacity
              disabled={detailBranch.status === 'OPENING' ? false : true}
              style={styles.buttonCircle}
              onPress={() => addItemQuantity({ item, quantities, ref })}>
              <Text style={styles.textButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const TabBranch = () => {
    return (
      <View style={styles.branchContainer}>
        <View>
          <Text style={styles.textNameBranch}>{detailBranch.display_name}</Text>
          <Text style={styles.textAddressBranch}>{detailBranch.address}</Text>
          {detailBranch.status === 'OPENING' ? (
            <Text style={[styles.textStatusBranch, { color: SystemGreen }]}>
              Mở cửa
            </Text>
          ) : (
            <Text style={[styles.textStatusBranch, { color: SystemSecondary }]}>
              Đóng cửa
            </Text>
          )}
        </View>
        {/* <TouchableOpacity style={[styles.mapContainer, styles.shadow]}>
          <IconFontAwesome name="map-o" size={12} color={SystemGrey00} />
        </TouchableOpacity> */}
      </View>
    );
  };

  const CustomMenuCategories = ({ data }: any) => {
    return (
      <View>
        <FlatList
          data={data}
          horizontal
          renderItem={CustomItemMenuCategories}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };
  const CustomItemMenuCategories = ({ item }: any) => {
    const onClickChooseItemMenuCategories = () => {
      if (!idItemMenuCategoriesList.find((e: any) => e === item.id)) {
        idItemMenuCategoriesList.push(item.id);
      } else {
        idItemMenuCategoriesList.splice(
          idItemMenuCategoriesList.indexOf(item.id),
          1,
        );
      }
      const list = [...idItemMenuCategoriesList];
      setIdItemMenuCategoriesList(list);
      try {
        dispatch(
          menuActions.getListItemMenuByCategories({
            branch_id: branchId,
            service_categories: idItemServiceCategoriesList.toLocaleString(),
            menu_categories: idItemMenuCategoriesList.toLocaleString(),
          }),
        );
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <TouchableOpacity
        style={
          idItemMenuCategoriesList.find((e: any) => e === item.id)
            ? [
                styles.itemMenuCategories,
                styles.shadow,
                { backgroundColor: '#FFF' },
              ]
            : [styles.itemMenuCategories, { backgroundColor: 'transparent' }]
        }
        onPress={onClickChooseItemMenuCategories}
        key={item.id}>
        <Text
          style={[
            styles.textnameItemCategories,
            {
              color: idItemMenuCategoriesList.find((e: any) => e === item.id)
                ? SystemGreen
                : SystemGrey00,
            },
          ]}>
          {item.display_name}
        </Text>
      </TouchableOpacity>
    );
  };
  const CustomServiceCategories = ({ data }: any) => {
    return (
      <View>
        <FlatList
          data={data}
          horizontal
          renderItem={CustomItemServiceCategories}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };
  const CustomItemServiceCategories = ({ item }: any) => {
    const onClickChooseItemServiceCategories = () => {
      if (!idItemServiceCategoriesList.find((e: any) => e === item.id)) {
        idItemServiceCategoriesList.push(item.id);
      } else {
        idItemServiceCategoriesList.splice(
          idItemServiceCategoriesList.indexOf(item.id),
          1,
        );
      }
      const list = [...idItemServiceCategoriesList];
      setIdItemServiceCategoriesList(list);
      try {
        dispatch(
          menuActions.getListItemMenuByCategories({
            branch_id: branchId,
            service_categories: idItemServiceCategoriesList.toLocaleString(),
            menu_categories: idItemMenuCategoriesList.toLocaleString(),
          }),
        );
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <TouchableOpacity
        style={
          idItemServiceCategoriesList.find((e: any) => e === item.id)
            ? [
                styles.itemMenuCategories,
                styles.shadow,
                { backgroundColor: '#FFF' },
              ]
            : [styles.itemMenuCategories, { backgroundColor: 'transparent' }]
        }
        onPress={onClickChooseItemServiceCategories}
        key={item.id}>
        <Text
          style={[
            styles.textnameItemCategories,
            {
              color: idItemServiceCategoriesList.find((e: any) => e === item.id)
                ? SystemGreen
                : SystemGrey00,
            },
          ]}>
          {item.display_name}
        </Text>
      </TouchableOpacity>
    );
  };
  // <ActivityIndicator size='small' color={SystemPrimary} style={{ marginVertical: 10 }} />
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabBranch />
      <CustomServiceCategories data={serviceCategories.results} />
      <CustomMenuCategories data={menuCategories.results} />
      {listMenuItem.results.fill.length > 0 ? (
        <FlatList
          data={newFormatedMenuItem}
          renderItem={itemViewRender}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingMenu}
              onRefresh={() => {
                dispatch(menuActions.getListMenu(branchId));
              }}
            />
          }
          onEndReached={onLoadMoreCall}
          style={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <IconFontAwesome name="glass" size={30} color={SystemBlack} />
          <Text style={styles.textEmpty}>
            Hiện tại Chưa tìm thấy sản phẩm của chi nhánh này
          </Text>
        </View>
      )}
      <CustomBottomDetailStore
        itemCount={totalQuantities}
        totalAmount={Number(totalAmount)}
        onPressCheckout={onCheckoutClick}
      />
    </SafeAreaView>
  );
};

// define your styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginBottom: 60,
  },
  backgroundContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  emptyContainer: {
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    paddingTop: Dimensions.get('screen').height / 3,
  },
  textEmpty: {
    width: 200,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.15,
    marginTop: 10,
  },
  textType: {
    color: SystemBlack,
    marginHorizontal: 16,
    marginTop: 16,
    fontFamily: 'Inter-Medium',
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
  imageItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#d7dbe7',
  },
  infoItemContainer: {
    marginLeft: 14,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  nameItem: {
    color: SystemBlack,
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  stopServingContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
    borderRadius: 10,
  },
  textStopServing: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  priceItem: {
    color: SystemGrey01,
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.25,
  },
  editQuantityItem: {
    width: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonCircle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7dbe7',
    borderRadius: 15,
  },
  textButton: {
    fontSize: 13,
    color: SystemPrimary,
  },
  textquantity: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: SystemBlack,
    letterSpacing: 0.25,
  },
  branchContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textNameBranch: {
    color: SystemPrimary,
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    alignSelf: 'stretch',
  },
  textAddressBranch: {
    color: SystemBlack,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    letterSpacing: 0.15,
    alignSelf: 'stretch',
    marginVertical: 5,
  },
  textStatusBranch: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: 'Inter-Medium',
  },
  itemMenuCategories: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textnameItemCategories: {
    fontSize: 13,
    alignSelf: 'center',
    fontFamily: 'Inter-Medium',
  },
});

//make this component available to the app
export default MenuScreen;

import BottomDetailStoreAddItem from '@path/components/bottoms/BottomDetailStoreAddItem';
import { ProgressiveImage } from '@path/components/lazyLoadImage/ProgressiveImage';
import CustomModalLoading from '@path/components/modals/loading';
import CustomSlider from '@path/components/slider/CustomSlider';
import CustomStepSlider from '@path/components/slider/CustomStepSlider';
import {
  SystemBlack,
  SystemGrey03,
  SystemGrey05,
  SystemPrimary,
} from '@path/localization/colors/colors';
import { SupportedItems } from '@path/models/SubMenuItem';
import {
  basketActions,
  ExtraConfig,
  selectLatestBasketBranchID,
  selectTotalItemCountOnBasket,
} from '@path/redux/Slices/BasketSlice';
import {
  menuActions,
  selectCurrentSelectedMenuItem,
} from '@path/redux/Slices/MenuSlice';
import { RootState } from '@path/redux/stores/store';
import { UNPAID_ORDER_EXISTS } from '@path/utils/error';
import { formatLongText, numberWithSpaces } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

if ('ios' == Platform.OS) IconFontisto.loadFont();

const DetailMenuScreen = ({ route }: any) => {
  const configPrefix = 'app_vendorbranchmenuitems-';
  //useDispatch
  const dispatch = useDispatch();
  //useNavigation
  const navigation = useNavigation();
  //useSelector
  const currentSelectedDetail = useSelector(selectCurrentSelectedMenuItem);
  const totalQuantities = useSelector(selectTotalItemCountOnBasket);
  const latestBranchIdBasket = useSelector(selectLatestBasketBranchID);
  const unpaidCheck = useSelector((state: RootState) => state.basket.error);
  const loading = useSelector((state: RootState) => state.menu.isLoading);

  //useState
  const [newItemCount, setnewItemCount] = useState<number>(1);
  const [optionSize, setOptionSize] = useState<any>();
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [additional, setAdditional] = useState<any>();
  const [note, setNote] = useState('');
  const [shown, setShown] = useState<boolean>(false);
  //other
  const { menuItem, ref, renderIndex, branchId } = route.params;
  const imageUrl =
    undefined != menuItem.item.thumbnail ? menuItem.item.thumbnail.url : '';
  const menuItemId = menuItem.id;

  const baseItemRef = `app_vendorbranchmenuitems-${menuItemId}`;

  useEffect(() => {
    dispatch(
      menuActions.getMemuItemDetail({ branchId: branchId, itemId: menuItemId }),
    );
  }, []);

  useEffect(() => {
    if (loading) setShown(true);
    else setShown(false);
  }, [loading]);

  // useEffect(() => {
  //   if (unpaidCheck === UNPAID_ORDER_EXISTS) {
  //     showWarningUnpaidOrder();
  //   }
  // }, [unpaidCheck]);

  useEffect(() => {
    if (currentSelectedDetail) {
      const sizeId = currentSelectedDetail.default_size;
      const defaultSize = currentSelectedDetail.size_config.find(
        (e: any) => e.id === sizeId,
      );
      setOptionSize(defaultSize);
      setAdditional(
        currentSelectedDetail.additional_items.map((e: any) => ({
          ...e,
          amount: e.min_value,
        })),
      );
    }
  }, [currentSelectedDetail]);

  useEffect(() => {
    if (optionSize && additional) {
      let price: number = 0;
      additional.map((e: any) => {
        price += e.amount * e.additional_item.default_price;
      });
      setFinalPrice(
        Number(newItemCount) * Number(optionSize.branch_price) + price,
      );
    }
    // setFinalPrice(
    //   Number(newItemCount) * Number(optionSize.size.size_price),
    // );
  }, [newItemCount, additional, optionSize]);

  //update total when change amount additional items

  const plusOneItem = () => {
    if (undefined == latestBranchIdBasket || latestBranchIdBasket == branchId) {
      setnewItemCount(newItemCount + 1);
    } else {
      if (totalQuantities > 0) {
        showWarningExistedBasket(() => {
          clearBasket();
          setnewItemCount(newItemCount + 1);
        });
      } else {
        clearBasket();
        setnewItemCount(newItemCount + 1);
      }
    }
  };
  const minusOneItem = () => {
    if (undefined == latestBranchIdBasket || latestBranchIdBasket == branchId) {
      if (totalQuantities > 0) {
        if (newItemCount >= 1) setnewItemCount(newItemCount - 1);
      } else {
        Alert.alert('Thông báo.', 'Số lượng sản phẩm tối thiểu là 1 sản phẩm', [
          { text: 'OK', onPress: () => {} },
        ]);
      }
    } else {
      showWarningExistedBasket(() => {
        clearBasket();
      });
    }
  };
  const clearBasket = () => {
    dispatch(basketActions.clearBasket());
  };

  const doSelectItemBasket = () => {
    let baseItemCount = ref.has(baseItemRef) ? ref.get(baseItemRef) : 0;

    if (0 != baseItemCount) {
      // console.log('Create custom item');
      let myUIID = uuid.v4();
      const newConfig = `${configPrefix}${myUIID}`;
      const extraInfo = {
        size_config: {
          id: optionSize.id,
          size: optionSize.size,
          branch_price: optionSize.branch_price,
        },
        additional_items: additional,
      };

      addOneBasketItemWithDifferentConfig(
        menuItemId,
        'app_vendor.BranchMenuItems',
        newItemCount,
        newConfig,
        menuItem.item.thumbnail && menuItem.item.thumbnail.id,
        extraInfo,
      );
      navigation.goBack();
    } else {
      if (0 == baseItemCount) {
        optionSize &&
          optionSize.size.size_recipe.map((e: any) => {
            if (e.selectedValue) {
              e.amount = e.selectedValue;
              delete e.selectedValue;
            }
          });
        createOneBasketItem(
          menuItemId,
          'app_vendor.BranchMenuItems',
          newItemCount,
          menuItem.item.thumbnail && menuItem.item.thumbnail.id,
          optionSize && {
            size_config: {
              id: optionSize.id,
              size: optionSize.size,
              branch_price: optionSize.branch_price,
            },
            additional_items: additional,
          },
        );
        navigation.goBack();
      } else {
        updateOneBasketItem(baseItemRef, baseItemCount + newItemCount);
        navigation.goBack();
      }
    }
  };
  const selectItems = () => {
    if (
      undefined === latestBranchIdBasket ||
      latestBranchIdBasket === branchId
    ) {
      doSelectItemBasket();
    } else {
      showWarningExistedBasket(() => {
        clearBasket();
        doSelectItemBasket();
      });
    }
  };
  const createOneBasketItem = (
    productId: number,
    productType: string,
    quantity: number,
    thumbnail: number | null,
    extra: ExtraConfig,
  ) => {
    dispatch(
      basketActions.addUserBasketItem({
        product_id: productId,
        product_type: productType,
        quantity: quantity,
        thumbnail: thumbnail,
        extra: extra,
      }),
    );
  };

  const updateOneBasketItem = (itemRefId: string, quantity: number) => {
    dispatch(
      basketActions.updateUserBasketItem({
        ref: itemRefId,
        quantity: quantity,
      }),
    );
  };

  const addOneBasketItemWithDifferentConfig = (
    productId: number,
    productType: string,
    quantity: number,
    reference: string,
    thumbnail: number | null,
    extra: ExtraConfig,
  ) => {
    dispatch(
      basketActions.addSameUserBasketItemWithDifferentConfig({
        product_id: productId,
        product_type: productType,
        quantity: quantity,
        ref: reference,
        thumbnail: thumbnail,
        extra: extra,
      }),
    );
  };

  // const showWarningUnpaidOrder = () => {
  //   Alert.alert(UNPAID_ORDER_EXISTS, 'Bạn có muốn thanh toán đơn hàng?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => {
  //         dispatch(basketActions.clearBasketError());
  //       },
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'Ok',
  //       onPress: () => {
  //         try {
  //           dispatch(basketActions.clearBasketError());
  //           navigation.goBack();
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       },
  //     },
  //   ]);
  // };

  const showWarningExistedBasket = (onOkPress: any) => {
    Alert.alert(
      `Bạn có ${totalQuantities} món trong giỏ hàng`,
      'Bạn có đồng ý xoá chúng khỏi giỏ hàng hiện tại?',
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

  const CustomSliderIngredients = ({ data, item, setItem }: any) => {
    return (
      data &&
      data.size.size_recipe.map((element: any) => (
        <View key={element.id} style={{ marginBottom: '5%' }}>
          <Text style={styles.textNameIngredients}>
            {element.material.display_name}
          </Text>
          <CustomSlider
            data={element}
            item={item.filter((e: any) => e.id === element.material.id)}
            option={optionSize}
            setOption={setItem}
          />
        </View>
      ))
    );
  };
  const CustomSliderMoreOptions = ({ data, item, setItem }: any) => {
    // console.log(data)
    // console.log(item)
    return (
      data &&
      item &&
      data.map((e: any) => {
        const itemChange = item.find((aItem: any) => aItem.id == e.id);
        //        console.log(itemChange)

        return (
          <View style={{ marginVertical: 10, marginBottom: '5%' }} key={e.id}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'stretch',
              }}>
              <Text style={styles.textNameMoreOptions}>
                {e.additional_item.name} ({' '}
                {numberWithSpaces(e.additional_item.default_price)} đ /{' '}
                {e.measurement_unit == 'unit' ? 'Phần' : e.measurement_unit} )
              </Text>
              <Text style={styles.textPriceMoreOptions}>
                (+{' '}
                {numberWithSpaces(
                  e.additional_item.default_price * itemChange?.amount,
                )}{' '}
                đ)
              </Text>
            </View>
            <CustomStepSlider
              data={item.find(
                (ele: any) => ele.additional_item.id == e.additional_item.id,
              )}
              add={item}
              setAdd={setItem}
            />
          </View>
        );
      })
    );
  };

  const CustomItemSize = ({ data, option, setOption }: any) => {
    return (
      <View style={styles.optionSizeContainer}>
        {data.map((e: any) => (
          <TouchableOpacity
            style={styles.optionIteSizem}
            key={e.id}
            onPress={() => {
              setOption(e);
            }}>
            <View style={{ flexDirection: 'row' }}>
              {option && option.id !== e.id ? (
                <IconMaterialCommunityIcons name={'circle-outline'} size={20} />
              ) : (
                <IconMaterialCommunityIcons
                  name={'circle-slice-8'}
                  size={20}
                  color={SystemPrimary}
                />
              )}
              <Text style={styles.textNameOptionSize}>
                {e.size.product_size.display_name}
              </Text>
            </View>
            <Text style={styles.textPriceOptionSize}>
              + {numberWithSpaces(e.branch_price)} đ
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const RenderEmptyItem = () => {
    return (
      <View
        style={{
          marginTop: 10,
        }}>
        <Text
          style={{
            color: SystemBlack,
            fontFamily: 'Inter-Medium',
            letterSpacing: 0.2,
          }}>
          Sản phẩm này hiện tại chưa có món thêm
        </Text>
      </View>
    );
  };
  //function
  const onBasketClick = () => {
    navigation.navigate('Basket');
  };
  const onCheckoutClick = () => {
    navigation.navigate('Checkout');
  };
  //animation
  const scrollY = useRef(new Animated.Value(0)).current;
  // change header title size from 1 to 0.9
  const titleScale = scrollY.interpolate({
    inputRange: [1, HEADER_SCROLL_DISTANCE / 4, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 1],
    extrapolate: 'clamp',
  });
  // change header title y-axis
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 8, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -10],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {currentSelectedDetail && (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}>
          {imageUrl ? (
            <ProgressiveImage
              thumbnailSource={require('../../assets/images/logos/logo.png')}
              source={{ uri: imageUrl }}
              style={styles.imageItem}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.imageItem}
              source={require('../../assets/images/logos/logo.png')}
              resizeMode="center"
            />
          )}
          <View style={styles.informationContaienr}>
            <Text style={styles.textNameItem}>
              {currentSelectedDetail?.item.display_name}
            </Text>
            <Text style={styles.textPriceItem}>
              {numberWithSpaces(currentSelectedDetail?.item.base_price)} đ
            </Text>
            <Text style={styles.textDesItem}>
              {currentSelectedDetail?.item.description
                ? currentSelectedDetail?.item.description
                : 'Chưa có mô tả cho sản phẩm này'}
            </Text>
          </View>
          <View style={styles.sizeContaienr}>
            <Text style={styles.title}>Size</Text>
            <CustomItemSize
              data={currentSelectedDetail?.size_config}
              option={optionSize}
              setOption={setOptionSize}
            />
          </View>
          <View style={styles.ingredientsContaienr}>
            <Text style={styles.title}>Yêu cầu</Text>
            <CustomSliderIngredients
              item={currentSelectedDetail?.item?.ingredients.map(e => ({
                id: e.material.id,
                min: e.min_value,
                max: e.max_value,
              }))}
              setItem={setOptionSize}
              data={optionSize}
            />
          </View>
          <View style={styles.moreOptionContaienr}>
            <Text style={styles.title}>Món thêm</Text>
            {currentSelectedDetail.additional_items.length != 0 ? (
              <CustomSliderMoreOptions
                data={currentSelectedDetail.additional_items}
                item={additional}
                setItem={setAdditional}
              />
            ) : (
              <RenderEmptyItem />
            )}
          </View>
        </Animated.ScrollView>
      )}
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
          },
          styles.shadowHeader,
        ]}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            // navigation.goBack();
            console.log(JSON.stringify(SupportedItems.ingredients));
          }}>
          <IconFontAwesome name="angle-left" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.textLabel}>
          {formatLongText(menuItem.item.display_name, 25)}
        </Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <IconFontAwesome name="ellipsis-v" size={16} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
      <BottomDetailStoreAddItem
        itemCount={newItemCount}
        onPressMinus={minusOneItem}
        onPressPlus={plusOneItem}
        onPressSelect={selectItems}
        totalAmount={finalPrice}
      />
      <CustomModalLoading showModal={shown} />
    </SafeAreaView>
  );
};
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    width: SCREEN_WIDTH,
    height: HEADER_MAX_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: SystemPrimary,
  },
  shadowHeader: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  buttonContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
    color: '#FFF',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: SystemPrimary,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  imageItem: {
    width: SCREEN_WIDTH,
    height: 300,
    marginTop: HEADER_MIN_HEIGHT,
  },
  informationContaienr: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  textNameItem: {
    fontSize: 20,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
    color: '#000',
    marginBottom: 5,
  },
  textPriceItem: {
    fontSize: 15,
    color: SystemPrimary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  textDesItem: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  sizeContaienr: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    letterSpacing: 0.15,
    color: SystemBlack,
    fontFamily: 'Inter-Bold',
  },
  optionSizeContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  optionIteSizem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: SystemGrey05,
    borderBottomWidth: 1,
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 5,
  },
  textNameOptionSize: {
    color: SystemBlack,
    fontSize: 15,
    letterSpacing: 0.15,
    marginLeft: 10,
  },
  textPriceOptionSize: {
    color: SystemBlack,
    fontSize: 15,
    letterSpacing: 0.15,
  },
  moreOptionContaienr: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  ingredientsContaienr: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  textNameIngredients: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#000',
    letterSpacing: 0.2,
  },
  textPriceMoreOptions: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    color: SystemPrimary,
    flex: 0.55,
    textAlign: 'right',
  },
  textNameMoreOptions: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#000',
    letterSpacing: 0.2,
  },
  noteContaienr: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  textInputNoteContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: SystemGrey03,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
export default DetailMenuScreen;

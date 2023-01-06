//import liraries
import {
  SystemBlack,
  SystemGrey06,
  SystemOrange,
  SystemSecondary,
} from '@path/localization/colors/colors';
import { selectTotalItemCountOnBasket } from '@path/redux/Slices/BasketSlice';
import { formatLongText } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Location } from '@path/constants/types';
import { paymentActions } from '@path/redux/Slices/Pay/PaymentSlice';
// create a component
const Des = '42/1 Ung Văn Khiêm, Phường 14, Bình Thạnh, Thành Phố';
const test = new Array(0).fill(0);

type HeaderState = {
  map: boolean;
  setMap: any;
  location?: Location;
  setLocation: any;
  onSearchTextChange: any;
};

const CustomHeaderStoreScreen = (state: HeaderState) => {
  const navigation = useNavigation();
  const [textSearch, setTextSearch] = useState('');
  const totalQuantities = useSelector(selectTotalItemCountOnBasket);
  const onChangeTextSearch = (text: string) => {
    state.onSearchTextChange(text);
    setTextSearch(text);
  };
  const onClickGoToCart = () => {
    navigation.navigate('Checkout');
  };

  const onPressMap = () => {
    Geolocation.getCurrentPosition(info => state.setLocation(info));
    state.setMap(!state.map);
  };

  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.topContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.textTitle}>Vị trí của bạn</Text>
          <Text style={styles.textAddress}>{formatLongText(Des, 25)}</Text>
        </View>
        <TouchableOpacity style={[styles.ticketContainer, styles.shadow]}>
          <Icon name="ticket-outline" size={17} color={SystemOrange} />
          <Text style={styles.textTicket}>
            {test.length > 99 ? '99+' : test.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cartContainer, styles.shadow]}
          onPress={onClickGoToCart}>
          <View
            style={totalQuantities > 0 ? styles.badgeContainer : styles.hide}>
            <Text style={styles.textCart}>
              {totalQuantities > 99 ? '99+' : totalQuantities}
            </Text>
          </View>
          <Icon name="cart-outline" size={17} color={SystemBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.leftContainer}>
          <Icon2 name="search" size={15} color="#000" />
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={textSearch}
              placeholder="Tìm kiêm"
              onChangeText={onChangeTextSearch}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.mapContainer} onPress={onPressMap}>
          <Icon name="map-outline" size={15} color={SystemSecondary} />
          <Text style={styles.textMap}>
            {state.map ? 'Danh sách' : 'Bản đồ'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 15,
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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressContainer: {
    height: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textTitle: {
    color: '#000',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  textAddress: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.25,
  },
  ticketContainer: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
  },
  textTicket: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Inter-Medium',
    marginLeft: 2,
  },
  cartContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#FFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  leftContainer: {
    flex: 1,
    backgroundColor: SystemGrey06,
    height: 40,
    marginRight: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
    marginLeft: 12,
  },
  textInput: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.15,
  },
  mapContainer: {
    height: 40,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMap: {
    color: SystemSecondary,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.15,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: SystemSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCart: {
    color: '#FFF',
    fontSize: 8,
    fontFamily: 'Inter-Regular',
  },
  hide: {
    display: 'none',
  },
});

//make this component available to the app
export default CustomHeaderStoreScreen;

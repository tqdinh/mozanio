//import liraries
import LoginScreen from '@path/screens/auth/LoginScreen';
import BasketScreen from '@path/screens/basket/BasketScreen';

import { getDataUser } from '@path/mmkv/mmkvStorage';
import {
  authAction,
  selectIsLoggedIn,
  selectLatestLoginStatus,
} from '@path/redux/Slices/AuthSlice';
import LoginOTPScreen from '@path/screens/auth/OTP/LoginOTPScreen';
import OTPScreen from '@path/screens/auth/OTP/OTPScreen';
import ProfileScreen from '@path/screens/auth/profileScreen';
import CheckoutScreen from '@path/screens/checkout/CheckoutScreen';
import CongratsScreen from '@path/screens/congrats/CongratsScreen';
import MainScreen from '@path/screens/mainScreen';
import DetailMenuScreen from '@path/screens/menu/DetailMenuScreen';
import MenuScreen from '@path/screens/menu/MenuScreen';
import DetailOrderScreen from '@path/screens/order/detailOrder';
import { PaymentConfirmScreen } from '@path/screens/payment/PaymentConfirmScreen';
import SelectPaymentScreen from '@path/screens/payment/SelectPaymentScreen';
import TopUpScreen from '@path/screens/payment/TopUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import HistoriesPaymentScreen from '@path/screens/payment/HistoriesPaymentScreen';
import CreatePasscodeScreen from '@path/screens/payment/CreatePasscodeScreen';
import PayAgainScreen from '@path/screens/order/PayAgainScreen';
import DetailHistoryPaymentScreen from '@path/screens/payment/DetailHistoryPaymentScreen';
import EditPasscodeScreen from '@path/screens/Passcode/EditPasscodeScreen';
import PasscodeManagerScreen from '@path/screens/Passcode/PasscodeManager';
import AccountScreen from '@path/screens/appScreen/accountScreen';
import TopupResultScreen from '@path/screens/payment/TopupResultScreen';

// create a component

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const user = getDataUser();
  const isTokenRefreshed = useSelector(selectLatestLoginStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAction.refreshToken());
    if (null != user && undefined != user) {
      dispatch(authAction.setLoggedInStateSucces());
    }
  }, []);
  console.log(isTokenRefreshed);
  if (isTokenRefreshed || null == user) SplashScreen.hide();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const stillAuthenticated = (null != user && undefined != user) || isLoggedIn;
  console.log(isLoggedIn, stillAuthenticated);

  return (
    <NavigationContainer>
      {!stillAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerShown: false,
          }}>
          <Stack.Screen component={LoginScreen} name="LoginScreen" />
          <Stack.Screen component={LoginOTPScreen} name="LoginOTP" />
          <Stack.Screen component={OTPScreen} name="OTP" />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerShown: false,
          }}>
          <Stack.Screen component={MainScreen} name="MainScreen" />
          <Stack.Screen component={MenuScreen} name="DetailStore" />
          <Stack.Screen component={BasketScreen} name="Basket" />
          <Stack.Screen component={DetailMenuScreen} name="DetailMenu" />
          <Stack.Screen
            component={CheckoutScreen}
            name="Checkout"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Giỏ hàng',
              headerBackVisible: true,
            }}
          />

          <Stack.Screen
            component={SelectPaymentScreen}
            name="SelectPaymentScreen"
            options={{
              headerShown: false,
              headerTitleStyle: styles.titleHeader,
              headerTitle: '',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            component={PaymentConfirmScreen}
            name="PaymentConfirmScreen"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Xác nhận thanh toán',
              headerBackVisible: true,
            }}
          />

          <Stack.Screen
            component={PayAgainScreen}
            name="PayAgainScreen"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Thanh toán lại',
              headerBackVisible: true,
            }}
          />

          <Stack.Screen
            component={CongratsScreen}
            name="CongratsScreen"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Đặt hàng thành công',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            component={DetailOrderScreen}
            name="DetailOrder"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Chi tiết đơn hàng',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            component={ProfileScreen}
            name="ProfileScreen"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Thay đổi thông tin tài khoản',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            component={TopUpScreen}
            name="TopUpScreen"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Nạp tiền vào tài khoản',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            component={HistoriesPaymentScreen}
            name="HistoriesPaymentScreen"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Lịch sử giao dịch',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            component={CreatePasscodeScreen}
            name="Passcode"
            options={{
              headerShown: false,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Passcode',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen component={AccountScreen} name="AccountScreen" />
          <Stack.Screen
            component={EditPasscodeScreen}
            name="EditPasscodeScreen"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Thay đổi Passcode',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            component={DetailHistoryPaymentScreen}
            name="DetailHistoryPaymentScreen"
            options={{
              headerShown: false,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Chi tiết giao dịch',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            component={PasscodeManagerScreen}
            name="PasscodeManagerScreen"
            options={{
              headerShown: true,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Quản lí Passcode',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            component={TopupResultScreen}
            name="TopupResultScreen"
            options={{
              headerShown: false,
              headerTitleStyle: styles.titleHeader,
              headerTitle: 'Kết quả nạp tiền',
              headerBackVisible: true,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  titleHeader: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
  },
});
export default Navigation;

import CustomAlert from '@path/components/modals/alert';
import { accountActions } from '@path/redux/Slices/AccountSlice';
import { orderActions } from '@path/redux/Slices/OrderSlice';
import { paymentActions } from '@path/redux/Slices/Pay/PaymentSlice';
import { RootState } from '@path/redux/stores/store';
import { PAYMENT_STATUS } from '@path/utils/PaymentStatus';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { useDispatch, useSelector } from 'react-redux';

const SelectPaymentScreen = ({ route }: any) => {
  const { url, id, ref } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);

  const paymentStatus = useSelector(
    (root: RootState) => root.payment.payment_status,
  );

  console.log('Payment status:', paymentStatus);

  useEffect(() => {
    const backAction = () => {
      setShowAlert(!showAlert);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <CustomAlert
        type="notification"
        onPressAccept={() => {
          if (
            PAYMENT_STATUS.FAILED == paymentStatus ||
            PAYMENT_STATUS.COMPLETED == paymentStatus
          ) {
            dispatch(accountActions.getAccountDetail());
            navigation.navigate('MainScreen');
          }
          if (PAYMENT_STATUS.CREATED == paymentStatus) navigation.goBack();
        }}
        onPressCancel={() => {
          setShowAlert(!showAlert);
        }}
        showAlert={showAlert}
        title="Thông báo"
        description={
          PAYMENT_STATUS.CREATED == paymentStatus
            ? 'Bạn có muốn quay lại trang trước'
            : 'Quay lại trang tài khoản'
        }
      />
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={() => {
          dispatch(
            paymentActions.getPaymentStatus({
              id: id,
            }),
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexGrow: 1,
    borderWidth: 1,
    alignItems: 'center',
    margin: 5,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    zIndex: 10,
  },
});
export default SelectPaymentScreen;

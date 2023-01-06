import CustomButton from '@path/components/customButtons/customButton';
import { height, width } from '@path/constants/screen';
import {
  SystemBlue,
  SystemGrey00,
  SystemGrey01,
  SystemPrimary,
} from '@path/localization/colors/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { PinKeyboard } from 'react-native-awesome-pin';
import { PinInput } from 'react-native-awesome-pin';

import { PASSCODE_LENGTH } from '@path/constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStatusState,
  verifyPasscodeActions,
} from '@path/redux/Slices/Pay/VerifyPasscodeSlice';
import {
  accountActions,
  selectAccountInfo,
} from '@path/redux/Slices/AccountSlice';
import { numberWithSpaces } from '@path/utils/utilities';
import { paymentActions } from '@path/redux/Slices/Pay/PaymentSlice';
import { or } from 'react-native-reanimated';
export const PaymentConfirmScreen = ({ route }: any) => {
  useEffect(() => {
    dispatch(accountActions.getAccountDetail());
  }, []);
  const accountInfo = useSelector(selectAccountInfo);
  const walletBalance = accountInfo?.wallet?.balance;
  const order = route?.params?.order;
  const final = route?.params?.final;
  const total = route?.params?.total;
  const orderId = order.id;

  const [pin, setPin] = useState<Array<number>>([]);
  const [pinCode, setPinCode] = useState<string>('');

  const [modalVisible, setModalVisible] = useState(false);

  const backSpaceId = require('../../assets/images/icons/backspace.png');
  const dispatch = useDispatch();
  useEffect(() => {
    if (pinCode.length == PASSCODE_LENGTH) {
      dispachVerifyPassCode(pinCode);
    }
  }, [pinCode]);

  const verifyPasscodeStatus = useSelector(selectStatusState);
  useEffect(() => {
    if ('error' == verifyPasscodeStatus) {
      Alert.alert('Sai passcode ', 'Vui lòng kiểm tra lại', [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Đồng ý ',
          onPress: () => {},
        },
      ]);
    }
    if ('success' == verifyPasscodeStatus) {
      console.log(
        `Filename:PaymentConfirmScreen verifyPasscodeStatus ${verifyPasscodeStatus}`,
      );
      dispatch(verifyPasscodeActions.refreshVerifyPassCodeStatus());
      payWithMozanioWallet();
      // Alert.alert('Passcode chính xác', 'Tiến hành thanh toán', [
      //   {
      //     text: 'Hủy',
      //     onPress: () => console.log('Cancel Pressed'),
      //     style: 'cancel',
      //   },
      //   {
      //     text: 'Đồng ý ',
      //     onPress: () => {

      //     },
      //   },
      // ]);
    }
  }, [verifyPasscodeStatus]);
  verifyPasscodeStatus;

  const onModalClose = () => {
    setModalVisible(false);
    setPinCode('');
    setPin([]);
  };

  const dispachVerifyPassCode = (passCode: any) => {
    setModalVisible(false);
    dispatch(verifyPasscodeActions.verifyPassCode(passCode));
  };

  const payWithMozanioWallet = () => {
    dispatch(
      paymentActions.requestPayment({
        locale: 'vn',
        target_id: orderId,
        target_type: 'ORDER',
        payment_method: 'WALLET_IN_APP',
        amount: Number(total),
        currency: 1,
      }),
    );
  };

  const convertListNumber = (listNumber: Array<number>) => {
    let ret = 0;
    listNumber.forEach((n: number) => {
      ret = ret * 10 + n;
    });
    return ret;
  };
  const onKeyPress = (key: any) => {
    if (typeof key == 'number' && pinCode.length < PASSCODE_LENGTH) {
      const previousPin = pin;
      previousPin.push(key);
      setPin(previousPin);
      const codeNumber = convertListNumber(pin);

      setPinCode(`${codeNumber}`);
    } else {
      if ('back' == key) {
        const currentPin = pin;
        currentPin.pop();
        setPin(currentPin);
        if (0 != pin.length) {
          const codeNumber = convertListNumber(pin);
          setPinCode(`${codeNumber}`);
        } else {
          setPinCode('');
        }

        console.log('currentPin', currentPin);
        console.log('currentPin', currentPin);
      }
      if ('C' == key) {
        setPin([]);
        setPinCode('');
      }
    }
  };
  const getModal = () => {
    return (
      <Modal
        entry="bottom"
        backdropPressToClose={true}
        isOpen={modalVisible}
        style={styles.modalBox}
        onClosed={onModalClose}>
        <View style={styles.content}>
          <Text style={{ color: SystemBlue }}>Enter passcode</Text>
          <PinInput
            pinActiveStyle={{ backgroundColor: SystemPrimary }}
            pinStyle={{ backgroundColor: SystemGrey01 }}
            onRef={(ref: any) => {}}
            numberOfPins={PASSCODE_LENGTH}
            numberOfPinsActive={pinCode.length}
          />
          <PinKeyboard
            onRef={(ref: any) => {
              ref = pinCode;
            }}
            keyDown={onKeyPress}
            keyboard={[
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              ['C', 0, backSpaceId],
            ]}
          />
        </View>
      </Modal>
    );
  };

  const onConfirmPress = () => {
    setModalVisible(true);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View>
        <Text>Thanh toán:</Text>
        <Text style={{ fontSize: 35, color: SystemBlue }}>
          {numberWithSpaces(Number(final))} đ
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Tiền giao hàng:</Text>
          <Text>0 đ</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Số dư trong ví:</Text>
          <Text>{numberWithSpaces(Number(walletBalance))} đ</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Tiền hàng:</Text>
          <Text
            style={{ fontWeight: 'bold', fontSize: 19, color: SystemPrimary }}>
            {numberWithSpaces(Number(final))}
          </Text>
        </View>
        <CustomButton
          text={'Xác nhận'}
          onPress={onConfirmPress}
          disabled={false}
          color={SystemPrimary}
        />
      </View>
      {getModal()}
    </View>
  );
};
const styles = StyleSheet.create({
  modalBox: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height,
    width,
    backgroundColor: 'transparent',
  },

  content: {
    width,
    // height: '45%',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    marginBottom: '-60%',
    alignItems: 'center',
  },
});

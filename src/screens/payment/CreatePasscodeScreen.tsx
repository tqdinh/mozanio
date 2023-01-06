import CustomAlert from '@path/components/modals/alert';
import CustomModalLoading from '@path/components/modals/loading';
import {
  CREATE_PASSCODE_TRY_COUNT,
  PASSCODE_LENGTH,
} from '@path/constants/constant';
import {
  SystemBlack,
  SystemBlue,
  SystemGrey01,
  SystemGrey02,
  SystemGrey03,
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import {
  createPasscodeActions,
  selectCreatePasscodeStatus,
} from '@path/redux/Slices/Pay/CreatePasscodeSlice';
import { RootState } from '@path/redux/stores/store';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PinInput, PinKeyboard } from 'react-native-awesome-pin';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
const CreatePasscodeScreen = () => {
  const [numOfTry, setNumOfTry] = useState<number>(0);
  const dispatch = useDispatch();
  const [pin, setPin] = useState<Array<number>>([]);
  const [pinCode, setPinCode] = useState<string>('');

  const [pinConfirmed, setPinConfirmed] = useState<Array<number>>([]);
  const [pinCodeConfirmed, setPinCodeConfirmed] = useState<string>('');
  const [showAlertWarning, setShowAlertWarning] = useState(false);
  const [showAlerNotification, setShowAlerNotification] = useState(false);

  const [visiblePinConfirmed, setVisiblePinConfirmed] =
    useState<boolean>(false);
  const navigation = useNavigation();
  const backSpaceId = require('../../assets/images/icons/backspace.png');

  const dispachCreatePassCode = (passCode: any) => {
    dispatch(createPasscodeActions.createPassCode(passCode));
  };

  const createPasscodeStatus = useSelector(selectCreatePasscodeStatus);
  useEffect(() => {
    if ('success' == createPasscodeStatus) {
      setShowAlerNotification(!showAlerNotification);
      // dispatch(createPasscodeActions.cleanState())
      dispatch(createPasscodeActions.refreshPassCodeStatus());
    }
    if ('error' == createPasscodeStatus) {
      setShowAlertWarning(!showAlertWarning);
      dispatch(createPasscodeActions.refreshPassCodeStatus());
    }
  }, [createPasscodeStatus]);

  const convertListNumber = (list: Array<number>) => {
    let ret = 0;
    list.forEach((n: number) => {
      ret = ret * 10 + n;
    });
    return ret;
  };
  const onKeyPress = (key: any) => {
    if (typeof key == 'number' && pinCode.length <= PASSCODE_LENGTH) {
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
      }
      if ('C' == key) {
        setPin([]);
        setPinCode('');
      }
    }
  };
  const onConfirmKeyPress = (key: any) => {
    console.log(
      'onConfirmKeyPress',
      key,
      '  pinCodeConfirmed  ',
      pinCodeConfirmed.length,
    );
    if (typeof key == 'number' && pinCodeConfirmed.length <= PASSCODE_LENGTH) {
      const previousPin = pinConfirmed;
      previousPin.push(key);
      setPinConfirmed(previousPin);
      const codeNumber = convertListNumber(pinConfirmed);
      setPinCodeConfirmed(`${codeNumber}`);
      console.log('Confirmed', codeNumber);
    } else {
      if ('back' == key) {
        const currentPin = pinConfirmed;
        currentPin.pop();
        setPinConfirmed(currentPin);
        if (0 != pinConfirmed.length) {
          const codeNumber = convertListNumber(pinConfirmed);
          setPinCodeConfirmed(`${codeNumber}`);
        } else {
          setPinCodeConfirmed('');
        }
      }
      if ('C' == key) {
        setPinConfirmed([]);
        setPinCodeConfirmed('');
      }
    }
  };
  useEffect(() => {
    if (numOfTry > CREATE_PASSCODE_TRY_COUNT) {
      setShowAlertWarning(!showAlertWarning);
    }
  }, [numOfTry]);
  useEffect(() => {
    if (pinCode.length == PASSCODE_LENGTH) {
      setVisiblePinConfirmed(true);
    }
    if (pinCodeConfirmed.length == PASSCODE_LENGTH) {
      if (pinCode == pinCodeConfirmed) {
        dispachCreatePassCode(pinCode);
      } else {
        setPin([]);
        setPinCode('');
        setPinConfirmed([]);
        setPinCodeConfirmed('');
        setVisiblePinConfirmed(false);
        setNumOfTry(numOfTry + 1);
      }
    }
  }, [pinCode, pinCodeConfirmed]);
  const loading = useSelector(
    (state: RootState) => state.createPasscode.isLoading,
  );
  return (
    <SafeAreaView style={styles.container}>
      <CustomAlert
        showAlert={showAlertWarning}
        title={'Thông báo'}
        description={
          'Quá trình tạo passcode không thành công, xin vui lòng thực hiện lại từ đầu'
        }
        onPressAccept={undefined}
        onPressCancel={() => {
          navigation.goBack();
        }}
        type={'warning'}
      />
      <CustomAlert
        showAlert={showAlerNotification}
        title={'Tạo thành công.'}
        description={`Passcode hiện tại của bạn là: ${pinCode}`}
        onPressAccept={() => {
          navigation.goBack();
        }}
        onPressCancel={undefined}
        type={'notification'}
      />
      <CustomModalLoading showModal={loading} />
      <View style={styles.headerContainer}>
        <IconMaterialCommunityIcons
          name="lock-check"
          size={24}
          color={SystemBlack}
          style={{ marginBottom: 20 }}
        />
        <Text style={styles.textTitleHeader}>Tạo passcode</Text>
        <Text style={styles.textDescriptionheader}>
          Xin vui lòng nhập passcode của bạn
        </Text>
        <Text style={styles.textDescriptionheader}>
          Passcode sẽ bảo vệ tài khoản của bạn khi thực hiện các thanh toán của
          ứng dụng.
        </Text>
      </View>
      {!visiblePinConfirmed ? (
        <View style={styles.pinInputContainer}>
          <PinInput
            pinActiveStyle={{ backgroundColor: SystemPrimary }}
            pinStyle={{ backgroundColor: SystemGrey01 }}
            onRef={(ref: any) => {}}
            numberOfPins={PASSCODE_LENGTH}
            numberOfPinsActive={pinCode.length}
          />
          <Text
            style={[numOfTry > 0 ? styles.textWarning : { display: 'none' }]}>
            Số lần nhập sai: {numOfTry}
          </Text>
        </View>
      ) : (
        <View style={styles.pinInputContainer}>
          <Text style={{ color: SystemBlue }}>Xác nhận passcode</Text>
          <PinInput
            pinActiveStyle={styles.pinActive}
            pinStyle={styles.pin}
            onRef={(ref: any) => {}}
            numberOfPins={PASSCODE_LENGTH}
            numberOfPinsActive={pinCodeConfirmed.length}
          />
          <Text
            style={[numOfTry > 0 ? styles.textWarning : { display: 'none' }]}>
            Số lần nhập sai: {numOfTry}
          </Text>
        </View>
      )}

      <PinKeyboard
        onRef={(ref: any) => {
          ref = pinCode;
        }}
        keyboardDisabledStyle={true}
        disableRippleEffect={true}
        keyTextStyle={styles.keyText}
        keyboardStyle={styles.keyBoardContainer}
        keyStyle={[styles.key, styles.shadow]}
        keyDown={!visiblePinConfirmed ? onKeyPress : onConfirmKeyPress}
        keyboard={[
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          ['C', 0, backSpaceId],
        ]}
      />
    </SafeAreaView>
  );
};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textTitleHeader: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
    color: SystemBlack,
    marginBottom: 10,
  },
  textDescriptionheader: {
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 5,
    fontSize: 13,
    color: SystemGrey02,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
  keyBoardContainer: {
    backgroundColor: 'transparent',
    height: HEIGHT / 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  key: {
    maxWidth: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinActive: {
    backgroundColor: SystemPrimary,
  },
  pin: {
    backgroundColor: SystemGrey03,
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
  keyText: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: SystemBlack,
  },
  pinInputContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  textWarning: {
    fontSize: 12,
    color: SystemSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
});
export default CreatePasscodeScreen;

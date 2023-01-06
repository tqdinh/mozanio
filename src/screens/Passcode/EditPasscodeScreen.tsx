import CustomAlert from '@path/components/modals/alert';
import CustomModalLoading from '@path/components/modals/loading';
import { PASSCODE_LENGTH } from '@path/constants/constant';
import {
  SystemBlack,
  SystemGrey01,
  SystemGrey02,
  SystemGrey03,
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import { accountActions } from '@path/redux/Slices/AccountSlice';
import {
  createPasscodeActions,
  selectCreatePasscodeStatus,
} from '@path/redux/Slices/Pay/CreatePasscodeSlice';
import {
  selectStatusState,
  verifyPasscodeActions,
} from '@path/redux/Slices/Pay/VerifyPasscodeSlice';
import { RootState } from '@path/redux/stores/store';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PinInput, PinKeyboard } from 'react-native-awesome-pin';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
const EditPasscodeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const statusVerifyPasscode = useSelector(selectStatusState);
  const [showAlertWarning, setShowAlertWarning] = useState(false);
  const [showAlerNotification, setShowAlerNotification] = useState(false);
  const isLoadingCheckVerifyPasscode = useSelector(
    (state: RootState) => state.verifyPasscode.isLoading,
  );
  const [showAlertWarningVerify, setShowAlertWarningVerify] = useState(false);
  const [verifyIsSuccess, setVerifyIsSuccess] = useState<boolean>(false);
  const [createNewPasscodeIsSuccess, setCreateNewPasscodeIsSuccess] =
    useState<boolean>(false);
  const [showAlertWarningNewPasscode, setShowAlertWarningNewPasscode] =
    useState(false);
  const [showAlertWarningNumberOfTry, setShowAlertWarningNumberOfTry] =
    useState(false);
  const [showAlertWarningConfirm, setShowAlertWarningConfirm] = useState(false);
  const [numberTryConfirm, setNumberTryConfirm] = useState<number>(0);
  const [pinVerify, setPinVerify] = useState<Array<number>>([]);
  const [pinCodeVerify, setPinCodeVerify] = useState<string>('');
  const [pin, setPin] = useState<Array<number>>([]);
  const [pinCode, setPinCode] = useState<string>('');
  const [pinConfirmed, setPinConfirmed] = useState<Array<number>>([]);
  const [pinCodeConfirmed, setPinCodeConfirmed] = useState<string>('');
  useEffect(() => {
    if (statusVerifyPasscode === 'success') {
      setShowAlertWarningVerify(false);
      setVerifyIsSuccess(true);
    } else if (statusVerifyPasscode === 'error') {
      setShowAlertWarningVerify(true);
      setVerifyIsSuccess(false);
    }
  }, [statusVerifyPasscode]);
  const backSpaceId = require('../../assets/images/icons/backspace.png');
  const convertListNumber = (list: Array<number>) => {
    let ret = 0;
    list.forEach((n: number) => {
      ret = ret * 10 + n;
    });
    return ret;
  };
  //verify

  const onKeyVerifyPress = (key: any) => {
    if (typeof key == 'number' && pinCodeVerify.length <= PASSCODE_LENGTH) {
      const previousPin = pinVerify;
      previousPin.push(key);
      setPinVerify(previousPin);
      const codeNumber = convertListNumber(pinVerify);
      setPinCodeVerify(`${codeNumber}`);
    } else {
      if ('back' == key) {
        const currentPin = pinVerify;
        currentPin.pop();
        setPinVerify(currentPin);
        if (0 != pinVerify.length) {
          const codeNumber = convertListNumber(pinVerify);
          setPinCodeVerify(`${codeNumber}`);
        } else {
          setPinCodeVerify('');
        }
      }
      if ('C' == key) {
        setPinVerify([]);
        setPinCodeVerify('');
      }
    }
  };
  const dispachVerifyPassCode = (passCode: any) => {
    dispatch(verifyPasscodeActions.verifyPassCode(passCode));
  };
  useEffect(() => {
    if (pinCodeVerify.length == PASSCODE_LENGTH) {
      dispachVerifyPassCode(pinCodeVerify);
    }
  }, [pinCodeVerify]);
  const VerifyPasscode = () => {
    return (
      <SafeAreaView style={styles.ViewPasscodeContainer}>
        <View style={styles.headerContainer}>
          <IconMaterialCommunityIcons
            name="lock-check"
            size={24}
            color={SystemBlack}
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.textTitleHeader}>Xác thực lại passcode</Text>
          <Text style={styles.textDescriptionheader}>
            Xin vui lòng nhập passcode cũ để xác thực.
          </Text>
          <Text style={styles.textDescriptionheader}>
            Passcode sẽ bảo vệ tài khoản của bạn khi thực hiện các thanh toán
            của ứng dụng.
          </Text>
        </View>
        <View style={styles.pinInputContainer}>
          <PinInput
            pinActiveStyle={{ backgroundColor: SystemPrimary }}
            pinStyle={{ backgroundColor: SystemGrey01 }}
            onRef={(ref: any) => {}}
            numberOfPins={PASSCODE_LENGTH}
            numberOfPinsActive={pinCodeVerify.length}
          />
        </View>
        <PinKeyboard
          onRef={(ref: any) => {
            ref = pinCodeVerify;
          }}
          keyboardDisabledStyle={true}
          disableRippleEffect={true}
          keyTextStyle={styles.keyText}
          keyboardStyle={styles.keyBoardContainer}
          keyStyle={[styles.key, styles.shadow]}
          keyDown={onKeyVerifyPress}
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
  //new passcode

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
  const NewPasscode = () => {
    return (
      <SafeAreaView style={styles.ViewPasscodeContainer}>
        <View style={styles.headerContainer}>
          <IconMaterialCommunityIcons
            name="lock-check"
            size={24}
            color={SystemBlack}
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.textTitleHeader}>Tạo passcode mới</Text>
          <Text style={styles.textDescriptionheader}>
            Xin vui lòng nhập passcode mới.
          </Text>
          <Text style={styles.textDescriptionheader}>
            Passcode sẽ bảo vệ tài khoản của bạn khi thực hiện các thanh toán
            của ứng dụng.
          </Text>
        </View>
        <View style={styles.pinInputContainer}>
          <PinInput
            pinActiveStyle={{ backgroundColor: SystemPrimary }}
            pinStyle={{ backgroundColor: SystemGrey01 }}
            onRef={(ref: any) => {}}
            numberOfPins={PASSCODE_LENGTH}
            numberOfPinsActive={pinCode.length}
          />
        </View>
        <PinKeyboard
          onRef={(ref: any) => {
            ref = pinCode;
          }}
          keyboardDisabledStyle={true}
          disableRippleEffect={true}
          keyTextStyle={styles.keyText}
          keyboardStyle={styles.keyBoardContainer}
          keyStyle={[styles.key, styles.shadow]}
          keyDown={onKeyPress}
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
  //confirm new passcode

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
  const ConfirmNewPasscode = () => {
    return (
      <SafeAreaView style={styles.ViewPasscodeContainer}>
        <View style={styles.headerContainer}>
          <IconMaterialCommunityIcons
            name="lock-check"
            size={24}
            color={SystemBlack}
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.textTitleHeader}>Xác nhận lại passcode mới</Text>
          <Text style={styles.textDescriptionheader}>
            Xin vui lòng nhập lại passcode mới để xác nhận.
          </Text>
          <Text style={styles.textDescriptionheader}>
            Passcode sẽ bảo vệ tài khoản của bạn khi thực hiện các thanh toán
            của ứng dụng.
          </Text>
          <Text
            style={
              numberTryConfirm > 0 ? styles.textWarning : { display: 'none' }
            }>
            Số lần thử: {numberTryConfirm}
          </Text>
        </View>
        <View style={styles.pinInputContainer}>
          <PinInput
            pinActiveStyle={{ backgroundColor: SystemPrimary }}
            pinStyle={{ backgroundColor: SystemGrey01 }}
            onRef={(ref: any) => {}}
            numberOfPins={PASSCODE_LENGTH}
            numberOfPinsActive={pinCodeConfirmed.length}
          />
        </View>
        <PinKeyboard
          onRef={(ref: any) => {
            ref = pinCodeConfirmed;
          }}
          keyboardDisabledStyle={true}
          disableRippleEffect={true}
          keyTextStyle={styles.keyText}
          keyboardStyle={styles.keyBoardContainer}
          keyStyle={[styles.key, styles.shadow]}
          keyDown={onConfirmKeyPress}
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
  const dispachCreatePassCode = (passCode: any) => {
    dispatch(createPasscodeActions.createPassCode(passCode));
  };
  useEffect(() => {
    if (pinCode.length == PASSCODE_LENGTH) {
      if (pinCode === pinCodeVerify) {
        setCreateNewPasscodeIsSuccess(false);
        setShowAlertWarningNewPasscode(true);
      } else {
        setCreateNewPasscodeIsSuccess(true);
      }
    }
  }, [pinCode, pinCodeVerify]);
  useEffect(() => {
    if (pinCodeConfirmed.length == PASSCODE_LENGTH) {
      if (pinCode === pinCodeConfirmed) {
        setShowAlertWarningConfirm(false);
        dispachCreatePassCode(pinCode);
      } else {
        if (numberTryConfirm <= 3) {
          setShowAlertWarningConfirm(true);
        } else {
          setShowAlertWarningNumberOfTry(true);
        }
      }
    }
  }, [pinCodeConfirmed, pinCode, numberTryConfirm]);
  const createPasscodeStatus = useSelector(selectCreatePasscodeStatus);
  useEffect(() => {
    if ('success' == createPasscodeStatus) {
      setShowAlerNotification(!showAlerNotification);
    }
    if ('error' == createPasscodeStatus) {
      setShowAlertWarning(!showAlertWarning);
    }
  }, [createPasscodeStatus]);
  // console.log('verify: ', pinVerify);
  // console.log('new passcode: ', pin);
  // console.log('confirm new passcode: ', pinConfirmed);
  return (
    <SafeAreaView style={styles.container}>
      <CustomModalLoading showModal={isLoadingCheckVerifyPasscode} />
      <CustomAlert
        showAlert={showAlertWarning}
        title={'Thông báo'}
        description={
          'Quá trình tạo passcode không thành công, xin vui lòng thực hiện lại từ đầu'
        }
        onPressAccept={undefined}
        onPressCancel={() => {
          setShowAlertWarning(false);
          setPinCodeConfirmed('');
          setPinConfirmed([]);
          setPinCode('');
          setPin([]);
          setPinVerify([]);
          setPinCodeVerify('');
          dispatch(accountActions.getAccountDetail());
          navigation.navigate('MainScreen');
        }}
        type={'warning'}
      />
      <CustomAlert
        showAlert={showAlerNotification}
        title={'Tạo thành công.'}
        description={`Passcode hiện tại của bạn là: ${pinCode}`}
        onPressAccept={() => {
          setShowAlerNotification(false);
          setPinCodeConfirmed('');
          setPinConfirmed([]);
          setPinCode('');
          setPin([]);
          setPinVerify([]);
          setPinCodeVerify('');
          navigation.navigate('MainScreen');
        }}
        onPressCancel={undefined}
        type={'notification'}
      />
      <CustomAlert
        showAlert={showAlertWarningNewPasscode}
        title={'Thông báo'}
        description={'Passcode mới phải khác với passcode cũ.'}
        onPressAccept={undefined}
        onPressCancel={() => {
          setShowAlertWarningNewPasscode(false);
          setPin([]);
          setPinCode('');
        }}
        type={'warning'}
      />
      <CustomAlert
        showAlert={showAlertWarningVerify}
        title={'Thông báo'}
        description={
          'Xác thực passcode thất bại, xin vui lòng kiểm tra lại passcode cũ.'
        }
        onPressAccept={undefined}
        onPressCancel={() => {
          setShowAlertWarningVerify(false);
          setPinVerify([]);
          setPinCodeVerify('');
        }}
        type={'warning'}
      />
      <CustomAlert
        showAlert={showAlertWarningConfirm}
        title={'Thông báo'}
        description={'Xác nhận không trùng khớp.'}
        onPressAccept={undefined}
        onPressCancel={() => {
          setShowAlertWarningConfirm(false);
          setNumberTryConfirm(numberTryConfirm + 1);
          setPinCodeConfirmed('');
          setPinConfirmed([]);
        }}
        type={'warning'}
      />
      <CustomAlert
        showAlert={showAlertWarningNumberOfTry}
        title={'Thông báo'}
        description={
          'Quá số lần thử lại, xin vui lòng thực hiện việc thay đổi passcode lại từ đầu.'
        }
        onPressAccept={undefined}
        onPressCancel={() => {
          setShowAlertWarningNumberOfTry(false);
          setPinCodeConfirmed('');
          setPinConfirmed([]);
          setPinCode('');
          setPin([]);
          setPinVerify([]);
          setPinCodeVerify('');
          navigation.navigate('MainScreen');
        }}
        type={'warning'}
      />
      {verifyIsSuccess === false ? (
        <VerifyPasscode />
      ) : (
        <>
          {createNewPasscodeIsSuccess === true ? (
            <ConfirmNewPasscode />
          ) : (
            <NewPasscode />
          )}
        </>
      )}
    </SafeAreaView>
  );
};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewPasscodeContainer: {
    width: WIDTH,
    alignSelf: 'center',
  },
  headerContainer: {
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

export default EditPasscodeScreen;

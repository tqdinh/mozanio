//import liraries
import CustomModalNationalCode from '@path/components/modals/modalNationalCode';
import {
  SystemBlack,
  SystemBlue,
  SystemGrey03,
  SystemGrey05,
  SystemPrimary,
} from '@path/localization/colors/colors';
import { CountryCode } from '@path/utils/json/countryCode';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import Logo from '../../../assets/images/logos/logoApp.svg';
import Facebook from '../../../assets/svgs/facebook.svg';
import Google from '../../../assets/svgs/google.svg';
// create a component
const LoginOTPScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [nationalCode, setNationalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const onChangeNumberPhone = (phone: string) => {
    setPhoneNumber(phone);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/images/backgrounds/background.png')}
        resizeMode="cover"
        style={styles.background}>
        <Logo height={100} width={200} style={styles.logo} />
        <CustomModalNationalCode
          ShowModal={showModal}
          onPressCancel={() => {
            setShowModal(!showModal);
          }}
          data={CountryCode}
          setNationalCode={setNationalCode}
        />
        <View style={styles.container}>
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity
              style={styles.naCodeContainer}
              onPress={() => {
                setShowModal(!showModal);
              }}>
              <Text style={styles.textNationalCode}>
                {nationalCode === '' ? '+84' : nationalCode}
              </Text>
              <IconFeather
                name="chevron-down"
                color={SystemBlack}
                size={14}
                style={{ marginLeft: 3 }}
              />
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TextInput
              placeholder="Xin hãy nhập số điện thoại"
              value={phoneNumber}
              onChangeText={onChangeNumberPhone}
              maxLength={11}
              style={styles.phoneInput}
              keyboardType="number-pad"
            />
          </View>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.shadowButton]}
            onPress={() => {
              console.log('national code: ', nationalCode);
              console.log('phone number: ', phoneNumber);
              navigation.navigate('OTP');
            }}>
            <Text style={[styles.textButton, { color: '#FFF' }]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <View style={styles.lineOptionsContainer}>
            <View style={styles.horizontalLine} />
            <Text style={styles.textLineOptions}>Or</Text>
            <View style={styles.horizontalLine} />
          </View>
          <TouchableOpacity
            style={[styles.buttonGoogleContainer, styles.shadowButton]}
            onPress={() => {
              console.log('national code: ', nationalCode);
              console.log('phone number: ', phoneNumber);
            }}>
            <Google height={20} width={20} style={styles.logoGoogle} />
            <Text style={[styles.textButton, { color: SystemBlack }]}>
              Đăng nhập với Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonFacebookContainer, styles.shadowButton]}
            onPress={() => {
              console.log('national code: ', nationalCode);
              console.log('phone number: ', phoneNumber);
            }}>
            <Facebook height={20} width={20} style={styles.logoFacebook} />
            <Text style={[styles.textButton, { color: '#FFF' }]}>
              Đăng nhập với Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

// define your styles
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: HEIGHT / 3,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 16,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInputContainer: {
    height: 50,
    marginTop: 20,
    borderRadius: 5,
    borderColor: SystemGrey03,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  naCodeContainer: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textNationalCode: {
    color: SystemBlack,
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
  verticalLine: {
    width: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: SystemGrey05,
  },
  phoneInput: {
    flex: 1,
    paddingLeft: 10,
  },
  lineOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  horizontalLine: {
    height: 1,
    flex: 1,
    backgroundColor: SystemGrey05,
  },
  textLineOptions: {
    fontSize: 14,
    marginHorizontal: 10,
    color: SystemGrey03,
  },
  buttonContainer: {
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SystemPrimary,
    marginTop: 20,
  },
  shadowButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonGoogleContainer: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoGoogle: {
    position: 'absolute',
    left: 16,
  },
  buttonFacebookContainer: {
    backgroundColor: SystemBlue,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoFacebook: {
    position: 'absolute',
    left: 16,
  },
  textButton: {
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
    fontSize: 13,
  },
});

//make this component available to the app
export default LoginOTPScreen;

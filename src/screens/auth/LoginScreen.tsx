//import liraries
import CustomButton from '@path/components/customButtons/customButton';
import CustomAlert from '@path/components/modals/alert';
import CustomModalLoading from '@path/components/modals/loading';
import CustomTextInput from '@path/components/textInputs/customTextInput';
import { SystemGrey00, SystemPrimary } from '@path/localization/colors/colors';
import { authAction } from '@path/redux/Slices/AuthSlice';
import { RootState } from '@path/redux/stores/store';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
// create a component
const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const HTTPStatusCode = useSelector(
    (state: RootState) => state.auth.statusCode,
  );

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const logging = useSelector((state: RootState) => state.auth.logging);
  useEffect(() => {
    setShowModal(isLoading);
    if (!isLoading && !logging) {
      if (HTTPStatusCode && HTTPStatusCode != 200) {
        setShowAlert(true);
      }
    }
  }, [isLoading]);

  const onChangeUsername = (myUsername: string) => {
    setUsername(myUsername);
  };
  const onChangePassword = (myPassword: string) => {
    setpassword(myPassword);
  };
  const handleLogin = () => {
    if (username == '' || password == '') {
      Alert.alert('Thông báo', 'Bạn cần nhập đầy đủ thông tin đăng nhập', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      setShowAlert(false);
      try {
        dispatch(
          authAction.login({
            username: username,
            password: password,
          }),
        );
      } catch (error) {
        console.log('Login Error: ', error);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomAlert
        type="warning"
        onPressAccept={() => {}}
        onPressCancel={() => {
          setShowAlert(!showAlert);
        }}
        showAlert={showAlert}
        title="Thông báo"
        description="Hiện tại hệ thống đang gặp sự cố, xin vui lòng đăng nhập lại."
      />
      <ImageBackground
        source={require('../../assets/images/backgrounds/background.png')}
        resizeMode="cover"
        style={styles.background}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logos/logo.png')}
        />
        <Text
          style={{
            fontSize: 15,
            color: '#FFF',
            position: 'absolute',
            fontFamily: 'Inter-Bold',
            top: 10,
            right: 10,
          }}
          onPress={() => {
            navigation.navigate('LoginOTP');
          }}>
          OTP
        </Text>
        <CustomModalLoading showModal={showModal} />
        <View style={styles.container}>
          <CustomTextInput
            title="Tài khoản"
            placeholder="Tài khoản"
            value={username}
            setValue={onChangeUsername}
            secureTextEntry={false}
            keyboardType="default"
            type=""
            editable={true}
            onPressHidingPassword={() => {}}
            numberOfLines={1}
            multiLines={false}
            textAlignVertical="center"
          />
          <CustomTextInput
            title="Mật khẩu"
            placeholder="*********"
            value={password}
            setValue={onChangePassword}
            secureTextEntry={hidePassword}
            keyboardType="default"
            editable={true}
            numberOfLines={1}
            multiLines={false}
            textAlignVertical="center"
            type="password"
            onPressHidingPassword={() => setHidePassword(!hidePassword)}
          />
          <CustomButton
            onPress={handleLogin}
            color={
              username == '' || password == '' ? SystemGrey00 : SystemPrimary
            }
            text="Đăng nhập"
            disabled={username == '' || password == '' ? true : false}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
// define your styles
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
    position: 'absolute',
    alignSelf: 'center',
    top: HEIGHT * 0.1,
  },
  indicator: {
    position: 'absolute',
    top: 100,
    left: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});

//make this component available to the app
export default LoginScreen;

//import liraries
import CustomAlert from '@path/components/modals/alert';
import CustomModalLoading from '@path/components/modals/loading';
import {
  SystemBlack,
  SystemBlue,
  SystemGrey01,
  SystemGrey05,
  SystemPrimary,
} from '@path/localization/colors/colors';
import {
  accountActions,
  selectAccountInfo,
} from '@path/redux/Slices/AccountSlice';
import { authAction } from '@path/redux/Slices/AuthSlice';
import { selectCreatePasscodeStatus } from '@path/redux/Slices/Pay/CreatePasscodeSlice';
import { RootState } from '@path/redux/stores/store';
import { paymentActions } from '@path/redux/Slices/Pay/PaymentSlice';
import { numberWithSpaces } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import IconFeather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { historyPaymentActions } from '@path/redux/Slices/Pay/HistoryPaymentSlice';
// create a component

if ('ios' === Platform.OS) {
  IconSimpleLineIcons.loadFont();
  IonIcons.loadFont();
  IconFeather.loadFont();
  IconMaterialCommunityIcons.loadFont();
}
const AccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const accountInformation = useSelector(selectAccountInfo);
  const [showAlert, setShowAlert] = useState(false);

  const navigateToTopupScreen = () => {
    dispatch(paymentActions.clearCurrentPayment());
    navigation.navigate('TopUpScreen');
  };
  const accountInfo = useSelector(selectAccountInfo);
  const walletBalance = accountInfo?.wallet?.balance;
  const hadPassCode = accountInfo?.had_pass_code;

  useEffect(() => {
    dispatch(accountActions.getAccountDetail());
  }, [walletBalance]);
  const onPressLogout = () => {
    setShowAlert(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              dispatch(accountActions.getAccountDetail());
            }}
          />
        }
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <CustomAlert
          type="notification"
          onPressAccept={() => {
            dispatch(authAction.logout());
          }}
          onPressCancel={() => {
            setShowAlert(!showAlert);
          }}
          showAlert={showAlert}
          title="Thông báo"
          description="Bạn chắc chắn muốn đăng xuất khỏi tài khoản hiện tại."
        />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.cardUserContainer}
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              resizeMode="cover"
              source={
                accountInformation.avatar
                  ? { uri: accountInformation.avatar.url }
                  : require('../../assets/images/imageVoucher.png')
              }
              style={styles.imgUser}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.textNameUser}>
                {accountInformation.last_name} {accountInformation.first_name}
              </Text>
              <Text style={styles.textPhoneUser}>
                {accountInformation.phone_number
                  ? accountInformation.phone_number
                  : 'Hiện tại người dùng chưa có số điện thoại'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.cardUserContainerWallet}>
          <View style={styles.walletUserContainer}>
            <LinearGradient
              colors={[SystemPrimary, '#FFF']}
              start={{ x: 0.08, y: 1 }}
              end={{ x: 2, y: 0 }}
              style={[styles.userWallet, styles.shadow]}>
              <TouchableOpacity>
                <Text style={styles.textTitleUserWallet}>Ví chính</Text>
                <Text style={styles.textMoneyuserWallet}>
                  {numberWithSpaces(Number(walletBalance))} đ
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            {/* <View style={[styles.userRewards, styles.shadow]}>
              <TouchableOpacity>
                <Text style={styles.textTitleUserRewards}>Điểm thưởng</Text>
                <Text style={styles.textPointRewards}>100.000 điểm</Text>
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={styles.groupButtonCardUserContainer}>
            <TouchableOpacity
              style={styles.buttonCardContainer}
              onPress={navigateToTopupScreen}>
              <IconFeather name="download" size={20} color={SystemPrimary} />
              <Text style={styles.textButtonCard}>Nạp tiền</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={true}
              style={styles.buttonCardContainer}>
              <IonIcons name="wallet-outline" size={20} color={SystemGrey01} />
              <Text style={[styles.textButtonCard, { color: SystemGrey01 }]}>
                Thanh toán
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={true}
              style={styles.buttonCardContainer}>
              <IonIcons
                name="ios-gift-outline"
                size={20}
                color={SystemGrey01}
              />
              <Text style={[styles.textButtonCard, { color: SystemGrey01 }]}>
                Quà tặng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCardContainer}
              onPress={() => {
                dispatch(
                  historyPaymentActions.getListHistoryPayment({
                    limit: 10,
                  }),
                );
                navigation.navigate('HistoriesPaymentScreen');
              }}>
              <IconMaterialCommunityIcons
                name="history"
                size={20}
                color={SystemPrimary}
              />
              <Text style={[styles.textButtonCard, { color: SystemPrimary }]}>
                Lịch sử
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                hadPassCode === false
                  ? styles.buttonCardContainer
                  : { display: 'none' },
              ]}
              onPress={() => {
                navigation.navigate('Passcode');
              }}>
              <IconMaterialCommunityIcons
                name="account-lock-open"
                size={20}
                color={SystemPrimary}
              />
              <Text style={styles.textButtonCard}>Passcode</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.cardContainer}> */}
        {/* <Text style={styles.title}>Thông tin</Text> */}
        {/* <View style={styles.cardInfoContainer}> */}
        {/* <TouchableOpacity style={styles.buttonContainer}>
              <View style={{ flexDirection: 'row' }}>
                <IconSimpleLineIcons
                  name="diamond"
                  color={SystemGrey01}
                  size={18}
                />
                <Text style={styles.textButton}>Rewards</Text>
              </View>
              <IconSimpleLineIcons
                name="arrow-right"
                style={styles.iconRight}
                color={SystemBlack}
                size={12}
              />
            </TouchableOpacity>
            <View style={styles.horizontalLine} /> */}
        {/* <TouchableOpacity
            style={[
              hadPassCode !== false
                ? styles.buttonContainer
                : { display: 'none' },
            ]}
            onPress={() => {
              navigation.navigate('PasscodeManagerScreen');
            }}>
            <View style={{ flexDirection: 'row' }}>
              <IconMaterialCommunityIcons
                name="account-lock-open"
                size={18}
                color={SystemGrey01}
              />
              <Text style={styles.textButton}>Passcode</Text>
            </View>
            <IconSimpleLineIcons
              name="arrow-right"
              style={styles.iconRight}
              color={SystemBlack}
              size={12}
            />
          </TouchableOpacity> */}
        {/* <View style={styles.horizontalLine} /> */}
        {/* <TouchableOpacity style={styles.buttonContainer}>
              <View style={{ flexDirection: 'row' }}>
                <IconSimpleLineIcons
                  name="wallet"
                  color={SystemGrey01}
                  size={18}
                />
                <Text style={styles.textButton}>Số dư</Text>
              </View>
              <IconSimpleLineIcons
                name="arrow-right"
                style={styles.iconRight}
                color={SystemBlack}
                size={12}
              />
            </TouchableOpacity> */}
        {/* </View> */}
        {/* </View> */}
        <View style={styles.cardContainer}>
          <Text style={[styles.title, { color: SystemGrey01 }]}>Trợ giúp</Text>
          <View style={styles.cardInfoContainer}>
            <TouchableOpacity style={styles.buttonContainer}>
              <View style={{ flexDirection: 'row' }}>
                <IconSimpleLineIcons
                  name="bubbles"
                  color={SystemGrey01}
                  size={18}
                />
                <Text style={[styles.textButton, { color: SystemGrey01 }]}>
                  Liên hệ
                </Text>
              </View>
              <IconSimpleLineIcons
                name="arrow-right"
                style={styles.iconRight}
                color={SystemGrey01}
                size={12}
              />
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <TouchableOpacity style={styles.buttonContainer}>
              <View style={{ flexDirection: 'row' }}>
                <IconSimpleLineIcons
                  name="exclamation"
                  color={SystemGrey01}
                  size={18}
                />
                <Text style={[styles.textButton, { color: SystemGrey01 }]}>
                  Về chúng tôi{' '}
                </Text>
              </View>
              <IconSimpleLineIcons
                name="arrow-right"
                style={styles.iconRight}
                color={SystemGrey01}
                size={12}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.cardContainer, { marginBottom: 60 }]}>
          <Text style={styles.title}>Khác</Text>
          <View style={styles.cardInfoContainer}>
            <TouchableOpacity style={styles.buttonContainer}>
              <View style={{ flexDirection: 'row' }}>
                <IconSimpleLineIcons
                  name="briefcase"
                  color={SystemGrey01}
                  size={18}
                />
                <Text style={[styles.textButton, { color: SystemGrey01 }]}>
                  Ngôn ngữ
                </Text>
              </View>
              <IconSimpleLineIcons
                name="arrow-right"
                style={styles.iconRight}
                color={SystemGrey01}
                size={12}
              />
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <TouchableOpacity style={styles.buttonContainer}>
              <View style={{ flexDirection: 'row' }}>
                <IconSimpleLineIcons
                  name="settings"
                  color={SystemGrey01}
                  size={18}
                />
                <Text style={[styles.textButton, { color: SystemGrey01 }]}>
                  Cài đặt
                </Text>
              </View>
              <IconSimpleLineIcons
                name="arrow-right"
                style={styles.iconRight}
                color={SystemGrey01}
                size={12}
              />
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onPressLogout}>
              <View style={{ flexDirection: 'row' }}>
                <IconSimpleLineIcons
                  name="logout"
                  color={SystemGrey01}
                  size={18}
                />
                <Text style={styles.textButton}>Đăng xuất</Text>
              </View>
              <IconSimpleLineIcons
                name="arrow-right"
                style={styles.iconRight}
                color={SystemBlack}
                size={12}
              />
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
          </View>
          <Text style={{ fontSize: 9, textAlign: 'center', marginTop: 20 }}>
            Version 2.4
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //marginTop: 'ios' === Platform.OS ? "-5%" : "0%"
  },
  iconRight: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  scrollView: {
    paddingHorizontal: 16,

    paddingVertical: 'ios' == Platform.OS ? 0 : '5%',
  },
  cardUserContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardUserContainerWallet: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  textNameUser: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#000',
  },
  textPhoneUser: {
    width: 150,
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
    color: SystemGrey01,
  },
  imgUser: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  walletUserContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userWallet: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
    marginRight: 5,
    borderRadius: 10,
  },
  userRewards: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginLeft: 5,
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
  textTitleUserWallet: {
    color: '#FFF',
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
    fontSize: 13,
  },
  textMoneyuserWallet: {
    marginTop: 10,
    fontSize: 19,
    color: '#FFF',
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.2,
  },
  textTitleUserRewards: {
    color: SystemBlack,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
    fontSize: 16,
  },
  textPointRewards: {
    marginTop: 10,
    fontSize: 14,
    color: SystemBlack,
    letterSpacing: 0.2,
  },
  cardContainer: {
    marginVertical: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.15,
    marginBottom: 12,
  },
  cardInfoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: SystemGrey05,
  },
  textButton: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: SystemBlack,
    marginLeft: 10,
  },
  groupButtonCardUserContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  buttonCardContainer: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonCard: {
    fontSize: 10,
    marginTop: 5,
    fontFamily: 'Inter-Medium',
    color: SystemPrimary,
  },
});

//make this component available to the app
export default AccountScreen;

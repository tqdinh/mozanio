//import liraries
import CustomButton from '@path/components/customButtons/customButton';
import ModalGender from '@path/components/modals/ModalGender';
import {
  SystemGreen,
  SystemGrey03,
  SystemGrey06,
  SystemPrimary,
} from '@path/localization/colors/colors';
import {
  accountActions,
  selectAccountInfo,
} from '@path/redux/Slices/AccountSlice';
import { Gender } from '@path/utils/json/Gender';
import { uploadImage } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
// create a component
const ProfileScreen = () => {
  const accountInformation = useSelector(selectAccountInfo);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // edit first name
  const [firstName, setFirstName] = useState('');
  useEffect(() => {
    if ('' == firstName) {
      setFirstName(accountInformation.first_name);
    } else {
      setFirstName('');
    }
  }, []);
  // edit last name
  const [lastName, setLastName] = useState('');
  useEffect(() => {
    if ('' == lastName) {
      setLastName(accountInformation.last_name);
    } else {
      setLastName('');
    }
  }, []);
  // edit phone
  const [phone, setPhone] = useState('');
  useEffect(() => {
    if ('' == phone) {
      setPhone(accountInformation.phone_number);
    } else {
      setPhone('');
    }
  }, []);
  // edit email
  const [email, setEmail] = useState('');
  useEffect(() => {
    if ('' == email) {
      setEmail(accountInformation.email);
    } else {
      setEmail('');
    }
  }, []);
  // edit day of birth
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthday, setBirthday] = useState<Date>(new Date());
  const onChangeBirthday = (userBirthday: any) => {
    setBirthday(userBirthday);
  };
  const hideDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleConfirm = (date: Date) => {
    setBirthday(date);
    hideDatePicker();
  };

  useEffect(() => {
    if (birthday !== null) {
      setBirthday(new Date(accountInformation.date_of_birth));
    } else {
      setBirthday(new Date());
    }
  }, []);
  // edit gender
  const [showModalGender, setShowModalGender] = useState(false);
  const [gender, setGender] = useState('');
  useEffect(() => {
    if ('' == gender) {
      setGender(accountInformation.gender);
    } else {
      setGender('');
    }
  }, []);
  // edit address
  const [address, setAddress] = useState('');
  // edit image
  const [avatarId, setAvatarId] = useState<number>();
  const initAvatarUrl = accountInformation
    ? accountInformation.avatar
      ? accountInformation.avatar.url
      : null
    : null;

  const currentAvatarId = accountInformation
    ? accountInformation.avatar
      ? accountInformation.avatar.id
      : null
    : null;
  const [avatartUrl, setAvatartUrl] = useState<string>(initAvatarUrl);
  if (null == avatartUrl && null != initAvatarUrl) {
    setAvatartUrl(initAvatarUrl);

    setAvatarId(currentAvatarId);
    console.log('avartarid:', currentAvatarId);
  }
  const onClickOpenAlertPickImage = () => {
    Alert.alert(
      'Thông báo.',
      'Bạn muốn lấy ảnh từ thư viện hay máy ảnh?',
      [
        {
          text: 'Thư viện',
          onPress: () => pickImageFromGalery(),
          style: 'default',
        },
        {
          text: 'Máy ảnh',
          onPress: () => pickImageFromCamera(),
          style: 'default',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('cancel'),
      },
    );
  };
  const pickImageFromGalery = async () => {
    const optionsGalery: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    const resultImage = await launchImageLibrary(optionsGalery);

    if (undefined != resultImage && resultImage.assets) {
      const imgUri = resultImage.assets[0].uri;

      uploadImage(
        imgUri ? imgUri : '',
        ({ percent, uri }) => {
          console.log('percent:', percent, ' uri:', uri);
        },
        ({ result, uri }) => {
          const jsonResult = JSON.parse(result);
          console.log('upload success', jsonResult.url);
          setAvatarId(jsonResult.id);
          console.log('Upload:', jsonResult.id);
          setAvatartUrl(jsonResult.url);
        },
        ({ error, uri }) => {},
        uri => {},
      );
    } else {
      console.log('Get uri image fail');
    }
  };
  const pickImageFromCamera = async () => {
    const optionsCamera: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: false,
      cameraType: 'front',
      quality: 1,
    };
    const resultImage = await launchCamera(optionsCamera);
    if (undefined != resultImage && resultImage.assets) {
      const imgUri = resultImage.assets[0].uri;
      uploadImage(
        imgUri ? imgUri : '',
        ({ percent, uri }) => {
          console.log('percent:', percent, ' uri:', uri);
        },
        ({ result, uri }) => {
          const jsonResult = JSON.parse(result);
          console.log('upload success', jsonResult.url);
          setAvatarId(jsonResult.id);
          console.log('Upload:', jsonResult.id);
          setAvatartUrl(jsonResult.url);
        },
        ({ error, uri }) => {},
        uri => {},
      );
    }
  };
  // on click change ìno
  const onClickChangeInfo = () => {
    if (firstName === '' || lastName === '' || phone === '' || email === '') {
      Alert.alert(
        'Thông báo.',
        'Vui lòng điền đầy đủ thông tin để thay đổi.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => console.log('cancel'),
        },
      );
    } else {
      Alert.alert(
        'Thông báo.',
        'Bạn chắc chắn với thay đổi này',
        [
          {
            text: 'Ok',
            style: 'default',
            onPress: () => {
              try {
                dispatch(
                  accountActions.updateAccountDetail({
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phone,
                    email: email,
                    national_code: 84,
                    avatar: avatarId,
                    gender: gender,
                    date_of_birth: birthday.toISOString(),
                  }),
                );
                navigation.goBack();
              } catch (error) {
                console.log(error);
              }
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => console.log('cancel'),
        },
      );
    }
  };
  return (
    <>
      <ModalGender
        ShowModal={showModalGender}
        onPressCancel={() => {
          setShowModalGender(!showModalGender);
        }}
        genderUser={gender}
        data={Gender}
        setGenderUser={setGender}
      />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.backgroundImage}>
          <Image
            source={
              avatartUrl
                ? { uri: avatartUrl }
                : require('../../assets/images/avatar_user.png')
            }
            style={styles.imgUser}
          />
          <TouchableOpacity
            style={[styles.buttonAddImageUser, styles.shadowButtonAddImageUser]}
            onPress={onClickOpenAlertPickImage}>
            <IconEntypo name="camera" size={15} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.textTitle}>Họ và tên đệm</Text>
          <View
            style={[styles.textInputContainer, { borderColor: SystemGrey03 }]}>
            <TextInput
              style={styles.textinput}
              value={firstName}
              keyboardType="default"
              onChangeText={(input: string) => {
                setFirstName(input);
              }}
            />
          </View>
          <Text style={styles.textTitle}>Tên</Text>
          <View
            style={[styles.textInputContainer, { borderColor: SystemGrey03 }]}>
            <TextInput
              style={styles.textinput}
              placeholder={accountInformation.last_name}
              value={lastName}
              onChangeText={(input: string) => {
                setLastName(input);
              }}
              keyboardType="default"
            />
          </View>
          <Text style={styles.textTitle}>Số điện thoại</Text>
          <View
            style={[styles.textInputContainer, { borderColor: SystemGrey03 }]}>
            <TextInput
              style={styles.textinput}
              placeholder={
                accountInformation.phone_number !== null
                  ? accountInformation.phone_number
                  : 'Hiện tại người dùng này chưa nhập số điện thoại'
              }
              value={phone}
              onChangeText={(input: string) => {
                setPhone(input);
              }}
              keyboardType="phone-pad"
            />
          </View>
          <Text style={styles.textTitle}>Email</Text>
          <View
            style={[styles.textInputContainer, { borderColor: SystemGrey03 }]}>
            <TextInput
              style={styles.textinput}
              placeholder={accountInformation.email}
              value={email}
              onChangeText={(input: string) => {
                setEmail(input);
              }}
              keyboardType="default"
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text style={styles.textTitle}>Ngày sinh</Text>
              <View
                style={[
                  styles.textInputContainer,
                  { borderColor: SystemGrey03 },
                ]}>
                <TextInput
                  style={styles.textinput}
                  placeholder={birthday.toLocaleDateString()}
                  keyboardType="default"
                  value={birthday.toLocaleDateString()}
                  onChangeText={onChangeBirthday}
                />
                <TouchableOpacity
                  style={[
                    styles.buttonEditUserContainer,
                    { borderColor: SystemGreen },
                  ]}
                  onPress={() => {
                    setShowDatePicker(!showDatePicker);
                  }}>
                  <IconFontAwesome name="calendar" color="#FFF" size={12} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text style={styles.textTitle}>Giới tính</Text>
              <View
                style={[
                  styles.textInputContainer,
                  { borderColor: SystemGrey03 },
                ]}>
                <Text style={styles.textGender}>{gender}</Text>
                <TouchableOpacity
                  style={[
                    styles.buttonEditUserContainer,
                    { borderColor: SystemGreen },
                  ]}
                  onPress={() => {
                    setShowModalGender(!showModalGender);
                  }}>
                  <IconFontAwesome
                    name="transgender-alt"
                    color="#FFF"
                    size={12}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.textTitle}>Địa chỉ</Text>
          <View
            style={[styles.textInputContainer, { borderColor: SystemGrey03 }]}>
            <TextInput
              style={styles.textinput}
              placeholder={'địa chỉ'}
              value={address}
              onChangeText={(input: string) => {
                setAddress(input);
              }}
              keyboardType="default"
            />
          </View>
          <CustomButton
            text={'Xác nhận'}
            onPress={onClickChangeInfo}
            disabled={false}
            color={SystemPrimary}
          />
        </View>
      </ScrollView>
    </>
  );
};

// define your styles

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  backgroundImage: {
    height: 201,
    width: 201,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: SystemGrey03,
    justifyContent: 'center',
  },
  imgUser: {
    backgroundColor: SystemGrey06,
    height: 200,
    width: 200,
    alignSelf: 'center',
    borderRadius: 20,
  },
  textInputContainer: {
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  textinput: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 7,
  },
  buttonEditUserContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SystemPrimary,
    borderRadius: 5,
  },
  textTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#000',
    letterSpacing: 0.5,
  },
  buttonAddImageUser: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 35,
    height: 35,
    backgroundColor: SystemPrimary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowButtonAddImageUser: {
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textGender: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 7,
  },
});

//make this component available to the app
export default ProfileScreen;

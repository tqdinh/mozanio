//import liraries
import {
  SystemBlack,
  SystemGrey01,
  SystemGrey05,
} from '@path/localization/colors/colors';
import { createPasscodeActions } from '@path/redux/Slices/Pay/CreatePasscodeSlice';
import { verifyPasscodeActions } from '@path/redux/Slices/Pay/VerifyPasscodeSlice';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch } from 'react-redux';
// create a component
const PasscodeManagerScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardInfoContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              dispatch(verifyPasscodeActions.refreshVerifyPassCodeStatus());
              dispatch(createPasscodeActions.refreshPassCodeStatus());
              navigation.navigate('EditPasscodeScreen');
            }}>
            <View style={{ flexDirection: 'row' }}>
              <IconSimpleLineIcons
                name="reload"
                color={SystemGrey01}
                size={18}
              />
              <Text style={styles.textButton}>Thay đổi Passcode</Text>
            </View>
            <IconSimpleLineIcons
              name="arrow-right"
              style={styles.iconRight}
              color={SystemBlack}
              size={12}
            />
          </TouchableOpacity>
          <View style={styles.horizontalLine} />
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={{ flexDirection: 'row' }}>
              <IconSimpleLineIcons
                name="shield"
                color={SystemGrey01}
                size={18}
              />
              <Text style={styles.textButton}>Xác thực Passcode</Text>
            </View>
            <IconSimpleLineIcons
              name="arrow-right"
              style={styles.iconRight}
              color={SystemBlack}
              size={12}
            />
          </TouchableOpacity>
          <View style={styles.horizontalLine} />
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={{ flexDirection: 'row' }}>
              <IconSimpleLineIcons
                name="trash"
                color={SystemGrey01}
                size={18}
              />
              <Text style={styles.textButton}>Xóa Passcode</Text>
            </View>
            <IconSimpleLineIcons
              name="arrow-right"
              style={styles.iconRight}
              color={SystemBlack}
              size={12}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
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
  iconRight: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  cardContainer: {
    marginVertical: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
});

//make this component available to the app
export default PasscodeManagerScreen;

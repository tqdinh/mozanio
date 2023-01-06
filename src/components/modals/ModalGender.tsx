//import liraries
import {
  SystemBlack,
  SystemGreen,
  SystemGrey02,
  SystemGrey04,
} from '@path/localization/colors/colors';
import { selectAccountInfo } from '@path/redux/Slices/AccountSlice';
import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
// create a component
interface ModalListGenderProps {
  ShowModal: boolean;
  onPressCancel: any;
  data: any;
  setGenderUser: any;
  genderUser: any;
}
const ModalGender = ({
  ShowModal,
  onPressCancel,
  data,
  genderUser,
  setGenderUser,
}: ModalListGenderProps) => {
  const accountInformation = useSelector(selectAccountInfo);
  const renderItemGender = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.itemGender}
        onPress={() => {
          setGenderUser(item.name);
          onPressCancel();
        }}>
        <View
          style={[
            styles.checkBoxContainer,
            {
              borderColor:
                genderUser === item.name ? SystemGreen : SystemGrey02,
            },
          ]}>
          <IconIonicons
            name="ios-checkmark"
            color={genderUser === item.name ? SystemGreen : SystemGrey02}
          />
        </View>
        <Text
          style={[
            styles.textNamegender,
            {
              color: genderUser === item.name ? SystemGreen : SystemGrey02,
            },
          ]}>
          {item.display_name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal animationType="fade" transparent={true} visible={ShowModal}>
      <View style={styles.backgroundModals}>
        <View style={[styles.container, styles.shadow]}>
          <TouchableOpacity
            style={styles.buttonCloseContainer}
            onPress={() => {
              onPressCancel();
            }}>
            <IconIonicons name="ios-close" color={SystemBlack} size={12.5} />
          </TouchableOpacity>
          <Text style={styles.title}>Giới tính</Text>
          <FlatList
            style={styles.listGenderContainer}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItemGender}
          />
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    top: HEIGHT / 8,
    alignSelf: 'center',
    width: WIDTH / 1.2,
    height: HEIGHT / 3,
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#FFF',
  },
  listGenderContainer: {
    flex: 1,
    marginTop: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  title: {
    fontSize: 20,
    letterSpacing: 0.5,
    color: SystemBlack,
    fontFamily: 'Inter-Bold',
  },
  backgroundModals: {
    flex: 1,
    backgroundColor: '#000000A6',
  },
  buttonCloseContainer: {
    zIndex: 2,
    position: 'absolute',
    right: 16,
    top: 16,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: SystemGrey04,
  },
  itemGender: {
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    width: 20,
    height: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textNamegender: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
  },
});

//make this component available to the app
export default ModalGender;

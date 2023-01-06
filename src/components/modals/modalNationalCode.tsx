//import liraries
import {
  SystemBlack,
  SystemGrey03,
  SystemGrey04,
} from '@path/localization/colors/colors';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
// create a component
interface ModalListNationalCodeProps {
  ShowModal: boolean;
  onPressCancel: any;
  data: any;
  setNationalCode: any;
}
const CustomModalNationalCode = ({
  ShowModal,
  onPressCancel,
  data,
  setNationalCode,
}: ModalListNationalCodeProps) => {
  const renderItemNationalCode = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        key={index}
        onPress={() => {
          setNationalCode(item.dial_code);
          onPressCancel();
        }}>
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textNationalCode}>{item.dial_code}</Text>
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
          <Text style={styles.title}>Mã vùng</Text>
          <FlatList
            style={styles.listCountryContainer}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItemNationalCode}
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
    height: HEIGHT / 1.5,
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonCloseContainer: {
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
  title: {
    fontSize: 20,
    letterSpacing: 0.5,
    color: SystemBlack,
    fontFamily: 'Inter-Bold',
  },
  listCountryContainer: {
    flex: 1,
    marginTop: 10,
  },
  backgroundModals: {
    flex: 1,
    backgroundColor: '#000000A6',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 5,
  },
  textName: {
    width: WIDTH / 1.4,
    fontFamily: 'Inter-Bold',
    color: SystemBlack,
    letterSpacing: 0.5,
  },
  textNationalCode: {
    fontFamily: 'Inter-Medium',
    color: SystemGrey03,
    letterSpacing: 0.5,
  },
});

//make this component available to the app
export default CustomModalNationalCode;

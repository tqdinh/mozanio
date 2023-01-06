//import liraries
import {
  SystemBlack,
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import React from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
if ('ios' == Platform.OS) Icon.loadFont();
// create a component
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
interface AlertProps {
  showAlert: boolean;
  title: string;
  description: string;
  onPressAccept: any;
  onPressCancel: any;
  type: 'warning' | 'notification';
}
const CustomAlert = ({
  showAlert,
  title,
  description,
  onPressAccept,
  onPressCancel,
  type,
}: AlertProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={showAlert}>
      <View
        style={{ backgroundColor: '#000000A6', width: '100%', height: '100%' }}>
        <View style={[styles.container, styles.shadow]}>
          <View
            style={
              type == 'warning' ? { display: 'flex' } : { display: 'none' }
            }>
            <Icon name="alert-triangle" size={40} color={SystemBlack} />
          </View>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textDes}>{description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                onPressCancel === undefined && { display: 'none' },
                styles.button,
                type == 'warning'
                  ? { backgroundColor: SystemSecondary }
                  : { borderColor: SystemPrimary, borderWidth: 1 },
              ]}
              onPress={onPressCancel}>
              <Text
                style={[
                  styles.textButton,
                  type == 'warning'
                    ? { color: '#FFF' }
                    : { color: SystemPrimary },
                ]}>
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                onPressAccept === undefined && { display: 'none' },
                { backgroundColor: SystemPrimary },
                type == 'notification'
                  ? { display: 'flex' }
                  : { display: 'none' },
              ]}
              onPress={onPressAccept}>
              <Text style={[styles.textButton, { color: '#FFF' }]}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    top: HEIGHT / 4,
    alignSelf: 'center',
    width: WIDTH * 0.8,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
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
  textTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: SystemBlack,
    letterSpacing: 0.15,
    marginTop: 10,
  },
  textDes: {
    marginTop: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: SystemBlack,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 35,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  textButton: {
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.125,
  },
});

//make this component available to the app
export default CustomAlert;

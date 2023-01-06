//import liraries
import { SystemPrimary } from '@path/localization/colors/colors';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
interface modalLoadingProps {
  showModal: any;
}
// create a component
const CustomModalLoading = ({ showModal }: modalLoadingProps) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View
        style={{ backgroundColor: '#000000A6', width: '100%', height: '100%' }}>
        <View style={[styles.modal, styles.shadow]}>
          <ActivityIndicator size="large" color={SystemPrimary} />
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  modal: {
    top: Dimensions.get('screen').height / 2.5,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

//make this component available to the app
export default CustomModalLoading;

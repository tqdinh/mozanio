//import liraries
import { SystemBlack } from '@path/localization/colors/colors';
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

// create a component
const OTPScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Text style={styles.textTitle}>Xác nhận mã OTP</Text>
        <Text style={styles.textDescription}>
          Chúng tôi đã gửi một mã xác nhận được gửi tới số điện thoại 0123456789
        </Text>
      </View>
    </View>
  );
};

// define your styles
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  textTitle: {
    backgroundColor: 'pink',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
    color: SystemBlack,
  },
  textDescription: {
    backgroundColor: 'pink',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.5,
    color: SystemBlack,
  },
});

//make this component available to the app
export default OTPScreen;

//import liraries
import {
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// create a component
interface BottomDetailOrderProps {
  onClickCancel: any;
  onClickPay: any;
  onClickRateClick: any;
  status: any;
  paid: boolean;
}
const BottomDetailOrder = ({
  onClickCancel,
  onClickPay,
  onClickRateClick,
  status,
  paid,
}: BottomDetailOrderProps) => {
  console.log('123', status);
  const navigation = useNavigation();
  if (JSON.stringify(status) === 'COMPLETED') {
    console.log('yes');
  } else {
    console.log('no');
  }

  const Success = () => {
    return (
      <>
        <TouchableOpacity style={styles.buttonRateContainer} onPress={() => {}}>
          <Text style={styles.textButtonDefault}>Đánh giá</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDefaultContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.textButtonDefault}>Đóng</Text>
        </TouchableOpacity>
      </>
    );
  };
  const Default = () => {
    return (
      <TouchableOpacity
        style={styles.buttonDefaultContainer}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.textButtonDefault}>Đóng</Text>
      </TouchableOpacity>
    );
  };

  const Hold = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.buttonDefaultContainer}
          onPress={onClickPay}>
          <Text style={styles.textButtonDefault}>Thanh toán</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDefaultContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.textButtonDefault}>Đóng</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={[styles.container, styles.shadow]}>
      {status == 'Chờ xác nhận' ? (
        paid ? (
          <Default />
        ) : (
          <Hold />
        )
      ) : status == 'Đã hoàn thành' ? (
        <Success />
      ) : (
        <Default />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  buttonDefaultContainer: {
    flexGrow: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SystemPrimary,
    marginHorizontal: 10,
    padding: 10,
  },
  textButtonDefault: {
    letterSpacing: 1.25,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  buttonRateContainer: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SystemSecondary,
    marginVertical: 12,
    marginHorizontal: 16,
  },
});

//make this component available to the app
export default BottomDetailOrder;

//import liraries
import {
  SystemBlack,
  SystemGrey02,
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
interface giftProp {
  title: string;
}
// create a component
const gift = new Array(3).fill(0);
const Gift = ({ title }: giftProp) => {
  const navigation = useNavigation();
  const renderItemGift = ({ item, index }: any) => {
    return (
      <View style={[styles.itemContainer, styles.shadow]}>
        <Image
          source={require('../../assets/images/imgGift.png')}
          style={styles.imageGift}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.textItemContainer}>
            <Text style={styles.nameItem}>Bộ quà tặng đến 900k</Text>
            <Text style={styles.descriptionItem}>
              Hoàn 100K, tặng thêm ưu đãi trị giá 800k vào ví
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textButton}>Mở ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text
          style={styles.textButtonAll}
          onPress={() => console.log('See more...')}>
          Tất cả
        </Text>
      </View>
      <FlatList
        data={gift}
        renderItem={renderItemGift}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    height: 329,
    backgroundColor: '#FFFFFF',
  },
  textTitleContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    width: 177,
    height: 24,
    fontSize: 20,
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  textButtonAll: {
    width: 42,
    height: 17,
    fontSize: 14,
    color: SystemSecondary,
    fontFamily: 'Inter',
    lineHeight: 17,
    letterSpacing: 0.1,
  },
  itemContainer: {
    width: 350,
    height: 244.95,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 8,
    flexDirection: 'column',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  imageGift: {
    width: 350,
    height: 167.95,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottomContainer: {
    width: 348,
    height: 77,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  textItemContainer: {
    width: 235,
    height: 57,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nameItem: {
    width: 235,
    height: 21,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.1,
    color: '#000000',
  },
  descriptionItem: {
    width: 235,
    height: 36,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.25,
    color: SystemGrey02,
  },
  buttonContainer: {
    width: 73,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7dbe7',
    borderRadius: 8,
  },
  textButton: {
    width: 59,
    height: 17,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.1,
    color: SystemPrimary,
  },
});

//make this component available to the app
export default Gift;

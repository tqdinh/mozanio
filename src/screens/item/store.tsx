//import liraries
import { ProgressiveImage } from '@path/components/lazyLoadImage/ProgressiveImage';
import {
  SystemBlack,
  SystemGrey01,
  SystemSecondary,
} from '@path/localization/colors/colors';
import { useNavigation } from '@react-navigation/native';
import { number } from 'prop-types';
import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
interface storeProp {
  title: string;
  items: any;
  loadMore: any;
}
// create a component
// const store = new Array(7).fill(0);
const Store = ({ title, items, loadMore }: storeProp) => {
  const navigation = useNavigation();
  const flatList = useRef<any>();
  // useEffect(() => {
  //   flatList.current.scrollToIndex({ index: 0 });
  //   console.log('Scrool to top');
  // }, [items]);

  const renderItemStore = ({ item, index }: any) => {
    const onClickGoToDetail = () => {
      navigation.navigate('DetailStore' as never, item as never);
    };
    // console.log(item)
    const imageUrl = undefined != item.logo ? item.logo.url : '';
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onClickGoToDetail}>
        {imageUrl ? (
          <ProgressiveImage
            thumbnailSource={require('../../assets/images/imageVoucher.png')}
            source={{ uri: imageUrl }}
            style={styles.imageItem}
            resizeMode="cover"
          />
        ) : (
          <ProgressiveImage
            thumbnailSource={require('../../assets/images/imageVoucher.png')}
            source={require('../../assets/images/imageVoucher.png')}
            style={styles.imageItem}
            resizeMode="cover"
          />
        )}
        <View style={styles.textItemContainer}>
          <Text style={styles.textNameStore}>{item.name}</Text>
          {/* <Text style={styles.textDistanceStore}>Cách đây 1.0km</Text> */}
        </View>
      </TouchableOpacity>
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
      {0 != items.length ? (
        <FlatList
          ref={flatList}
          data={items}
          renderItem={renderItemStore}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={loadMore}
          // keyExtractor={item => item.id}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    height: 273,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    height: 189,
    width: 144,
    marginHorizontal: 16,
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  imageItem: {
    width: 144,
    height: 144,
    borderRadius: 10,
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
  textItemContainer: {
    height: 38,
    justifyContent: 'space-between',
  },
  textNameStore: {
    width: 144,
    height: 17,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.1,
    fontFamily: 'Inter-Medium',
    color: '#000000',
  },
  textDistanceStore: {
    width: 144,
    height: 17,
    fontSize: 14,
    fontFamily: 'Inter',
    color: SystemGrey01,
    lineHeight: 17,
    letterSpacing: 0.25,
  },
});

//make this component available to the app
export default Store;

//import liraries
import { RootState } from '@path/redux/stores/store';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
// create a component
type itemProps = {
  item: any;
  index: any;
};
const Cart = () => {
  // const dispatch = useDispatch();
  const cartList = useSelector((state: RootState) => state.cart.data);
  const renderItem = ({ item, index }: itemProps) => {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.img}
            source={{ uri: `${item.item.strDrinkThumb}` }}
          />
          <View style={styles.numberCountContainer}>
            <Text style={styles.numberCount}>01</Text>
          </View>
        </View>
        <View style={styles.informationContainer}>
          <View style={styles.left}>
            <Text style={styles.textName}>{item.item.strDrink}</Text>
            <Text>Size M</Text>
            <Text style={styles.textNote}>No note added</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.prices}>50.000 đ</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={cartList}
      renderItem={renderItem}
      key="CartList"
      showsVerticalScrollIndicator={false}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: 380,
    height: 100,
    alignSelf: 'center',
    margin: 10,
    flexDirection: 'row',
  },
  numberCountContainer: {
    width: 22,
    height: 22,
    position: 'absolute',
    end: -5,
    top: -5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#fa6',
    borderColor: 'tomato',
    borderRadius: 100,
  },
  numberCount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
    opacity: 0.8,
    margin: 5,
  },
  informationContainer: {
    width: 280,
    height: 80,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textNote: {
    fontSize: 13,
    color: 'grey',
  },
  right: {
    justifyContent: 'center',
  },
  prices: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

//make this component available to the app
export default Cart;

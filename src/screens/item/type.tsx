//import liraries
import { SystemBlack, SystemSecondary } from '@path/localization/colors/colors';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// create a component
interface dataType {
  data: any;
  onClicked: any;
}
const Type = ({ data, onClicked }: dataType) => {
  const [clicked, setClicked] = useState('0');
  const renderitemType = ({ item, index }: any) => {
    const handleClick = () => {
      setClicked(item.id);
      onClicked(item.type);
    };
    return (
      <View
        style={[
          index == clicked
            ? [styles.itemClicked, styles.shadow]
            : [styles.itemUnClicked],
        ]}
        key={item.id}
        onTouchStart={handleClick}>
        <Text
          style={[
            styles.textItem,
            index == clicked
              ? { color: SystemSecondary }
              : { color: SystemBlack },
          ]}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={renderitemType}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  itemUnClicked: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    height: 37,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 8,
  },
  itemClicked: {
    paddingVertical: 10,
    height: 37,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignSelf: 'center',
    marginHorizontal: 8,
    backgroundColor: '#FFF',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  textItem: {
    fontSize: 11,
    letterSpacing: 0.1,
    lineHeight: 17,
    fontFamily: 'Inter-Medium',
    color: SystemBlack,
  },
});

//make this component available to the app
export default Type;

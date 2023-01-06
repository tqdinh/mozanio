//import liraries
import {
  SystemPrimary,
  SystemSecondary,
} from '@path/localization/colors/colors';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// create a component

//test notifications
const test = new Array(0).fill(0);
type CustomHeaderHomeScreenProps = {
  onChange: any;
};
const CustomHeaderHomeScreen = ({ onChange }: CustomHeaderHomeScreenProps) => {
  const [textSearch, setTextSearch] = useState('');
  const onChangeTextSearch = (text: string) => {
    setTextSearch(text);
    onChange(text);
  };
  return (
    <View style={[styles.headerContainer, styles.shadow]}>
      <View style={styles.leftContainer}>
        <Icon name="search" size={15} color="#000" />
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={textSearch}
            placeholder="Tìm kiêm"
            onChangeText={onChangeTextSearch}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.rightContainer}>
        <View style={test.length > 0 ? styles.badge : styles.hide}>
          <Text style={styles.textBadge}>
            {test.length > 99 ? '99+' : test.length}
          </Text>
        </View>
        <Icon name="bell-o" size={15} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: SystemPrimary,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
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
  leftContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    height: 40,
    marginRight: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
    marginLeft: 12,
  },
  textInput: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.15,
  },
  rightContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  badge: {
    flex: 1,
    position: 'absolute',
    height: 25,
    width: 25,
    backgroundColor: SystemSecondary,
    top: -8,
    right: -8,
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBadge: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Inter-Regular',
    fontSize: 7,
  },
  hide: {
    display: 'none',
  },
});

//make this component available to the app
export default CustomHeaderHomeScreen;

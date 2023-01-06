//import liraries
import { SystemGrey02, SystemPrimary } from '@path/localization/colors/colors';
import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// create a component
const CustomStepSlider = ({ data, add, setAdd }: any) => {
  const [valueAdditionalItem, setValueAdditionalItem] = useState<number>(
    data && data.amount,
  );

  const onChangeAmount = () => {
    const addClone = [...add];
    const dataClone = { ...data };
    const index = addClone.findIndex(e => e.id === dataClone.id);
    dataClone.amount = valueAdditionalItem;
    addClone.splice(index, 1, dataClone);
    setAdd(addClone);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textValue}>{valueAdditionalItem}</Text>
      <Slider
        style={{ flex: 1 }}
        value={valueAdditionalItem}
        onValueChange={(value: number) => {
          setValueAdditionalItem(Math.round(value));
        }}
        onSlidingComplete={onChangeAmount}
        minimumValue={data && data.min_value}
        maximumValue={data && data.max_value}
        step={1}
        thumbTintColor={SystemPrimary}
        minimumTrackTintColor={SystemPrimary}
        maximumTrackTintColor={SystemGrey02}
      />
      <Text style={styles.textValue}>{data && data.max_value}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  textValue: {
    fontSize: 16,
    color: SystemPrimary,
    fontFamily: 'Inter-Medium',
    width: 40,
    textAlign: 'center',
  },
  sliderLaBel: {
    position: 'absolute',
    bottom: 0,
    width: 1,
    height: 10,
    backgroundColor: 'red',
  },
});

//make this component available to the app
export default CustomStepSlider;

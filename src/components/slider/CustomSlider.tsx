//import liraries
import { SystemGrey02, SystemPrimary } from '@path/localization/colors/colors';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// create a component
const CustomSlider = ({ data, item, option, setOption }: any) => {
  const [valueIngreditents, setValueIngreditents] = useState<number>(
    data.selectedValue ? data.selectedValue : data.amount,
  );

  const onChangeAmount = () => {
    const optionClone = { ...option };
    const sizeClone = { ...optionClone.size };
    const recipeClone = [...sizeClone.size_recipe];
    let valueClone = recipeClone.find((e: any) => e.id === data.id);
    valueClone = { ...valueClone, selectedValue: valueIngreditents };
    const index = recipeClone.findIndex((e: any) => e.id === valueClone.id);
    recipeClone.splice(index, 1, valueClone);
    sizeClone.size_recipe = recipeClone;
    optionClone.size = sizeClone;
    setOption(optionClone);
  };

  return 0 == item.length || !data ? (
    <View></View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.textValue}>{valueIngreditents}</Text>
      <Slider
        style={{ flex: 1 }}
        value={valueIngreditents}
        onValueChange={(value: number) => {
          setValueIngreditents(Math.round(value));
        }}
        onSlidingComplete={onChangeAmount}
        minimumValue={
          item[0].min === 100
            ? undefined
            : data?.amount
            ? (data?.amount * item[0].min) / 100
            : 0
        }
        maximumValue={data.amount}
        thumbTintColor={SystemPrimary}
        minimumTrackTintColor={SystemPrimary}
        maximumTrackTintColor={SystemPrimary}
      />
      <Text style={styles.textValue}>
        {data.amount} {data.material.measurement_unit}
      </Text>
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
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    color: SystemPrimary,
    fontFamily: 'Inter-Medium',
  },
});

//make this component available to the app
export default CustomSlider;

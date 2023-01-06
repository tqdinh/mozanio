import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const SplashScreen = () => {
  const counter = useRef(new Animated.Value(0)).current;
  const [count, setCount] = useState(0);
  const countInterval = useRef(0);
  const navigation = useNavigation();
  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const [numOfClick, setClick] = useState(0);

  useEffect(() => {
    counter.setValue(numOfClick);
    console.log({ width });
    console.log({ numOfClick });

    if (100 == numOfClick) {
      setClick(0);
    }

    //navigation.navigate('MainScreen' as never);
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/splashBackground.jpeg')}
        resizeMode="cover"
        style={styles.background}
        imageStyle={{ opacity: 0.5 }}>
        <Image
          source={require('../../assets/images/coffee.png')}
          style={styles.image}
          resizeMode="center"></Image>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: '#8BED4F', width },
            ]}></Animated.View>
        </View>
        <Text>Demo click {numOfClick} time</Text>
        <Button
          title="add"
          onPress={() => {
            setClick(numOfClick + 1);
          }}></Button>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 100,
  },
  progressHolder: {
    flex: 1,
    flexDirection: 'column', //column direction
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  progressBar: {
    height: 20,
    width: '50%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
});
export default SplashScreen;

//import liraries
import React, { useRef } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
// create a component
const { width, height } = Dimensions.get('screen');

const data = [
  'https://scontent.fsgn13-2.fna.fbcdn.net/v/t1.15752-9/300389439_614243180307035_2573792987614138980_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=TfHtJQ86zd0AX-uvi2E&_nc_ht=scontent.fsgn13-2.fna&oh=03_AVJsDVb-MYd9VqlEo7TIY-jn2om6LBs47t8w4nh9tBNgFg&oe=63594826',
  'https://scontent.fsgn13-3.fna.fbcdn.net/v/t1.15752-9/306638409_666789934518183_8404579120010853396_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=g-tfQnW4Y80AX_cnTSM&tn=K5jnVqKl4C-h6Zgk&_nc_ht=scontent.fsgn13-3.fna&oh=03_AVIgoSq6yWv1RTEX4OItfCZ-HIYU2uYF3_vFDuJyomMPFA&oe=635A6FAF',
  'https://scontent.fsgn13-2.fna.fbcdn.net/v/t1.15752-9/300239396_629053438885371_3209692640566522786_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=qsMU1m9U8ZQAX9pVanG&tn=K5jnVqKl4C-h6Zgk&_nc_ht=scontent.fsgn13-2.fna&oh=03_AVIhc7STwC6FRmuVxod7KOOOzLy849C9WFLN7DVtpY5Y3Q&oe=635AA67F',
  'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.15752-9/308026626_3431266883775037_7205845546119133750_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=FTLPHV_CECQAX8kb6Zb&_nc_ht=scontent.fsgn4-1.fna&oh=03_AVIinHyiMbNqVTGSh8oV6JCocyNVhwnX8dwsBuf5oavI_A&oe=635A693D',
];
const imageW = width * 0.89;
const imageH = imageW / 1.57;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const CustomCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: image }}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <AnimatedFlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  card: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
  },
  image: {
    position: 'absolute',
    top: 20,
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

//make this component available to the app
export default CustomCarousel;

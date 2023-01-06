import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

//import screens
import { SystemGrey02, SystemPrimary } from '@path/localization/colors/colors';
import AccountScreen from '@path/screens/appScreen/accountScreen';
import BranchScreen from '@path/screens/appScreen/branchsScreen';
import HistoryScreen from '@path/screens/appScreen/historyScreen';
import HomeScreen from '@path/screens/appScreen/homeScreen';
import {
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

//Screen name
const homeName = 'Trang chủ';
const storeName = 'Chi nhánh';
const historyName = 'Lịch sử';
const accountName = 'Tài khoản';
const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  const tabOffSetValue = useRef(new Animated.Value(0)).current;
  const getWidth = () => {
    let width = Dimensions.get('window').width;
    return width / 4;
  };
  return (
    <SafeAreaView
      style={{ flex: 1, marginBottom: 'ios' == Platform.OS ? '-10%' : 0 }}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
              color = focused ? SystemPrimary : SystemGrey02;
            } else if (rn === storeName) {
              iconName = focused ? 'cart' : 'cart-outline';
              color = focused ? SystemPrimary : SystemGrey02;
            } else if (rn === historyName) {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              color = focused ? SystemPrimary : SystemGrey02;
            } else if (rn === accountName) {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
              color = focused ? SystemPrimary : SystemGrey02;
            }
            return <Icon name={iconName} size={20} color={color} />;
          },
          tabBarActiveTintColor: SystemPrimary,
          tabBarInactiveTintColor: SystemGrey02,
          tabBarLabelStyle: {
            fontSize: 10,
            marginBottom: 5,
          },
          tabBarStyle: {
            paddingVertical: 5,
          },
          headerShown: false,
        })}>
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          listeners={({ navigation, route }: any) => ({
            tabPress: e => {
              Animated.spring(tabOffSetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={storeName}
          component={BranchScreen}
          listeners={({ navigation, route }: any) => ({
            tabPress: e => {
              Animated.spring(tabOffSetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={historyName}
          component={HistoryScreen}
          listeners={({ navigation, route }: any) => ({
            tabPress: e => {
              Animated.spring(tabOffSetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
          // options={{
          //   headerShown: true,
          //   headerTitle: 'Lịch sử đơn hàng',
          //   headerTitleStyle: styles.titleHeader,
          //   headerTitleAlign: 'center',
          // }}
        />
        <Tab.Screen
          name={accountName}
          component={AccountScreen}
          listeners={({ navigation, route }: any) => ({
            tabPress: e => {
              Animated.spring(tabOffSetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      {/* <Animated.View
        style={{
          width: getWidth(),
          height: 2,
          borderRadius: 100,
          backgroundColor: SystemPrimary,
          position: 'absolute',
          bottom: 0,
          transform: [{ translateX: tabOffSetValue }],
          zIndex: 5,
        }}
      /> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleHeader: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
export default BottomNavigation;

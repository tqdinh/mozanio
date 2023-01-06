//import liraries
import React from 'react';
import { LogBox, StyleSheet, View, StatusBar } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';
import { MMKV } from 'react-native-mmkv';
import { Provider } from 'react-redux';
import BottomSheetModal from './components/modals/bottomNotificationModal';
import { SystemPrimary } from './localization/colors/colors';
import Navigation from './navigation/appNavigation';
import store from './redux/stores/store';
LogBox.ignoreAllLogs();
export const storage = new MMKV();
// create a component
LogBox.ignoreAllLogs();
enableLatestRenderer();
const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar backgroundColor={SystemPrimary} />
        <Navigation />
      </View>
    </Provider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { SystemPrimary } from "@path/localization/colors/colors";
import Navigation from "@path/navigation/appNavigation";
import store from "@path/redux/stores/store";
import React from "react";
import { LogBox, StatusBar, StyleSheet, View } from "react-native";
import { enableLatestRenderer } from "react-native-maps";
import { MMKV } from "react-native-mmkv";
import { Provider } from "react-redux";

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

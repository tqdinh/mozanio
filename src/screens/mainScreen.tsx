//import liraries
import CustomModalLoading from '@path/components/modals/loading';
import BottomNavigation from '@path/navigation/bottomNavigation';
import { accountActions } from '@path/redux/Slices/AccountSlice';
import { RootState } from '@path/redux/stores/store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// create a component

const MainScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(accountActions.getAccountDetail());
  }, []);
  const statusGetAccountDetail = useSelector(
    (state: RootState) => state.account.status,
  );
  useEffect(() => {
    if (statusGetAccountDetail !== 'success') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [statusGetAccountDetail]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomModalLoading showModal={loading} />
      <BottomNavigation />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default MainScreen;

//import liraries
import CustomHeaderHomeScreen from '@path/components/headers/headerHomeScreen';
import BottomNotificationModal from '@path/components/modals/bottomNotificationModal';
import { MATCHING_PERCENT } from '@path/constants/constant';
import {
  branchesActions,
  selectAllBranchs,
} from '@path/redux/Slices/BranchesSlice';
import { orderActions } from '@path/redux/Slices/OrderSlice';
import { searchString, similar_text } from '@path/utils/utilities';
import { oneOf } from 'prop-types';

import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Gift from '../item/gift';
import Store from '../item/store';
import Voucher from '../item/voucher';

// create a component
const HomeScreen = () => {
  const dispatch = useDispatch();
  let filteredBranch = useSelector(selectAllBranchs);
  console.log('MY BRANCH LIST', filteredBranch.length);
  const onLoadMoreCall = () => {
    console.log('onLoadmore call on home');
    dispatch(branchesActions.getMoreListBranch());
  };

  useEffect(() => {
    dispatch(branchesActions.getListBranch());
    dispatch(orderActions.getOrderHistory());
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [finalSearchTerm, setFinalSearchTerm] = useState<string>('');
  // const [isSearchChange, setIsSearchChange] = useState<boolean>(false)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Do filter here
      console.log('Text need to search is ', searchTerm);
      setFinalSearchTerm(searchTerm);
    }, 750);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const listNearbyStore = [...filteredBranch];
  // if (listNewStore.length > 2) {
  //   listNewStore = listNewStore.sort(
  //     (a, b) =>
  //       new Date(a.updated_time).getTime() - new Date(b.updated_time).getTime(),
  //   );
  // }

  return (
    <View style={styles.container}>
      <CustomHeaderHomeScreen
        onChange={(terms: any) => {
          setSearchTerm(terms);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {listNearbyStore ? (
          <Store
            title="C???a h??ng g???n b???n"
            items={listNearbyStore}
            loadMore={onLoadMoreCall}
          //  isSearchChange={isSearchChange}
          />
        ) : (
          <View></View>
        )}

        {/* {listNewStore ? (<Store
          title="Qu??n m???i"
          items={listNewStore}
          loadMore={onLoadMoreCall}
        // isSearchChange={true}
        />
        ) : ((<View></View>))} */}

        {/* <Store title="G???i ?? cho b???n" items={listSuggessionStore} loadMore={onLoadMoreCall} /> */}
        <Voucher title="Khuy???n m??i c???a b???n" />
        <Gift title="??u ????i c???a b???n" />
      </ScrollView>
      <BottomNotificationModal />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default HomeScreen;

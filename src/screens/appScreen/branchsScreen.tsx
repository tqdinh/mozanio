//import liraries
import CustomHeaderStoreScreen from '@path/components/headers/headerStoreScreen';
import { ProgressiveImage } from '@path/components/lazyLoadImage/ProgressiveImage';
import Map from '@path/components/map/Map';
import BottomNotificationModal from '@path/components/modals/bottomNotificationModal';
import { DefaultLocation, Location } from '@path/constants/types';
import {
  SystemBlack,
  SystemGrey01,
  SystemPrimary,
} from '@path/localization/colors/colors';
import {
  basketActions,
  selectTotalItemCountOnBasket,
} from '@path/redux/Slices/BasketSlice';
import {
  branchesActions,
  selectAllBranchs,
} from '@path/redux/Slices/BranchesSlice';
import { RootState } from '@path/redux/stores/store';
import { searchString } from '@path/utils/utilities';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// create a component
const BranchScreen = () => {
  const dispatch = useDispatch();

  let filteredBranch = useSelector(selectAllBranchs);

  const [openMap, setOpenMap] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>(DefaultLocation);

  const totalQuantities = useSelector(selectTotalItemCountOnBasket);
  const isLoadingListBranch = useSelector(
    (root: RootState) => root.branch.isLoading,
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [finalSearchTerm, setFinalSearchTerm] = useState<string>('');
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Do filter here
      console.log('Text need to search is ', searchTerm);
      setFinalSearchTerm(searchTerm);
    }, 750);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  const onLoadMoreCall = () => {
    dispatch(branchesActions.getMoreListBranch());
  };

  const navigation = useNavigation();

  const onTextChange = (searchText: any) => {
    console.log('Text change', searchText);
    setSearchTerm(searchText);
  };

  const renderItemStore = ({ item, index }: any) => {
    const onClickGoToDetail = () => {
      navigation.navigate('DetailStore' as never, item as never);
    };
    const imageUrl = undefined != item?.logo ? item?.logo.url : '';

    return item ? (
      <TouchableOpacity
        style={[styles.itemContainer, styles.shadow]}
        onPress={onClickGoToDetail}>
        <ProgressiveImage
          thumbnailSource={require('../../assets/images/imageVoucher.png')}
          source={
            imageUrl
              ? { uri: imageUrl }
              : require('../../assets/images/imageVoucher.png')
          }
          style={styles.imageItem}
          resizeMode="cover"
        />
        <View style={styles.textItemContainer}>
          <Text style={styles.nameStore}>{item.display_name}</Text>
          <Text style={styles.addressStore}>{item.address}</Text>
          {/* <Text style={styles.distanceStore}>Cách đây 1.0km</Text> */}
        </View>
      </TouchableOpacity>
    ) : (
      <View></View>
    );
  };
  const [LoadingMore, setLoadingMore] = useState(false);
  const newPageListBranch = useSelector(
    (state: RootState) => state.branch.next,
  );
  useEffect(() => {
    if (newPageListBranch !== null) {
      setLoadingMore(true);
    } else {
      setLoadingMore(false);
    }
  }, [newPageListBranch]);
  const footerListBranch = () => {
    return (
      <View
        style={[
          LoadingMore === true
            ? styles.footerListBranchContainer
            : { display: 'none' },
        ]}>
        <ActivityIndicator size="small" color={SystemPrimary} />
      </View>
    );
  };
  return (
    <View style={[styles.container, { flexDirection: 'column' }]}>
      <CustomHeaderStoreScreen
        map={openMap}
        // setMap={setOpenMap}
        setMap={() => { }}
        location={location}
        setLocation={setLocation}
        onSearchTextChange={onTextChange}
      />
      {openMap ? (
        <View style={{ flex: 1 }}>
          <Map location={location} setLocation={setLocation} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={filteredBranch}
            renderItem={renderItemStore}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.01}
            onEndReached={onLoadMoreCall}
            ListFooterComponent={footerListBranch}
            refreshControl={
              <RefreshControl
                refreshing={isLoadingListBranch}
                onRefresh={() => {
                  dispatch(branchesActions.getListBranch());
                }}
              />
            }
          />
        </View>
      )}
      {/* <BottomNotificationModal /> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    marginTop: 28,
    marginHorizontal: 16,
    color: SystemBlack,
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.15,
    marginBottom: 12,
  },
  itemContainer: {
    flex: Dimensions.get('screen').width,
    backgroundColor: '#FFFFFF',
    height: 110,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  imageItem: {
    margin: 15,
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textItemContainer: {
    flex: 1,
    height: 80,
    marginRight: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  nameStore: {
    color: SystemPrimary,
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    alignSelf: 'stretch',
  },
  addressStore: {
    height: 38,
    color: SystemBlack,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.15,
    alignSelf: 'stretch',
  },
  distanceStore: {
    fontFamily: 'Inter-Regular',
    color: SystemGrey01,
    lineHeight: 17,
    letterSpacing: 0.25,
  },
  footerListBranchContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default BranchScreen;

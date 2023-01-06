//import liraries
import { width } from '@path/constants/screen';
import { Location } from '@path/constants/types';
import {
  SystemGreen,
  SystemGrey00,
  SystemPrimary,
} from '@path/localization/colors/colors';
import { branchesActions, BranchModel } from '@path/redux/Slices/BranchesSlice';
import { RootState } from '@path/redux/stores/store';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressiveImage } from '../lazyLoadImage/ProgressiveImage';
import { distanceCalculate } from '@path/constants/constant';
// create a component

type MapState = {
  location: Location;
  setLocation: any;
};

const Map = (state: MapState) => {
  const { latitude, longitude } = state.location.coords;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const listBranch = useSelector(
    (branchState: RootState) => branchState.branch.branchList,
  );
  const [nearby, setNearby] =
    useState<Array<{ branch: BranchModel; distance: number }>>();
  const [focus, setFocus] = useState<number>(0);

  useEffect(() => {
    if (nearby) {
      const region = {
        latitude: nearby[focus].branch.latitude,
        longitude: nearby[focus].branch.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(region);
    }
  }, [focus]);

  const onClickGoToDetail = (branch: any) => {
    navigation.navigate('DetailStore', branch);
  };
  useEffect(() => {
    if (listBranch) {
      let listClone: Array<{ branch: BranchModel; distance: number }> = [];
      listBranch.map(branch => {
        if (branch.latitude !== 0 && branch.longitude !== 0) {
          const dis = distanceCalculate(
            { latitude: latitude, longitude: longitude },
            { latitude: branch.latitude, longitude: branch.longitude },
          );
          if (dis <= 2) {
            listClone.push({
              branch: branch,
              distance: dis,
            });
          }
        }
      });
      listClone.sort((a, b) => (a.distance > b.distance ? 1 : -1));
      dispatch(branchesActions.getMoreListBranch());
      setNearby(listClone);
    }
  }, [listBranch]);

  const mapRef = useRef<any>(null);
  const onPressFocusMap = () => {
    const region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef.current.animateToRegion(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.01,
        }}>
        {nearby &&
          nearby.map(e => (
            <Marker
              key={e.branch.id}
              coordinate={{
                latitude: e.branch.latitude,
                longitude: e.branch.longitude,
              }}
              title={e.branch.display_name}
              description={e.branch.address}
              icon={require('../../assets/images/logos/logo.png')}></Marker>
          ))}
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
      </MapView>
      <FlatList
        style={styles.listBranch}
        data={nearby}
        horizontal
        scrollEnabled
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          let contentOffset = e.nativeEvent.contentOffset;
          let viewSize = e.nativeEvent.layoutMeasurement;

          let pageNum = Math.floor(contentOffset.x / viewSize.width);
          setFocus(pageNum);
        }}
        renderItem={({ index, item }: any) => {
          return (
            <View style={styles.branchItem}>
              <View style={styles.branchInfo}>
                <View>
                  <Text style={styles.branchName}>
                    {item.branch.display_name}
                  </Text>
                  <Text style={styles.branchAddress}>
                    {item.distance.toFixed(2)} km
                  </Text>
                  <Text style={styles.branchStatus}>{item.branch.status}</Text>
                </View>
                <View>
                  <Image
                    style={styles.branchLogo}
                    source={
                      item.branch.logo
                        ? { uri: `${item.branch.logo.url}` }
                        : require('../../assets/images/imageVoucher.png')
                    }
                  />
                </View>
              </View>
              <View style={styles.branchAction}>
                <Button
                  style={{ marginRight: 10 }}
                  buttonColor={SystemPrimary}
                  icon="directions"
                  mode="contained"
                  onPress={() => {}}>
                  Chỉ đường
                </Button>
                <Button
                  textColor={SystemPrimary}
                  icon="menu"
                  mode="outlined"
                  onPress={() => onClickGoToDetail(item)}>
                  Menu
                </Button>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.buttomFocusMap} onPress={onPressFocusMap}>
        <Icon name="my-location" color={SystemGrey00} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttomFocusMap: {
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    bottom: 200,
    right: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 10,
  },
  bubble: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  listBranch: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
  },
  branchItem: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    borderWidth: 10,
    borderColor: 'rgba(52, 52, 52, 0.01)',
  },
  branchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  branchAction: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  branchName: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 20,
    marginBottom: 5,
  },
  branchAddress: {
    fontSize: 16,
    marginBottom: 5,
  },
  branchStatus: {
    fontWeight: 'bold',
    color: SystemGreen,
    fontSize: 16,
    marginBottom: 5,
  },
  branchLogo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
});

//make this component available to the app
export default Map;

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import SafeArea from '../Components/SafeArea';
import {Image} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../Components/Button';
import {colors, font} from '../Components/Utils/Styles/Styles';
import ResFont from '../Components/Utils/ResFont';
import {useNavigation} from '@react-navigation/native';
import {PropsNavigation} from '../@types/GlobalTypes';
import NavigationHandler from '../Services/NavigationHandler';
import {getFromStorage} from '../Services/StorageHandler';
import STORAGE from '../Components/Utils/StorageKey';
import resetStack from '../Services/NavigationHandler';
const picBack =
  'https://cdn02.plentymarkets.com/46gelrxs6k5l/item/images/12225/full/12225-Big-Sofa-Violetta-310x135-cm-Schwarz-inklus_1.jpg';
const logo =
  'https://arachid.com/assets/cache/__photo_f28a457bf72d9814661ad637146ab433.webp';
const Splash = () => {
  const navigation = useNavigation<PropsNavigation>();
  useEffect(() => {
    getTargetRoute();
  }, []);

  const getTargetRoute = async () => {
    // removeFromStorage(STORAGE.ST_PROFILE)
    // removeFromStorage(STORAGE.ST_TOKEN)
    const isLoggedIn = await getFromStorage({key: STORAGE.TOKEN});
    if (!isLoggedIn) routeTo('login');
    else {
      routeTo('drawer');
    }
  };

  const routeTo = (route: string) => {
    if (navigation?.dispatch) navigation.dispatch(resetStack(route));
  };

  return (
    <View style={[font.center, {flex: 1, backgroundColor: '#d6c8c8'}]}>
      <ActivityIndicator size="large" color={'#ffffff'} />
    </View>
  );
};
const styles = StyleSheet.create({
  login: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(5),
    marginTop: heightPercentageToDP(20),
    borderWidth: 1,
    borderColor: '#000000',
  },
  register: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(5),
    marginVertical: heightPercentageToDP(2),
    borderWidth: 1,
    borderColor: colors.primaryBrown,
  },
  logo: {
    width: widthPercentageToDP(50),
    height: heightPercentageToDP(13),
    marginTop: heightPercentageToDP(20),
  },
});
export default Splash;

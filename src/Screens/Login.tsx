import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import SafeArea from '../Components/SafeArea';
import {PropsNavigation} from '../@types/GlobalTypes';
import Button from '../Components/Button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ResFont from '../Components/Utils/ResFont';
import {colors, font} from '../Components/Utils/Styles/Styles';
import Input from '../Components/Input';
import API from '../API/Api';
import Error from '../Components/Error';
import {addToStorage} from '../Services/StorageHandler';
import STORAGE from '../Components/Utils/StorageKey';
import ModalBase from '../Components/ModalBase';
import resetStack from '../Services/NavigationHandler';
const picBack =
  'https://cdn02.plentymarkets.com/46gelrxs6k5l/item/images/12225/full/12225-Big-Sofa-Violetta-310x135-cm-Schwarz-inklus_1.jpg';
const logo =
  'https://arachid.com/assets/cache/__photo_f28a457bf72d9814661ad637146ab433.webp';
const Login = ({navigation}: any) => {
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [phoneForget, setPhoneForget] = useState('');

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgetModal, setForgetModal] = useState(false);
  const [loadingForget, setLoadingForget] = useState(false);

  const handleForget = async () => {
    try {
      setLoadingForget(true);
      setErrorMsg('');
      let data = new FormData();
      data.append('mobile', `${phoneForget}`);
      const response = await API.ForgetPass(data);
      console.log('res', JSON.stringify(response));
      setLoadingForget(false);
      navigation.navigate('changePass', {mobile: phoneForget});
    } catch (e: any) {
      setLoadingForget(false);
      setError(true);
      setErrorMsg(e?.response?.data?.message || 'خطایی رخ اده است.');
    }
  };
  const login = async () => {
    try {
      setLoadingLogin(true);
      var data = new FormData();
      data.append('mobile', `${phone}`);
      data.append('password', `${pass}`);
      console.log(data);
      const response = await API.Login(data);
      console.log('token', JSON.stringify(response?.data?.token));
      await addToStorage({key: STORAGE.TOKEN, value: response?.data?.token});
      navigation.dispatch(resetStack('drawer'));
      setLoadingLogin(false);
    } catch (e: any) {
      setLoadingLogin(false);
      setError(true);
      setErrorMsg(e?.response?.data?.message || 'خطایی رخ اده است.');
    }
  };
  return (
    <SafeArea>
      <ImageBackground
        source={{uri: picBack}}
        style={{flex: 1, alignItems: 'center'}}
        resizeMode="cover">
        <Image source={{uri: logo}} resizeMode="contain" style={styles.image} />
        <View style={styles.cart}>
          <Input
            value={phone}
            placeholder="شماره موبایل"
            keyboardType="number-pad"
            maxLength={11}
            onChange={(txt: string) => {
              setPhone(txt);
            }}
            style={{marginTop: heightPercentageToDP(0)}}
          />
          <Input
            value={pass}
            placeholder="رمز عبور"
            password
            onChange={(txt: string) => {
              setPass(txt);
            }}
            style={{
              marginTop: heightPercentageToDP(2),
            }}
          />
          <Button
            isDisable={loadingLogin || !phone || !pass}
            isLoading={loadingLogin}
            text="ورود"
            style={{
              width: widthPercentageToDP(30),
              marginTop: heightPercentageToDP(2),
            }}
            onPress={() => {
              login();
            }}
          />
          <View
            style={[
              styles.textView,
              {
                marginVertical: heightPercentageToDP(1),
              },
            ]}>
            <Text
              style={[
                font.font,
                {color: colors.black, fontSize: ResFont(1.8)},
              ]}>
              {' '}
              کنید
            </Text>

            <Text
              onPress={() => {
                navigation.navigate('register');
              }}
              style={[
                font.font,
                {color: colors.primaryBrown, fontSize: ResFont(1.8)},
              ]}>
              {' '}
              ثبت نام
            </Text>

            <Text
              style={[
                font.font,
                {color: colors.black, fontSize: ResFont(1.8)},
              ]}>
              حساب کاربری ندارید ؟
            </Text>
          </View>
          <View style={styles.textView}>
            <Text
              onPress={() => {
                setForgetModal(true);
              }}
              style={[
                font.font,
                {color: colors.primaryBrown, fontSize: ResFont(1.8)},
              ]}>
              {' '}
              بازیابی رمز عبور
            </Text>

            <Text
              style={[
                font.font,
                {color: colors.black, fontSize: ResFont(1.8)},
              ]}>
              رمز عبور خود را فراموش کرده اید؟
            </Text>
          </View>
        </View>
      </ImageBackground>
      <Error
        error={error}
        errorMsg={errorMsg}
        onRequestClose={() => {
          setError(false);
        }}
      />
      <ModalBase
        visible={forgetModal}
        onRequestClose={() => {
          setForgetModal(false);
        }}>
        <View
          style={{
            width: widthPercentageToDP(60),
            height: heightPercentageToDP(23),
            borderRadius: 10,
            backgroundColor: '#ffffff',
            alignItems: 'center',
          }}>
          <Text
            style={[
              font.font,
              {
                color: colors.black,
                fontSize: ResFont(2),
                marginTop: heightPercentageToDP(2),
              },
            ]}>
            لطفا شماره موبایل خود را وارد کنید
          </Text>
          <Input
            maxLength={11}
            keyboardType="number-pad"
            value={phoneForget}
            onChange={setPhoneForget}
            placeholder="شماره موبایل"
            style={{marginTop: heightPercentageToDP(2)}}
          />
          <Button
            isDisable={loadingForget || !phoneForget}
            isLoading={loadingForget}
            text="بازیابی رمز عبور"
            onPress={() => {
              handleForget();
            }}
            style={{
              width: widthPercentageToDP(30),
              marginTop: heightPercentageToDP(2),
            }}
          />
        </View>
      </ModalBase>
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  image: {
    width: widthPercentageToDP(50),
    height: heightPercentageToDP(13),
    marginTop: heightPercentageToDP(20),
    borderRadius: 10,
  },
  cart: {
    width: widthPercentageToDP(65),
    paddingVertical: heightPercentageToDP(3),
    borderRadius: 10,
    backgroundColor: '#ffffffc1',
    shadowColor: '#7245216a',
    elevation: 10,
    alignItems: 'center',
    marginTop: heightPercentageToDP(5),
  },
  textView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: widthPercentageToDP(2),
  },
});

export default Login;

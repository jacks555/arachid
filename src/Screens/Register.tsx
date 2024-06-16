import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
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
import ModalBase from '../Components/ModalBase';
import Error from '../Components/Error';
import LinearGradient from 'react-native-linear-gradient';
const picBack =
  'https://cdn02.plentymarkets.com/46gelrxs6k5l/item/images/12225/full/12225-Big-Sofa-Violetta-310x135-cm-Schwarz-inklus_1.jpg';
const logo =
  'https://arachid.com/assets/cache/__photo_f28a457bf72d9814661ad637146ab433.webp';
const Register = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [brand, setBrand] = useState('');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [repeat, setRepeat] = useState('');

  const [loadingRegister, setLoadingRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState(false);

  const register = async () => {
    try {
      setLoadingRegister(true);
      setErrorMsg('');
      var data = new FormData();
      data.append('first_name', `${name}`);
      data.append('last_name', `${lastName}`);
      data.append('brand', `${brand}`);
      data.append('mobile', `${phone}`);
      data.append('seller_marketer_code', `${code}`);
      data.append('password', `${pass}`);
      data.append('password_confirmation', `${repeat}`);
      console.log(data);
      const response = await API.Register(data);
      console.log('res', JSON.stringify(response));
      setLoadingRegister(false);
      navigation.navigate('verify', {mobile: phone});
    } catch (e: any) {
      setLoadingRegister(false);
      console.log(e?.response?.data);
      console.log(e?.response?.status);
      console.log(e?.response?.headers);
      console.log(e?.response);

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
        <ScrollView style={{flex: 1}}>
          <LinearGradient
            colors={[
              colors.primaryBrown,
              colors.black,
              colors.primaryBrown,
              colors.black,
              colors.primaryBrown,
            ]}
            style={{
              width: widthPercentageToDP(40),
              height: heightPercentageToDP(13),
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={{uri: logo}}
              resizeMode="contain"
              style={styles.image}
            />
          </LinearGradient>
          <View style={styles.cart}>
            <Text
              style={[
                font.font,
                {
                  color: colors.black,
                  fontSize: ResFont(1.8),
                  marginRight: widthPercentageToDP(2),
                  alignSelf: 'flex-end',
                },
              ]}>
              {' '}
              نام و نام خانوادگی خود را وارد کنید
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: heightPercentageToDP(1.5),
              }}>
              <Input
                placeholder="نام خانوادگی"
                value={lastName}
                onChange={setLastName}
                style={{
                  marginRight: widthPercentageToDP(3),
                }}
                inputStyle={{width: widthPercentageToDP(35)}}
              />
              <Input
                placeholder="نام"
                value={name}
                onChange={setName}
                inputStyle={{width: widthPercentageToDP(25)}}
              />
            </View>
            <Text
              style={[
                font.font,
                {
                  color: colors.black,
                  fontSize: ResFont(1.8),
                  marginRight: widthPercentageToDP(2),
                  marginTop: heightPercentageToDP(1.5),
                  alignSelf: 'flex-end',
                },
              ]}>
              {' '}
              شماره موبایل خود را وارد کنید
            </Text>
            <Input
              value={phone}
              onChange={setPhone}
              maxLength={11}
              keyboardType="number-pad"
              placeholder="شماره موبایل"
              style={{marginTop: heightPercentageToDP(1.5)}}
            />
            <Text
              style={[
                font.font,
                {
                  color: colors.black,
                  fontSize: ResFont(1.8),
                  marginRight: widthPercentageToDP(2),
                  marginTop: heightPercentageToDP(1.5),
                  alignSelf: 'flex-end',
                },
              ]}>
              {' '}
              نام شرکت، برند یا فروشگاه خود را وارد کنید
            </Text>
            <Input
              value={brand}
              onChange={setBrand}
              // maxLength={11}
              placeholder="نام شرکت، برند یا فروشگاه"
              style={{
                marginTop: heightPercentageToDP(1.5),
              }}
              inputStyle={{width: widthPercentageToDP(45)}}
            />
            <Text
              style={[
                font.font,
                {
                  color: colors.black,
                  fontSize: ResFont(1.8),
                  marginRight: widthPercentageToDP(2),
                  marginTop: heightPercentageToDP(1.5),
                  alignSelf: 'flex-end',
                },
              ]}>
              {' '}
              اگر معرف یا بازاریاب داشته‌اید، کد ایشان را وارد کنید
            </Text>
            <Input
              value={code}
              keyboardType="number-pad"
              onChange={setCode}
              placeholder="کد معرف یا بازاریاب"
              style={{marginTop: heightPercentageToDP(1.5)}}
            />
            <Text
              style={[
                font.font,
                {
                  color: colors.black,
                  fontSize: ResFont(1.8),
                  marginRight: widthPercentageToDP(2),
                  marginTop: heightPercentageToDP(1.5),
                  alignSelf: 'flex-end',
                },
              ]}>
              {' '}
              رمز عبور دلخواه خود را وارد کنید
            </Text>
            <Input
              value={pass}
              onChange={setPass}
              password
              // maxLength={11}
              placeholder="رمز عبور"
              style={{marginTop: heightPercentageToDP(1.5)}}
            />
            <Text
              style={[
                font.font,
                {
                  color: colors.black,
                  fontSize: ResFont(1.8),
                  marginRight: widthPercentageToDP(2),
                  marginTop: heightPercentageToDP(1.5),
                  alignSelf: 'flex-end',
                },
              ]}>
              {' '}
              مجددا رمز عبور را وارد کنید
            </Text>
            <Input
              value={repeat}
              onChange={setRepeat}
              password
              // maxLength={11}
              placeholder="تکرار رمز عبور"
              style={{marginTop: heightPercentageToDP(1.5)}}
            />
            <Button
              isLoading={loadingRegister}
              isDisable={
                loadingRegister ||
                !name ||
                !lastName ||
                !phone ||
                !repeat ||
                !brand ||
                !pass
              }
              text="ثبت نام"
              style={{
                width: widthPercentageToDP(30),
                marginTop: heightPercentageToDP(2),
              }}
              onPress={() => {
                register();
              }}
            />
            <View style={styles.textView}>
              <Text
                onPress={() => {
                  navigation.navigate('login');
                }}
                style={[
                  font.font,
                  {color: colors.primaryBrown, fontSize: ResFont(1.8)},
                ]}>
                {' '}
                وارد شوید
              </Text>

              <Text
                style={[
                  font.font,
                  {color: colors.black, fontSize: ResFont(1.8)},
                ]}>
                حساب کاربری دارید ؟
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      <Error
        error={error}
        errorMsg={errorMsg}
        onRequestClose={() => {
          setError(false);
        }}
      />
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  image: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(13),

    borderRadius: 10,
    alignSelf: 'center',
  },
  cart: {
    width: widthPercentageToDP(75),
    paddingVertical: heightPercentageToDP(3),
    borderRadius: 10,
    backgroundColor: '#ffffffc1',
    shadowColor: '#7245216a',
    elevation: 10,
    alignItems: 'center',
    marginTop: heightPercentageToDP(1.5),
  },
  textView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(2),
  },
});

export default Register;

import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import CodeInput from 'react-native-confirmation-code-input';
import ModalBase from '../Components/ModalBase';
import {addToStorage} from '../Services/StorageHandler';
import STORAGE from '../Components/Utils/StorageKey';
import resetStack from '../Services/NavigationHandler';
const picBack =
  'https://cdn02.plentymarkets.com/46gelrxs6k5l/item/images/12225/full/12225-Big-Sofa-Violetta-310x135-cm-Schwarz-inklus_1.jpg';
const logo =
  'https://arachid.com/assets/cache/__photo_f28a457bf72d9814661ad637146ab433.webp';
const Verify = ({navigation, route}: any) => {
  const mobile = route?.params?.mobile;
  // console.log('verified phone:', mobile);
  const [code, setCode] = useState('');
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [counter, setCounter] = useState(120);
  const [start, setStart] = useState(false);
  const [modalResend, setModalResend] = useState(false);

  const resendCode = async () => {
    if (!start) {
      try {
        setErrorMsg('');
        setModalResend(true);
        let data = new FormData();
        data.append('mobile', `${mobile}`);
        const response = await API.ReSendCode(data);
        setStart(true);
        setCounter(120);
        console.log('res', JSON.stringify(response));
        setModalResend(false);
      } catch (e: any) {
        setModalResend(false);
        setError(true);
        setErrorMsg(e?.response?.data?.message || 'خطایی رخ اده است.');
      }
    }
  };

  const timerCode = async () => {
    let timer: NodeJS.Timeout;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(c => c - 1), 1000);
    } else {
      setStart(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
        console.log(timer);
      }
    };
  };
  useEffect(() => {
    if (start) timerCode();
  }, [counter, start]);
  const padTime = (time: number) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };
  const format = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${padTime(seconds)}`;
  };
  const verify = async () => {
    try {
      setLoadingVerify(true);
      setErrorMsg('');
      var data = new FormData();
      data.append('mobile', `${mobile}`);
      data.append('code', `${code}`);

      console.log(data);
      const response = await API.ConfirmRegister(data);
      console.log('token', JSON.stringify(response?.data?.token));
      await addToStorage({key: STORAGE.TOKEN, value: response?.data?.token});
      navigation.dispatch(resetStack('drawer'));
      setLoadingVerify(false);
    } catch (e: any) {
      setLoadingVerify(false);

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
          <CodeInput
            codeLength={4}
            containerStyle={{
              marginBottom: heightPercentageToDP(5),
              marginTop: 0,
            }}
            codeInputStyle={[
              font.font,
              {
                backgroundColor: colors.primaryBrown,
                borderColor: colors.black,
                borderRadius: 10,
                borderWidth: 0.5,
              },
            ]}
            onFulfill={(code: string) => {
              setCode(code);
            }}
          />
          <Button
            isDisable={loadingVerify || !code}
            isLoading={loadingVerify}
            text="تایید"
            style={{
              width: widthPercentageToDP(30),
              marginTop: heightPercentageToDP(3),
            }}
            onPress={() => {
              verify();
            }}
          />

          <View style={styles.textView}>
            {
              <Text
                onPress={() => {
                  resendCode();
                }}
                style={[
                  font.font,
                  {color: colors.primaryBrown, fontSize: ResFont(1.8)},
                ]}>
                {'  '}
                {start ? format(counter) : 'ارسال مجدد کد'}
                {'  '}
              </Text>
            }

            <Text
              style={[
                font.font,
                {color: colors.black, fontSize: ResFont(1.8)},
              ]}>
              کد دریافت نکردید؟
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
        visible={modalResend}
        onRequestClose={() => {
          setModalResend(false);
        }}>
        <ActivityIndicator size={'large'} color={'#ffffff'} />
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
    marginTop: heightPercentageToDP(2),
  },
});

export default Verify;

import {
  View,
  Text,
  Pressable,
  Image as Image2,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import SafeArea from '../Components/SafeArea';
import Header from '../Components/Header';
import {Dropdown} from 'react-native-element-dropdown';
import {getAllKeys, getFromStorage} from '../Services/StorageHandler';
import STORAGE from '../Components/Utils/StorageKey';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// @ts-ignore
import Icon2 from 'react-native-vector-icons/dist/Entypo';

import ResFont from '../Components/Utils/ResFont';
import TextInputRequired from '../Components/TextInputRequired';
import {colors, font} from '../Components/Utils/Styles/Styles';
import API from '../API/Api';
import Mapbox, {MapView, UserLocation, Camera} from '@rnmapbox/maps';
import Error from '../Components/Error';
import Loading from '../Components/Loading';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {PermissionsAndroid} from 'react-native';
import {useLayoutAnimation} from '../Components/Utils/Animation';
import Button from '../Components/Button';
import ModalBase from '../Components/ModalBase';
import {useDispatch, useSelector} from 'react-redux';
import getprof from '../Actions/get_profile';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiamFja3M1NTUiLCJhIjoiY2x3dDB2NDB1MDFwZjJrczNqcGp0dzE5eCJ9.R9_2wJLMsOWccoFoMz0kxQ',
);

const CompleteProfileHome = ({navigation}: any) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState('');
  const [gotImage, setGotImage] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [provinceCities, setProvinceCities] = useState(null);
  const [provinces, setProvinces] = useState<any>();
  const [cities, setCities] = useState<any>();
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [phone, setPhone] = useState('');
  const [initialPhone, setInitialPhone] = useState('');
  const [address, setAddress] = useState('');
  const [codePosti, setCodePosti] = useState('');
  const [code, setCode] = useState('');
  const [firstPage, setFirstPage] = useState(true);
  const [province, setProvince] = useState<{label?: string; value?: string}>({
    label: '',
    value: '',
  });
  const [city, setCity] = useState<{label?: string; value?: string}>({
    label: '',
    value: '',
  });
  const [base, setBase] = useState<Image>();
  const [manager, setManager] = useState('');
  const [brand, setBrand] = useState('');
  const [base2, setBase2] = useState<Image>();
  const [gotImage2, setGotImage2] = useState(false);
  const [about, setAbout] = useState('');
  const [phone2, setPhone2] = useState('');
  const [web, setWeb] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');
  const [instagram, setInstagram] = useState('');
  const [eta, setEta] = useState('');
  const [bale, setBale] = useState('');
  const [sourush, setSourush] = useState('');
  const [national, setNational] = useState<Image>();
  const [license, setLicense] = useState<Image>();
  const [gotImage3, setGotImage3] = useState(false);
  const [gotImage4, setGotImage4] = useState(false);
  const [coords, setCoords] = useState<any>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);

  const image =
    'https://th.bing.com/th/id/OIP.4cmK9d36bF0F7-V-SaVPnAHaG_?rs=1&pid=ImgDetMain';

  const getStorage = useCallback(async () => {
    try {
      setErrorMsg('');
      setLoading(true);
      let data = await getFromStorage({key: STORAGE.TOKEN, defaultValue: null});
      console.log('token', data);
      setToken(data);
      setLoading(false);
    } catch (e) {
      setError(true);
      setErrorMsg('خطا');
      setLoading(false);
    }
  }, []);
  const submit = async () => {
    try {
      setSubmitLoading(true);
      setErrorMsg('');
      if (phone != initialPhone) {
        let codeResult = await API.DashboardSubmitCode(phone, code);
        console.log('code Result:', codeResult);
      }
      let data = new FormData();
      data.append('first_name', `${name}`);
      data.append('last_name', `${lastName}`);
      data.append('emergency_phone', `${emergencyPhone}`);
      data.append('province_id', `${province?.value}`);
      data.append('city_id', `${city?.value}`);
      data.append('address', `${address}`);
      data.append('postal_code', `${codePosti}`);
      data.append('manager_name', `${manager}`);
      data.append('brand', `${brand}`);
      data.append('bio', `${about}`);
      data.append('phone', `${phone}`);
      data.append('phone2', `${phone2}`);
      data.append('lat', `${coords ? coords[1] : ''}`);
      data.append('lng', `${coords ? coords[0] : ''}`);
      data.append('website', `${web}`);
      data.append('whatsapp', `${whatsapp}`);
      data.append('instagram', `${instagram}`);
      data.append('telegram', `${telegram}`);
      data.append('eitaa', `${eta}`);
      data.append('bale', `${bale}`);
      data.append('soroush', `${sourush}`);
      data.append('photo', {
        uri: `${base?.path}`,
        type: `${base?.mime}`,
        name: 'image.jpg',
      });
      data.append('logo', {
        uri: `${base2?.path}`,
        type: `${base2?.mime}`,
        name: 'image.jpg',
      });
      data.append('national_card', {
        uri: `${national?.path}`,
        type: `${national?.mime}`,
        name: 'image.jpg',
      });
      data.append('business_license', {
        uri: `${license?.path}`,
        type: `${license?.mime}`,
        name: 'image.jpg',
      });

      let result = await API.UpdateDashboard(data);
      console.log('whatsa??', JSON.stringify(result));
      getprof(dispatch);
      navigation.navigate('home');
      setSubmitLoading(false);
    } catch (e: any) {
      setError(true);
      setSubmitLoading(false);
      setErrorMsg(e?.response?.data?.message || 'خطایی رخ اده است.');
      console.log('error:', e);
    }
  };
  const sendcode = async () => {
    try {
      setCodeLoading(true);
      setErrorMsg('');
      let data = await API.GetVerifyCode(phone);
      console.log(data);
      setCodeLoading(false);
    } catch (e: any) {
      setError(true);
      setCodeLoading(false);
      setErrorMsg(e?.response?.data?.message || 'خطایی رخ اده است.');
      console.log('error:', e);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Permission',
          message: 'App needs access to your Location ' + '.',
          buttonPositive: 'Grant Access',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }

      await getprof(dispatch);

      const data = await API.Dashboard();
      console.log('???', data?.data?.user_info?.photo);
      setName(data?.data?.user_info?.first_name);
      setLastName(data?.data?.user_info?.last_name);
      setPhone(data?.data?.user_info?.mobile);
      setInitialPhone(data?.data?.user_info?.mobile);

      setProvinceCities(data?.data?.provinces);
      let provs: any = [];
      console.log('????', provs, provinceCities);
      data?.data?.provinces.map((item: any) => {
        provs.push({label: item?.name, value: item?.id});
      });

      if (data?.data?.profile_completed) await navigation.navigate('home');
      setProvinces([...provs]);
      setLoading(false);
    } catch (e: any) {
      setError(true);
      setLoading(false);
      setErrorMsg(e?.response?.data?.message || 'خطایی رخ اده است.');
      console.log('error:', e);
    }
  };
  const provinceSelect = (item: {label: string; value: string}) => {
    let province = provinceCities.filter((item1: any) => {
      return item1?.id == item?.value;
    });
    let data: any = [];
    province[0]?.cities.map((item2: any) => {
      data.push({label: item2?.name, value: item2?.id});
    });
    setProvince(item);
    setCities([...data]);
    console.log('??????', cities, province);
  };
  const onPhoneChange = (txt: string) => {
    useLayoutAnimation();
    setPhone(txt);
  };
  useEffect(() => {
    // getStorage();
    fetchData();
  }, []);
  if (loading) return <Loading />;
  return (
    <SafeArea style={{flex: 1, backgroundColor: '#faf6f1'}}>
      {
        <ScrollView style={{flex: 1}}>
          <View style={{backgroundColor: '#1dbb4247'}}>
            <Text
              style={[
                font.font,
                {
                  fontSize: ResFont(2.4),
                  color: '#155724',
                  alignSelf: 'center',
                },
              ]}>
              لطفا پروفایل خود را تکمیل نمایید.
            </Text>
          </View>
          {firstPage ? (
            <View>
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  padding: ResFont(3),
                  paddingTop: ResFont(1.5),
                  borderRadius: 10,
                  elevation: 10,
                  marginVertical: ResFont(2.5),
                  shadowColor: '#00000081',
                }}>
                <Text
                  style={[
                    font.font,
                    {
                      fontSize: ResFont(2.4),
                      color: colors.black,
                      alignSelf: 'flex-end',
                    },
                  ]}>
                  اطلاعات شخصی
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <View style={{marginRight: ResFont(7)}}>
                    <TextInputRequired
                      value={name}
                      onChange={setName}
                      title="نام (الزامی)"
                      placeholder="نام"
                      placeholderColor={colors.textGray}
                      mainStyle={{marginBottom: ResFont(2)}}
                    />
                    <TextInputRequired
                      value={lastName}
                      onChange={setLastName}
                      placeholderColor={colors.textGray}
                      title="نام خانوادگی (الزامی)"
                      placeholder="نام خانوادگی"
                    />
                  </View>
                  <Pressable
                    onPress={() => {
                      ImagePicker.openPicker({
                        cropping: true,
                        includeBase64: true,
                        height: ResFont(15),
                        width: ResFont(12),
                      }).then(image => {
                        setBase(image);
                        setGotImage(true);
                        console.log('image:', image);
                      });
                    }}
                    style={{
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {gotImage ? (
                      <Image2
                        resizeMode="contain"
                        style={{
                          width: ResFont(12),
                          height: ResFont(15),
                          alignSelf: 'center',
                        }}
                        source={{
                          uri: base
                            ? `data:${base?.mime};base64,${base?.data}`
                            : image,
                        }}
                      />
                    ) : (
                      <Icon
                        name="file-image-plus-outline"
                        style={{fontSize: ResFont(15)}}
                      />
                    )}
                    <Text
                      numberOfLines={2}
                      style={[
                        font.font,
                        {
                          fontSize: ResFont(2.2),
                          width: ResFont(15),
                          textAlign: 'center',
                        },
                      ]}>
                      عکس پروفایل (الزامی)
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  padding: ResFont(3),
                  paddingTop: ResFont(1.5),
                  borderRadius: 10,
                  elevation: 10,
                  marginVertical: ResFont(2.5),
                  shadowColor: '#00000081',
                }}>
                <Text
                  style={[
                    font.font,
                    {
                      fontSize: ResFont(2.4),
                      color: colors.black,
                      alignSelf: 'flex-end',
                    },
                  ]}>
                  اطلاعات تماس{' '}
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <TextInputRequired
                      value={emergencyPhone}
                      onChange={txt => {
                        setEmergencyPhone(txt);
                      }}
                      title="شماره تلفن اضطراری (الزامی)"
                      placeholder="شماره تلفن اظطراری"
                      placeholderColor={colors.textGray}
                      keyboardType="number-pad"
                    />
                    <TextInputRequired
                      title="شماره موبایل (الزامی)"
                      placeholder="شماره موبایل بدون کد"
                      placeholderColor={colors.textGray}
                      value={phone}
                      onChange={txt => {
                        onPhoneChange(txt);
                      }}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
                {phone == initialPhone ? null : (
                  <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        marginRight: widthPercentageToDP(2.5),
                      }}>
                      <Text
                        style={[
                          font.font,
                          {
                            fontSize: ResFont(1.8),
                            width: widthPercentageToDP(35),
                            textAlign: 'right',
                            color: colors.redError,
                          },
                        ]}>
                        ( تغییر شماره موبایل نیاز به تایید هویت مجدد دارد )
                      </Text>
                      <Pressable
                        onPress={() => {
                          sendcode();
                        }}>
                        <Text
                          style={[
                            font.font,
                            {fontSize: ResFont(2.1), color: 'blue'},
                          ]}>
                          دریافت کد تایید
                        </Text>
                      </Pressable>
                    </View>
                    <TextInputRequired
                      title="کد تایید"
                      placeholder="کد تایید"
                      placeholderColor={colors.textGray}
                      value={code}
                      onChange={txt => {
                        setCode(txt);
                      }}
                      keyboardType="number-pad"
                    />
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    justifyContent: 'space-around',
                    marginTop: heightPercentageToDP(0.5),
                  }}>
                  <View style={{marginRight: ResFont(2.5)}}>
                    <Text
                      style={[
                        font.font,
                        {
                          color: colors.textGray,
                          fontSize: ResFont(2.2),
                          textAlign: 'right',
                          marginBottom: ResFont(0.5),
                        },
                      ]}>
                      شهر (الزامی)
                    </Text>
                    <Dropdown
                      disable={!cities}
                      style={[
                        {
                          width: ResFont(23),
                          paddingRight: ResFont(3),
                          borderWidth: 1,
                          borderColor: colors.primaryBrown,
                          borderRadius: 10,
                        },
                      ]}
                      renderLeftIcon={() => (
                        <Icon
                          name="chevron-down"
                          style={{fontSize: ResFont(4)}}
                        />
                      )}
                      renderRightIcon={() => null}
                      mode="modal"
                      placeholderStyle={[
                        font.fontLight,
                        {fontSize: ResFont(2.2), color: colors.textGray},
                      ]}
                      selectedTextStyle={[font.font, {fontSize: ResFont(2.2)}]}
                      inputSearchStyle={[
                        font.font,
                        {textAlign: 'center', fontSize: ResFont(2.4)},
                      ]}
                      //   iconStyle={styles.iconStyle}

                      data={cities ? cities : []}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={'انتخاب کنید'}
                      searchPlaceholder="جستجو کنید"
                      value={cities?.value}
                      onChange={(item: any) => {
                        setCity(item);
                      }}
                    />
                  </View>

                  <View>
                    <Text
                      style={[
                        font.font,
                        {
                          color: colors.textGray,
                          fontSize: ResFont(2.2),
                          textAlign: 'right',
                          marginBottom: ResFont(0.5),
                        },
                      ]}>
                      استان (الزامی)
                    </Text>
                    <Dropdown
                      disable={!provinces}
                      style={[
                        {
                          width: ResFont(23),
                          paddingRight: ResFont(3),
                          borderWidth: 1,
                          borderColor: colors.primaryBrown,
                          borderRadius: 10,
                        },
                      ]}
                      renderLeftIcon={() => (
                        <Icon
                          name="chevron-down"
                          style={{fontSize: ResFont(4)}}
                        />
                      )}
                      renderRightIcon={() => null}
                      mode="modal"
                      placeholderStyle={[
                        font.fontLight,
                        {fontSize: ResFont(2.2), color: colors.textGray},
                      ]}
                      selectedTextStyle={[font.font, {fontSize: ResFont(2.2)}]}
                      inputSearchStyle={[
                        font.font,
                        {textAlign: 'center', fontSize: ResFont(2.4)},
                      ]}
                      //   iconStyle={styles.iconStyle}

                      data={provinces ? provinces : []}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={'انتخاب کنید'}
                      searchPlaceholder="جستجو کنید"
                      value={province?.value}
                      onChange={(item: {value: string; label: string}) => {
                        provinceSelect(item);
                      }}
                    />
                  </View>
                </View>

                <TextInputRequired
                  value={address}
                  onChange={txt => {
                    setAddress(txt);
                  }}
                  title="آدرس (الزامی)"
                  placeholder="نام محله، نام خیابان و ..."
                  placeholderColor={colors.textGray}
                  inputStyle={{width: widthPercentageToDP(70)}}
                  mainStyle={{
                    alignSelf: 'flex-end',
                    marginTop: heightPercentageToDP(0.5),
                  }}
                />

                <TextInputRequired
                  title="کد پستی (الزامی)"
                  placeholder="کد پستی"
                  placeholderColor={colors.textGray}
                  value={codePosti}
                  onChange={txt => {
                    setCodePosti(txt);
                  }}
                  keyboardType="number-pad"
                  mainStyle={{
                    alignSelf: 'flex-end',
                    marginTop: heightPercentageToDP(0.5),
                  }}
                />
              </View>

              {province && city && address && (
                <View
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <Icon2
                    name="location-pin"
                    style={{
                      position: 'absolute',
                      fontSize: ResFont(5.5),
                      color: '#ff0000',

                      zIndex: 2,
                      marginTop: 20,
                    }}
                  />
                  <MapView
                    requestDisallowInterceptTouchEvent={true}
                    attributionEnabled={false}
                    scaleBarEnabled={false}
                    //  compassEnabled={true}
                    logoEnabled={false}
                    rotateEnabled={false}
                    onCameraChanged={item => {
                      console.log('fuck', item);
                      setCoords(item?.properties?.center);
                    }}
                    style={{
                      width: widthPercentageToDP(80),
                      height: heightPercentageToDP(25),
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}>
                    <Camera
                      zoomLevel={17}
                      /// centerCoordinate={[49.58291135000002, 37.29266994]}
                      followZoomLevel={17}
                      followUserLocation
                      defaultSettings={{
                        centerCoordinate: [
                          49.81678680814284, 36.037208589416274,
                        ],
                      }}
                    />
                    <UserLocation
                      onUpdate={item => {
                        console.log('userr', item);
                      }}
                      visible={true}
                      androidRenderMode="normal"
                    />
                  </MapView>
                </View>
              )}
              <Button
                onPress={() => {
                  setFirstPage(false);
                }}
                text="بعدی"
                style={{
                  width: widthPercentageToDP(30),
                  marginVertical: heightPercentageToDP(2),
                }}
              />
            </View>
          ) : (
            <View>
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  padding: ResFont(3),
                  paddingTop: ResFont(1.5),
                  borderRadius: 10,
                  elevation: 10,
                  marginVertical: ResFont(2.5),
                  shadowColor: '#00000081',
                }}>
                <Text
                  style={[
                    font.font,
                    {
                      fontSize: ResFont(2.4),
                      color: colors.black,
                      alignSelf: 'flex-end',
                    },
                  ]}>
                  درباره لوگو
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <View style={{marginRight: ResFont(7)}}>
                    <TextInputRequired
                      value={brand}
                      onChange={setBrand}
                      title=" نام شرکت، برند یا فروشگاه (الزامی) "
                      placeholder=" نام شرکت، برند یا فروشگاه  "
                      placeholderColor={colors.textGray}
                      inputStyle={{width: widthPercentageToDP(45)}}
                      mainStyle={{marginBottom: ResFont(2)}}
                    />
                    <TextInputRequired
                      value={manager}
                      onChange={setManager}
                      placeholderColor={colors.textGray}
                      inputStyle={{width: widthPercentageToDP(45)}}
                      title=" نام مدیر یا رابط (الزامی) "
                      placeholder=" نام مدیر یا رابط  "
                    />
                  </View>
                  <Pressable
                    onPress={() => {
                      ImagePicker.openPicker({
                        cropping: true,
                        includeBase64: true,
                        height: ResFont(15),
                        width: ResFont(12),
                      }).then(image => {
                        setBase2(image);
                        setGotImage2(true);
                        console.log('image:', image);
                      });
                    }}
                    style={{
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {gotImage2 ? (
                      <Image2
                        resizeMode="contain"
                        style={{
                          width: ResFont(12),
                          height: ResFont(15),
                          alignSelf: 'center',
                        }}
                        source={{
                          uri: base2
                            ? `data:${base2?.mime};base64,${base2?.data}`
                            : image,
                        }}
                      />
                    ) : (
                      <Icon
                        name="file-image-plus-outline"
                        style={{fontSize: ResFont(15)}}
                      />
                    )}
                    <Text
                      numberOfLines={2}
                      style={[
                        font.font,
                        {
                          fontSize: ResFont(2.2),
                          width: ResFont(15),
                          textAlign: 'center',
                        },
                      ]}>
                      لوگو (الزامی)
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    width: widthPercentageToDP(80),
                    height: 0.5,
                    backgroundColor: colors.black,
                    alignSelf: 'center',
                    marginVertical: heightPercentageToDP(2),
                  }}
                />
                <TextInputRequired
                  value={about}
                  onChange={setAbout}
                  multiline
                  placeholderColor={colors.textGray}
                  inputStyle={{
                    width: widthPercentageToDP(80),
                    height: heightPercentageToDP(12),
                  }}
                  title="درباره ما (الزامی)"
                  placeholder="مختصری درباره‌ی خود بنویسید تا کاربران شما را بهتر بشناسند"
                  mainStyle={{alignSelf: 'flex-end'}}
                />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  padding: ResFont(3),
                  paddingTop: ResFont(1.5),
                  borderRadius: 10,
                  elevation: 10,
                  marginVertical: ResFont(2.5),
                  shadowColor: '#00000081',
                }}>
                <Text
                  style={[
                    font.font,
                    {
                      fontSize: ResFont(2.4),
                      color: colors.black,
                      alignSelf: 'flex-end',
                    },
                  ]}>
                  اطلاعات تماس{' '}
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <TextInputRequired
                    value={phone2}
                    onChange={txt => {
                      setPhone2(txt);
                    }}
                    title="
                      شماره تلفن ثابت
                      "
                    placeholder="
                      شماره تلفن ثابت
                      "
                    keyboardType="number-pad"
                    mainStyle={{alignSelf: 'center'}}
                    placeholderColor={colors.textGray}
                  />

                  <TextInputRequired
                    value={web}
                    onChange={txt => {
                      setWeb(txt);
                    }}
                    title="
                    آدرس وب‌سایت
                    "
                    placeholder="http://DomainName.com"
                    placeholderColor={colors.textGray}
                    inputStyle={{width: widthPercentageToDP(70)}}
                    mainStyle={{
                      alignSelf: 'flex-end',
                      marginTop: heightPercentageToDP(0.5),
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: heightPercentageToDP(0.5),
                      alignSelf: 'flex-end',
                    }}>
                    <TextInputRequired
                      value={whatsapp}
                      onChange={txt => {
                        setWhatsapp(txt);
                      }}
                      title="شماره واتساپ"
                      placeholder="989121111111"
                      placeholderColor={colors.textGray}
                      mainStyle={{marginRight: widthPercentageToDP(2.5)}}
                    />
                    <TextInputRequired
                      title="
                      شناسه تلگرام
                      "
                      placeholder="Arachid"
                      placeholderColor={colors.textGray}
                      value={telegram}
                      onChange={txt => {
                        setTelegram(txt);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: heightPercentageToDP(0.5),
                      alignSelf: 'flex-end',
                    }}>
                    <TextInputRequired
                      title="
                      شناسه ایتا
                      "
                      placeholder="
                      شناسه ایتا
                      "
                      placeholderColor={colors.textGray}
                      value={eta}
                      inputStyle={{width: widthPercentageToDP(25)}}
                      mainStyle={{marginRight: widthPercentageToDP(2.5)}}
                      onChange={txt => {
                        setEta(txt);
                      }}
                    />
                    <TextInputRequired
                      value={instagram}
                      onChange={txt => {
                        setInstagram(txt);
                      }}
                      title="
                      شناسه صفحه اینستاگرام
                      "
                      placeholder="https://www.instagram.com/page_id"
                      placeholderColor={colors.textGray}
                      inputStyle={{
                        width: widthPercentageToDP(45),
                        fontSize: ResFont(1.7),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: heightPercentageToDP(0.5),
                      alignSelf: 'flex-end',
                    }}>
                    <TextInputRequired
                      value={bale}
                      onChange={txt => {
                        setBale(txt);
                      }}
                      title="
                      شناسه بله
                      "
                      placeholder="
                      شناسه بله
                      "
                      placeholderColor={colors.textGray}
                      mainStyle={{marginRight: widthPercentageToDP(2.5)}}
                    />
                    <TextInputRequired
                      title="
                      شناسه سروش
                      "
                      placeholder="
                      شناسه سروش
                      "
                      placeholderColor={colors.textGray}
                      value={sourush}
                      onChange={txt => {
                        setSourush(txt);
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  padding: ResFont(3),
                  paddingTop: ResFont(1.5),
                  borderRadius: 10,
                  elevation: 10,
                  marginVertical: ResFont(2.5),
                  shadowColor: '#00000081',
                }}>
                <Text
                  style={[
                    font.font,
                    {
                      fontSize: ResFont(2.4),
                      color: colors.black,
                      alignSelf: 'flex-end',
                    },
                  ]}>
                  مدارک هویتی{' '}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    width: widthPercentageToDP(75),
                  }}>
                  <Pressable
                    onPress={() => {
                      ImagePicker.openPicker({
                        cropping: true,
                        includeBase64: true,
                        height: ResFont(15),
                        width: ResFont(12),
                      }).then(image => {
                        setLicense(image);
                        setGotImage3(true);
                        console.log('image:', image);
                      });
                    }}
                    style={{
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {gotImage3 ? (
                      <Image2
                        resizeMode="contain"
                        style={{
                          width: ResFont(12),
                          height: ResFont(15),
                          alignSelf: 'center',
                        }}
                        source={{
                          uri: license
                            ? `data:${license?.mime};base64,${license?.data}`
                            : image,
                        }}
                      />
                    ) : (
                      <Icon
                        name="cloud-upload-outline"
                        style={{fontSize: ResFont(15), color: colors.textGray}}
                      />
                    )}
                    <Text
                      numberOfLines={2}
                      style={[
                        font.font,
                        {
                          fontSize: ResFont(2.2),
                          width: ResFont(15),
                          textAlign: 'center',
                        },
                      ]}>
                      تصویر پروانه کسب و کار
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      ImagePicker.openPicker({
                        cropping: true,
                        includeBase64: true,
                        height: ResFont(15),
                        width: ResFont(12),
                      }).then(image => {
                        setNational(image);
                        setGotImage4(true);
                        console.log('image:', image);
                      });
                    }}
                    style={{
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {gotImage4 ? (
                      <Image2
                        resizeMode="contain"
                        style={{
                          width: ResFont(12),
                          height: ResFont(15),
                          alignSelf: 'center',
                        }}
                        source={{
                          uri: national
                            ? `data:${national?.mime};base64,${national?.data}`
                            : image,
                        }}
                      />
                    ) : (
                      <Icon
                        name="cloud-upload-outline"
                        style={{fontSize: ResFont(15), color: colors.textGray}}
                      />
                    )}
                    <Text
                      numberOfLines={2}
                      style={[
                        font.font,
                        {
                          fontSize: ResFont(2.2),
                          width: ResFont(15),
                          textAlign: 'center',
                        },
                      ]}>
                      تصویر کارت ملی (الزامی)
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: widthPercentageToDP(80),
                  alignSelf: 'center',
                  justifyContent: 'space-around',
                }}>
                <Button
                  isDisable={submitLoading}
                  isLoading={submitLoading}
                  onPress={() => {
                    submit();
                  }}
                  text="ثبت"
                  style={{
                    width: widthPercentageToDP(30),
                    marginVertical: heightPercentageToDP(2),
                    borderColor: colors.primaryBrown,
                    backgroundColor: colors.black,
                  }}
                />
                <Button
                  onPress={() => {
                    setFirstPage(true);
                  }}
                  text="قبلی"
                  style={{
                    width: widthPercentageToDP(30),
                    marginVertical: heightPercentageToDP(2),
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      }
      <Error
        error={error}
        errorMsg={errorMsg}
        onRequestClose={() => {
          setError(false);
        }}
      />
      <ModalBase
        visible={codeLoading}
        onRequestClose={() => {
          setCodeLoading(false);
        }}>
        <ActivityIndicator size={'large'} color={'#ffffff'} />
      </ModalBase>
    </SafeArea>
  );
};
const styles = StyleSheet.create({});
export default CompleteProfileHome;

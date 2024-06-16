import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeArea from '../Components/SafeArea';
import {ScrollView} from 'react-native';
import ResFont from '../Components/Utils/ResFont';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../Components/Button';
import {PropsNavigation} from '../@types/GlobalTypes';

import {navigate} from '../Services/NavigationHandler';
import {colors, font} from '../Components/Utils/Styles/Styles';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/Ionicons';
// @ts-ignore
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
// @ts-ignore
import Icon5 from 'react-native-vector-icons/dist/Octicons';
import Toggle from 'react-native-toggle-element';
import ModalBase from '../Components/ModalBase';
import {LineChart} from 'react-native-gifted-charts';
import API from '../API/Api';
import getprof from '../Actions/get_profile';
import Error from '../Components/Error';
const Home = ({navigation}: PropsNavigation) => {
  let data1 = useSelector((state: any) => state?.header);
  const [daily, setDaily] = useState(data1?.daily_report);
  const [renew, setRenew] = useState(data1?.auto_renew);
  const [dailyModal, setDailyModal] = useState(false);
  const [renewModal, setRenewModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const data = [
    {
      value: 15,
      label: '1403/03/23',
    },
    {value: 30, label: '1403/03/24'},
    {value: 26, label: '1403/03/25'},
    {value: 40, label: '1403/03/26'},
    {
      value: 15,
      label: '1403/03/27',
    },
    {value: 30, label: '1403/03/28'},
  ];
  const data2 = [
    {
      value: 5,
      label: '1403/03/23',
    },
    {value: 3, label: '1403/03/24'},
    {value: 2, label: '1403/03/25'},
    {value: 10, label: '1403/03/26'},
    {
      value: 15,
      label: '1403/03/27',
    },
    {value: 30, label: '1403/03/28'},
  ];

  const dispatch = useDispatch();
  console.log('ghtgdh', data1);
  // const fetchData = async () => {
  //   try {
  //     const res = await API.DailyReport();
  //     console.log('Daily :', res);
  //   } catch (e) {}
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const sendDaily = async () => {
    try {
      setErrorMsg('');
      setLoading(true);
      const res = await API.DailyReport(!data1?.daily_report);
      console.log('daily :', res);
      await getprof(dispatch);
      setLoading(false);
    } catch (e: any) {
      setError(true);
      setLoading(false);
      setErrorMsg(e?.response?.data?.message || 'خطایی رخ اده است.');
      console.log('error:', e);
    }
  };
  const sendRenew = async () => {
    try {
      setErrorMsg('');
      setLoading(true);
      const res = await API.Renew(!data1?.auto_renew);
      console.log('Renew :', res);
      await getprof(dispatch);
      setLoading(false);
    } catch (e: any) {
      setError(true);
      setLoading(false);
      setErrorMsg(e?.response?.data?.message || 'خطایی رخ اده است.');
      console.log('error:', e);
    }
  };

  return (
    <SafeArea style={{flex: 1, backgroundColor: '#faf6f1'}}>
      <ScrollView style={{flex: 1}}>
        {/* banner top */}
        <Pressable
          onPress={() => {
            Linking.openURL(`${data1?.main_banner?.link}`);
          }}
          style={styles.cart}>
          <Image
            resizeMode="contain"
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(10),
            }}
            source={
              data1?.main_banner?.photo
                ? {uri: data1?.main_banner?.photo}
                : require('../assets/Images/ArachidLogo.png')
            }
          />
        </Pressable>
        {/* navigating buttons */}
        <View
          style={{marginBottom: heightPercentageToDP(2), alignSelf: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: heightPercentageToDP(1.5),
            }}>
            <Button
              text="ایجاد برند"
              style={{width: widthPercentageToDP(25)}}
              onPress={() => {
                navigate(navigation, 'dashboard3');
              }}
            />
            <Button
              text="افزودن محصول"
              style={{
                width: widthPercentageToDP(25),
                marginHorizontal: widthPercentageToDP(5),
              }}
              onPress={() => {
                navigate(navigation, 'dashboard3');
              }}
            />
            <Button
              text="ویرایش پروفایل"
              style={{width: widthPercentageToDP(25)}}
              onPress={() => {
                navigate(navigation, 'dashboard3');
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button
              text="پشتیبانی"
              style={{width: widthPercentageToDP(25)}}
              onPress={() => {
                navigate(navigation, 'dashboard3');
              }}
            />
            <Button
              text="رزرو تبلیغ"
              style={{
                width: widthPercentageToDP(25),
                marginHorizontal: widthPercentageToDP(5),
              }}
              onPress={() => {
                navigate(navigation, 'dashboard3');
              }}
            />
            <Button
              text="مدیریت مالی"
              style={{width: widthPercentageToDP(25)}}
              onPress={() => {
                navigate(navigation, 'dashboard3');
              }}
            />
          </View>
        </View>
        {/* tabs */}
        <FlatList
          data={[...Array(6).keys()]}
          numColumns={2}
          contentContainerStyle={{alignSelf: 'center'}}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: colors.tabGray,
                width: widthPercentageToDP(39),
                height: heightPercentageToDP(22),
                margin: ResFont(1.5),
                borderRadius: 10,
                paddingVertical: ResFont(2),
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: ResFont(1),
              }}>
              {item == 0 && (
                <Icon5
                  name="checklist"
                  style={{fontSize: ResFont(6), color: colors.white}}
                />
              )}
              {[1, 2, 3, 4].includes(item) && (
                <Icon3
                  name={
                    item == 1
                      ? 'wallet'
                      : item == 2
                      ? 'boxes'
                      : item == 3
                      ? 'chart-bar'
                      : 'star'
                  }
                  style={{fontSize: ResFont(6), color: colors.white}}
                />
              )}
              {item == 5 ? (
                <Icon
                  name="megaphone-outline"
                  style={{fontSize: ResFont(6), color: colors.white}}
                />
              ) : null}
              <View
                style={{
                  width: widthPercentageToDP(25),
                  height: 1,
                  backgroundColor: colors.white,
                }}
              />
              <Text
                style={[
                  font.font,
                  {color: colors.white, fontSize: ResFont(2.2)},
                ]}>
                {item == 0
                  ? `${data1?.plan?.title}`
                  : item == 1
                  ? 'موجودی کیف پول'
                  : item == 2
                  ? 'تعداد محصولات'
                  : item == 3
                  ? 'آمار بازدید'
                  : item == 4
                  ? 'تعداد محصولات ویژه'
                  : 'بنرهای رزرو شده'}
              </Text>
              <Text
                style={[
                  font.font,
                  {color: colors.white, fontSize: ResFont(2.2)},
                ]}>
                {item == 0
                  ? data1?.plan?.plan_day_left
                  : item == 1
                  ? data1?.wallet_balance
                  : item == 2
                  ? data1?.product_count
                  : item == 3
                  ? data1?.visit_count
                  : item == 4
                  ? data1?.vip_product_count
                  : data1?.banners_count}{' '}
              </Text>
              {item == 0 && data1?.plan?.title != 'بدون پلن' ? (
                <Text
                  style={[
                    font.font,
                    {color: colors.white, fontSize: ResFont(2)},
                  ]}>
                  1403/03/02 1403/10/05
                </Text>
              ) : null}
              <Button
                text={
                  item == 0
                    ? 'تغییر پلن'
                    : item == 1
                    ? 'شارژ'
                    : item == 2
                    ? 'مدیریت'
                    : item == 3
                    ? 'گزارشات'
                    : item == 4
                    ? 'مشاهده'
                    : 'مشاهده'
                }
                backColor={colors.white}
                textColor={colors.tabBlack}
                style={{
                  width: widthPercentageToDP(25),
                }}
              />
            </View>
          )}
        />
        {/* Daily Renew */}
        <View style={styles.separator} />
        <View style={styles.ViewDaily}>
          <Toggle
            value={data1?.daily_report}
            onPress={() => {
              setDaily(!daily);
              sendDaily();
            }}
            thumbButton={{
              activeBackgroundColor: colors.primaryBrown,
              inActiveBackgroundColor: colors.dashboardGray,
              height: ResFont(4),
              width: ResFont(4),
            }}
            trackBar={{
              activeBackgroundColor: colors.buttonDis,
              inActiveBackgroundColor: '#b4b4b4',
              width: widthPercentageToDP(18),
              height: heightPercentageToDP(4),
            }}
            thumbStyle={{
              marginLeft: daily
                ? widthPercentageToDP(-1)
                : widthPercentageToDP(1),
            }}
          />
          <Pressable
            onPress={() => {
              setDailyModal(true);
            }}>
            <Icon5 name="question" style={styles.icon} />
          </Pressable>
          <Text
            style={[
              font.font,
              {fontSize: ResFont(2.2), width: widthPercentageToDP(55)},
            ]}>
            مایلم گزارش بازدیدهای روزانه محصولاتم به شماره موبایل من ارسال شود
          </Text>
        </View>
        <View style={styles.ViewDaily}>
          <Toggle
            value={data1?.auto_renew}
            onPress={() => {
              setRenew(!renew);
              sendRenew();
            }}
            thumbButton={{
              activeBackgroundColor: colors.primaryBrown,
              inActiveBackgroundColor: colors.dashboardGray,
              height: ResFont(4),
              width: ResFont(4),
            }}
            trackBar={{
              activeBackgroundColor: colors.buttonDis,
              inActiveBackgroundColor: colors.gray,
              width: widthPercentageToDP(18),
              height: heightPercentageToDP(4),
            }}
            thumbStyle={{
              marginLeft: renew
                ? widthPercentageToDP(-1)
                : widthPercentageToDP(1),
            }}
          />

          <Pressable
            onPress={() => {
              setRenewModal(true);
            }}>
            <Icon5 name="question" style={styles.icon} />
          </Pressable>
          <Text
            style={[
              font.font,
              {fontSize: ResFont(2.2), width: widthPercentageToDP(55)},
            ]}>
            مایلم پلن فعلی به‌طور خودکار تمدید شود (درصورت داشتن موجودی کافی در
            کیف پول)
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.cart}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: widthPercentageToDP(10),
                height: heightPercentageToDP(2),
                borderRadius: 5,
                backgroundColor: '#cc3f8a',
                marginHorizontal: widthPercentageToDP(2),
              }}
            />
            <Text
              style={[font.font, {fontSize: ResFont(2), color: colors.black}]}>
              تعداد بازدید
            </Text>
            <View
              style={{
                width: widthPercentageToDP(10),
                height: heightPercentageToDP(2),
                borderRadius: 5,
                backgroundColor: '#3d4ca0',
                marginHorizontal: widthPercentageToDP(2),
              }}
            />
            <Text
              style={[font.font, {fontSize: ResFont(2), color: colors.black}]}>
              تعداد کلیک
            </Text>
          </View>
          <LineChart
            xAxisLabelTextStyle={{fontSize: ResFont(1.3)}}
            xAxisColor={colors.gray}
            yAxisColor={colors.gray}
            rulesType="solid"
            dataPointsColor="#cc3f8a"
            yAxisTextStyle={[
              font.font,
              {fontSize: ResFont(2.2), color: colors.textGray},
            ]}
            curved
            areaChart
            color="#d69dbb"
            data={data}
            data2={data2}
            lineGradientDirection=""
            verticalLinesZIndex={100}
            showVerticalLines
            verticalLinesThickness={0.5}
            startFillColor="#e1cce6"
            endFillColor="#e1cce6"
            startOpacity={0.9}
            endOpacity={0.4}
            color2="#4c53a7"
            startFillColor2="#b8b9d2"
            endFillColor2="#b8b9d2"
            startOpacity2={0.9}
            endOpacity2={0.4}
            dataPointsColor2="#3d4ca0"
          />
        </View>
      </ScrollView>
      {/* Modals */}
      {/* Modals */}
      {/* Modals */}
      {/* Modals */}
      {/* Modals */}
      {/* Modals */}
      <ModalBase
        visible={loading}
        onRequestClose={() => {
          setLoading(false);
        }}>
        <ActivityIndicator size={'large'} color={'#ffffff'} />
      </ModalBase>
      <Error
        error={error}
        errorMsg={errorMsg}
        onRequestClose={() => {
          setError(false);
        }}
      />
      <ModalBase
        visible={dailyModal}
        onRequestClose={() => {
          setDailyModal(false);
        }}>
        <View style={styles.ViewModal}>
          <Text style={[font.font, styles.ModalTextTop]}>راهنما</Text>
          <View style={styles.separatorModal} />
          <Text style={[font.font, styles.ModalText]}>
            با فعال کردن این گزینه، در ساعت 24 هر روز، گزارش روزانه «مجموع تعداد
            بازدیدهای محصولات» به شماره موبایل شما پیامک می‌شود.{' '}
          </Text>
        </View>
      </ModalBase>
      <ModalBase
        visible={renewModal}
        onRequestClose={() => {
          setRenewModal(false);
        }}>
        <View style={styles.ViewModal}>
          <Text style={[font.font, styles.ModalTextTop]}>راهنما</Text>
          <View style={styles.separatorModal} />
          <Text style={[font.font, styles.ModalText]}>
            با فعال کردن این گزینه، درصورتی که موجودی کیف پول شما در آراچید کافی
            باشد، پلن اشتراک فعلی پس از انقضا به صورت خودکار تمدید می‌شود.
          </Text>
        </View>
      </ModalBase>
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({
  cart: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: ResFont(1.5),
    paddingTop: ResFont(1.5),
    borderRadius: 10,
    elevation: 10,
    marginVertical: ResFont(2.5),
    shadowColor: '#00000081',
  },
  separator: {
    width: widthPercentageToDP(85),
    height: 5,
    backgroundColor: colors.primaryBrown,
    alignSelf: 'center',
    marginVertical: heightPercentageToDP(1),
  },
  icon: {
    fontSize: ResFont(4),
    color: colors.redError,
    transform: [{rotateY: '180deg'}],
  },
  ViewDaily: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',

    justifyContent: 'space-between',
    width: widthPercentageToDP(85),
    marginVertical: heightPercentageToDP(1),
  },
  ViewModal: {
    width: widthPercentageToDP(60),
    paddingBottom: heightPercentageToDP(2),
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#0000007a',
    paddingHorizontal: widthPercentageToDP(2.5),
  },
  ModalTextTop: {
    fontSize: ResFont(2.2),
    marginTop: heightPercentageToDP(2),
    color: colors.black,
  },
  ModalText: {
    fontSize: ResFont(2.2),
    textAlign: 'right',
    color: colors.textGray,
  },
  separatorModal: {
    width: widthPercentageToDP(55),
    height: 1,
    backgroundColor: colors.gray,
    marginVertical: heightPercentageToDP(1.5),
  },
});

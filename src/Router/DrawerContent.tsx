import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/Ionicons';
// @ts-ignore
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
// @ts-ignore
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
// @ts-ignore
import Icon4 from 'react-native-vector-icons/dist/Feather';
// @ts-ignore
import Icon5 from 'react-native-vector-icons/dist/Octicons';
import ResFont from '../Components/Utils/ResFont';
import {colors, font} from '../Components/Utils/Styles/Styles';
import {useLayoutAnimation} from '../Components/Utils/Animation';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
const ArachidLogo = require('./../assets/Images/ArachidLogo.png');
const DrawerContent = (props: DrawerContentComponentProps) => {
  let data1 = useSelector((state: any) => state?.header);
  console.log('ghtgdh', data1);
  const [openPlan, setOpenPlan] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const plans = () => {
    useLayoutAnimation();
    setOpenPlan(!openPlan);
  };
  const profile = () => {
    useLayoutAnimation();
    setOpenProfile(!openProfile);
  };
  const support = () => {
    useLayoutAnimation();
    setOpenSupport(!openSupport);
  };
  console.log('props', props.state.index);
  let index = props.state.index;

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}>
      {/* <Image
        source={ArachidLogo}
        style={{
          width: ResFont(20),
          height: ResFont(20),
        }}
      /> */}
      <Pressable
        onPress={() => {
          props.navigation.navigate('dashboard');
        }}
        style={[
          styles.itemContainer,
          {
            marginTop: heightPercentageToDP(2),
            backgroundColor: index == 0 ? colors.primaryBrown : 'transparent',
          },
        ]}>
        <Text
          style={[
            font.font,
            styles.textStyles,
            {color: index == 0 ? colors.black : colors.white},
          ]}>
          داشبورد
        </Text>
        <Icon
          name="home-outline"
          style={[
            styles.iconStyles,
            {color: index == 0 ? colors.black : colors.white},
          ]}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          props.navigation.navigate(
            data1?.profile_completed ? 'dashboard1' : 'dashboard',
          );
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: index == 1 ? colors.primaryBrown : 'transparent',
          },
        ]}>
        <Text
          style={[
            font.font,
            styles.textStyles,
            {color: index == 1 ? colors.black : colors.white},
          ]}>
          افزودن محصول
        </Text>
        <Icon2
          name="add-business"
          style={[
            styles.iconStyles,
            {color: index == 1 ? colors.black : colors.white},
          ]}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          props.navigation.navigate('dashboard2');
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: index == 2 ? colors.primaryBrown : 'transparent',
          },
        ]}>
        <Text
          style={[
            font.font,
            styles.textStyles,
            {color: index == 2 ? colors.black : colors.white},
          ]}>
          مدیریت محصولات
        </Text>
        <Icon3
          name="boxes"
          style={[
            styles.iconStyles,
            {color: index == 2 ? colors.black : colors.white},
          ]}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          props.navigation.navigate('dashboard3');
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: index == 3 ? colors.primaryBrown : 'transparent',
          },
        ]}>
        <Text
          style={[
            font.font,
            styles.textStyles,
            {color: index == 3 ? colors.black : colors.white},
          ]}>
          ایجاد صفحه سازمانی
        </Text>
        <Icon4
          name="users"
          style={[
            styles.iconStyles,
            {color: index == 3 ? colors.black : colors.white},
          ]}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          props.navigation.navigate('dashboard4');
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: index == 4 ? colors.primaryBrown : 'transparent',
          },
        ]}>
        <Text
          style={[
            font.font,
            styles.textStyles,
            {color: index == 4 ? colors.black : colors.white},
          ]}>
          مدیریت مالی
        </Text>
        <Icon3
          name="wallet"
          style={[
            styles.iconStyles,
            {color: index == 4 ? colors.black : colors.white},
          ]}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          plans();
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: [5, 6].includes(index)
              ? colors.dashboardGray
              : 'transparent',
          },
        ]}>
        <Icon4
          name={openPlan ? 'chevron-down' : 'chevron-left'}
          style={{
            fontSize: ResFont(3),
            position: 'absolute',
            left: widthPercentageToDP(1.5),
            color: colors.white,
          }}
        />
        <Text style={[font.font, styles.textStyles, {color: colors.white}]}>
          پلن‌ها و تعرفه‌ها
        </Text>
        <Icon5
          name="checklist"
          style={[styles.iconStyles, {color: colors.white}]}
        />
      </Pressable>
      {openPlan ? (
        <View style={{}}>
          <Pressable
            onPress={() => {
              props.navigation.navigate('dashboard5');
            }}
            style={[
              styles.itemContainer2,
              {
                backgroundColor:
                  index == 5 ? colors.primaryBrown : 'transparent',
              },
            ]}>
            <Text
              style={[
                font.font,
                styles.textStyles,
                {color: index == 5 ? colors.black : colors.white},
              ]}>
              اشتراک پایه
            </Text>
            <Icon5
              name="dot-fill"
              style={[
                styles.iconStyles,
                {
                  color: index == 5 ? colors.black : colors.white,
                  fontSize: ResFont(2),
                },
              ]}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              props.navigation.navigate('dashboard6');
            }}
            style={[
              styles.itemContainer2,
              {
                backgroundColor:
                  index == 6 ? colors.primaryBrown : 'transparent',
              },
            ]}>
            <Text
              style={[
                font.font,
                styles.textStyles,
                {color: index == 6 ? colors.black : colors.white},
              ]}>
              نردبان و نمایش ویژه
            </Text>
            <Icon5
              name="dot-fill"
              style={[
                styles.iconStyles,
                {
                  color: index == 6 ? colors.black : colors.white,
                  fontSize: ResFont(2),
                },
              ]}
            />
          </Pressable>
        </View>
      ) : null}
      <Pressable
        onPress={() => {
          props.navigation.navigate('dashboard7');
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: index == 7 ? colors.primaryBrown : 'transparent',
          },
        ]}>
        <Text
          style={[
            font.font,
            styles.textStyles,
            {color: index == 7 ? colors.black : colors.white},
          ]}>
          گزارش محصولات
        </Text>
        <Icon3
          name="chart-bar"
          style={[
            styles.iconStyles,
            {color: index == 7 ? colors.black : colors.white},
          ]}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          props.navigation.navigate('dashboard8');
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: index == 8 ? colors.primaryBrown : 'transparent',
          },
        ]}>
        <Text
          style={[
            font.font,
            styles.textStyles,
            {color: index == 8 ? colors.black : colors.white},
          ]}>
          مدیریت سفارشات
        </Text>
        <Icon3
          name="clipboard-list"
          style={[
            styles.iconStyles,
            {color: index == 8 ? colors.black : colors.white},
          ]}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          props.navigation.navigate('dashboard9');
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: index == 9 ? colors.primaryBrown : 'transparent',
          },
        ]}>
        <Text
          style={[
            font.font,
            styles.textStyles,
            {color: index == 9 ? colors.black : colors.white},
          ]}>
          رزرو تبلیغات
        </Text>
        <Icon
          name="megaphone-outline"
          style={[
            styles.iconStyles,
            {color: index == 9 ? colors.black : colors.white},
          ]}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          profile();
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: [10, 11, 12].includes(index)
              ? colors.dashboardGray
              : 'transparent',
          },
        ]}>
        <Icon4
          name={openProfile ? 'chevron-down' : 'chevron-left'}
          style={{
            fontSize: ResFont(3),
            position: 'absolute',
            left: widthPercentageToDP(1.5),
            color: colors.white,
          }}
        />
        <Text style={[font.font, styles.textStyles, {color: colors.white}]}>
          پروفایل
        </Text>
        <Icon2
          name="manage-accounts"
          style={[styles.iconStyles, {color: colors.white}]}
        />
      </Pressable>
      {openProfile ? (
        <View style={{}}>
          <Pressable
            onPress={() => {
              props.navigation.navigate('dashboard10');
            }}
            style={[
              styles.itemContainer2,
              {
                backgroundColor:
                  index == 10 ? colors.primaryBrown : 'transparent',
              },
            ]}>
            <Text
              style={[
                font.font,
                styles.textStyles,
                {color: index == 10 ? colors.black : colors.white},
              ]}>
              مشاهده پروفایل
            </Text>
            <Icon5
              name="dot-fill"
              style={[
                styles.iconStyles,
                {
                  color: index == 10 ? colors.black : colors.white,
                  fontSize: ResFont(2),
                },
              ]}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              props.navigation.navigate('dashboard11');
            }}
            style={[
              styles.itemContainer2,
              {
                backgroundColor:
                  index == 11 ? colors.primaryBrown : 'transparent',
              },
            ]}>
            <Text
              style={[
                font.font,
                styles.textStyles,
                {color: index == 11 ? colors.black : colors.white},
              ]}>
              ویرایش پروفایل
            </Text>
            <Icon5
              name="dot-fill"
              style={[
                styles.iconStyles,
                {
                  color: index == 11 ? colors.black : colors.white,
                  fontSize: ResFont(2),
                },
              ]}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              props.navigation.navigate('dashboard12');
            }}
            style={[
              styles.itemContainer2,
              {
                backgroundColor:
                  index == 12 ? colors.primaryBrown : 'transparent',
              },
            ]}>
            <Text
              style={[
                font.font,
                styles.textStyles,
                {color: index == 12 ? colors.black : colors.white},
              ]}>
              تغییر رمز عبور
            </Text>
            <Icon5
              name="dot-fill"
              style={[
                styles.iconStyles,
                {
                  color: index == 12 ? colors.black : colors.white,
                  fontSize: ResFont(2),
                },
              ]}
            />
          </Pressable>
        </View>
      ) : null}
      <Pressable
        onPress={() => {
          support();
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: [13, 14].includes(index)
              ? colors.dashboardGray
              : 'transparent',
          },
        ]}>
        <Icon4
          name={openSupport ? 'chevron-down' : 'chevron-left'}
          style={{
            fontSize: ResFont(3),
            position: 'absolute',
            left: widthPercentageToDP(1.5),
            color: colors.white,
          }}
        />
        <Text style={[font.font, styles.textStyles, {color: colors.white}]}>
          پشتیبانی
        </Text>
        <Icon2
          name="support-agent"
          style={[styles.iconStyles, {color: colors.white}]}
        />
      </Pressable>
      {openSupport ? (
        <View style={{}}>
          <Pressable
            onPress={() => {
              props.navigation.navigate('dashboard13');
            }}
            style={[
              styles.itemContainer2,
              {
                backgroundColor:
                  index == 13 ? colors.primaryBrown : 'transparent',
              },
            ]}>
            <Text
              style={[
                font.font,
                styles.textStyles,
                {color: index == 13 ? colors.black : colors.white},
              ]}>
              ارتباط با واحد پشتیبانی
            </Text>
            <Icon5
              name="dot-fill"
              style={[
                styles.iconStyles,
                {
                  color: index == 13 ? colors.black : colors.white,
                  fontSize: ResFont(2),
                },
              ]}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              props.navigation.navigate('dashboard14');
            }}
            style={[
              styles.itemContainer2,
              {
                backgroundColor:
                  index == 14 ? colors.primaryBrown : 'transparent',
              },
            ]}>
            <Text
              style={[
                font.font,
                styles.textStyles,
                {color: index == 14 ? colors.black : colors.white},
              ]}>
              مشاهده درخواست‌ها
            </Text>
            <Icon5
              name="dot-fill"
              style={[
                styles.iconStyles,
                {
                  color: index == 14 ? colors.black : colors.white,
                  fontSize: ResFont(2),
                },
              ]}
            />
          </Pressable>
        </View>
      ) : null}
      <Pressable
        onPress={() => {
          props.navigation.navigate('dashboard15');
        }}
        style={[
          styles.itemContainer,
          {
            backgroundColor: index == 15 ? colors.primaryBrown : 'transparent',
          },
        ]}>
        <Text
          style={[
            font.font,
            styles.textStyles,
            {color: index == 15 ? colors.black : colors.white},
          ]}>
          آموزش
        </Text>
        <Icon3
          name="play"
          style={[
            styles.iconStyles,
            {color: index == 15 ? colors.black : colors.white},
          ]}
        />
      </Pressable>
    </ScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373736',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: widthPercentageToDP(40),

    paddingVertical: heightPercentageToDP(1),
    borderRadius: 5,
    marginVertical: heightPercentageToDP(1),
  },
  itemContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: widthPercentageToDP(40),

    paddingVertical: heightPercentageToDP(1),
    borderRadius: 5,
  },
  textStyles: {
    fontSize: ResFont(2.2),

    marginRight: widthPercentageToDP(2.5),
  },
  iconStyles: {
    fontSize: ResFont(4),

    marginRight: widthPercentageToDP(2.5),
  },
});

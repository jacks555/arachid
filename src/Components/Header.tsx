import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/Feather';
import ResFont from './Utils/ResFont';
import {colors, font} from './Utils/Styles/Styles';
import {DispatchProp, useSelector} from 'react-redux';
import {
  DrawerActions,
  DrawerActionType,
  useNavigation,
} from '@react-navigation/native';
import {PropsNavigation} from '../@types/GlobalTypes';
import {removeFromStorage} from '../Services/StorageHandler';
import STORAGE from './Utils/StorageKey';
import resetStack from '../Services/NavigationHandler';
const Avatar = require('./../assets/Images/avatar.png');

const Header = () => {
  const navigation = useNavigation<any>();
  const [open, setOpen] = useState(false);
  let data1 = useSelector((state: any) => state?.header);
  // console.log('ghtgdh', data1);
  return (
    <View
      style={{
        width: widthPercentageToDP(100),
        height: ResFont(10),
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Pressable
        onPress={() => {
          setOpen(!open);
        }}
        style={{
          flexDirection: 'row',
          marginLeft: widthPercentageToDP(5),
          alignItems: 'center',
        }}>
        {open ? (
          <View style={[styles.open]}>
            <Pressable
              style={{
                position: 'absolute',
                width: widthPercentageToDP(100),
                height: heightPercentageToDP(100),
                top: 0,
                left: 0,
              }}
              onPress={() => {
                setOpen(false);
              }}
            />
            <Pressable style={styles.view}>
              <Text
                style={[
                  font.font,
                  {
                    marginRight: widthPercentageToDP(2.5),
                    fontSize: ResFont(2.2),
                    color: colors.black,
                  },
                ]}>
                پروفیال من
              </Text>
              <Icon
                name="user"
                style={{fontSize: ResFont(4), color: '#1b55e2'}}
              />
            </Pressable>
            <View
              style={{
                alignSelf: 'center',
                height: 0.5,
                width: widthPercentageToDP(26),
                backgroundColor: colors.textGray,
              }}
            />
            <Pressable
              style={styles.view}
              onPress={async () => {
                await removeFromStorage({key: STORAGE.TOKEN});
                navigation?.dispatch(resetStack('splash'));
              }}>
              <Text
                style={[
                  font.font,
                  {
                    marginRight: widthPercentageToDP(2.5),
                    fontSize: ResFont(2.2),
                    color: colors.black,
                  },
                ]}>
                خروج
              </Text>
              <Icon
                name="log-out"
                style={{fontSize: ResFont(4), color: '#1b55e2'}}
              />
            </Pressable>
          </View>
        ) : null}
        <Image
          source={
            !['{}', 'false', 'null', '0'].includes(
              JSON.stringify(data1?.user_info?.photo),
            )
              ? {uri: data1?.user_info?.photo}
              : Avatar
          }
          style={{width: ResFont(8), height: ResFont(8), borderRadius: 10}}
          resizeMode="contain"
        />
        <Text
          style={[
            font.font,
            {
              marginLeft: widthPercentageToDP(2.5),
              fontSize: ResFont(2.4),
              color: colors.textGray,
            },
          ]}>
          {data1?.user_info?.first_name} {data1?.user_info?.last_name}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={{marginRight: widthPercentageToDP(5)}}>
        <Icon
          name="menu"
          style={{fontSize: ResFont(5), color: colors.textGray}}
        />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  open: {
    position: 'absolute',
    width: widthPercentageToDP(30),

    backgroundColor: '#ffffff',
    borderRadius: 10,
    bottom: -heightPercentageToDP(12.5),
    elevation: 10,
    zIndex: 10,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: heightPercentageToDP(1.5),
    marginRight: widthPercentageToDP(2.5),
    zIndex: 10,
  },
});

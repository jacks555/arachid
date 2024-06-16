import {View, Text, Pressable} from 'react-native';
import React from 'react';
import ModalBase from './ModalBase';
import {ErrorType} from '../@types/GlobalTypes';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors, font} from './Utils/Styles/Styles';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/AntDesign';
import ResFont from './Utils/ResFont';
const Error = ({
  error,
  errorMsg,
  onRequestClose = () => {
    console.log('empty');
  },
}: ErrorType) => {
  return (
    <ModalBase
      visible={error}
      onRequestClose={() => {
        onRequestClose();
      }}>
      <View
        style={{
          width: widthPercentageToDP(75),
          height: heightPercentageToDP(30),
          backgroundColor: '#ffffff',
          borderRadius: 10,
        }}>
        <View
          style={{
            width: widthPercentageToDP(75),
            height: heightPercentageToDP(15),
            backgroundColor: '#e65151',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            name="closecircleo"
            style={{fontSize: ResFont(10), color: '#ffffff'}}
          />
        </View>
        <View
          style={{
            width: widthPercentageToDP(75),
            height: heightPercentageToDP(15),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              font.font,
              {
                fontSize: ResFont(3),
                color: colors.black,
                marginBottom: heightPercentageToDP(1),
              },
            ]}>
            خطا!
          </Text>
          <Text
            style={[
              font.font,
              {
                fontSize: ResFont(2.2),
                color: colors.black,
                marginBottom: heightPercentageToDP(1),
              },
            ]}>
            {errorMsg}
          </Text>
          <Pressable
            onPress={() => {
              onRequestClose();
            }}
            style={{
              width: widthPercentageToDP(35),
              height: heightPercentageToDP(5),
              borderRadius: 10,
              marginVertical: heightPercentageToDP(1),
              backgroundColor: '#242323',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                font.font,
                {
                  fontSize: ResFont(2.2),
                  color: '#ffffff',
                },
              ]}>
              بستن
            </Text>
          </Pressable>
        </View>
      </View>
    </ModalBase>
  );
};

export default Error;

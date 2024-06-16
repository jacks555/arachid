import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import { Button } from 'native-base';

import {ButtonType} from '../@types/GlobalTypes';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ResFont from './Utils/ResFont';
import {colors, font} from './Utils/Styles/Styles';
const Button = ({
  text,
  icon,
  isLoading,
  isDisable,
  onPress = () => {
    console.log('empty');
  },
  backColor,
  textColor,
  style = {},
  fontStyle = {},
  right,
}: ButtonType) => {
  const onButtonPress = () => {
    if (!isDisable) onPress();
  };

  return (
    <View style={[font.center, {}]}>
      <TouchableOpacity
        style={[
          font.center,
          {
            backgroundColor: backColor
              ? backColor
              : isDisable
              ? colors.buttonDis
              : colors.primaryBrown,
            height: heightPercentageToDP(6),
            borderRadius: 10,
            elevation: 15,
            shadowColor: '#000000b7',
            borderColor: '#000000',
            borderWidth: 0.5,
            ...style,
          },
        ]}
        onPress={onButtonPress}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={textColor || '#ffffff'} />
        ) : (
          <View style={[font.center, {flexDirection: 'row'}]}>
            {icon && !right && (
              <Icon
                style={{
                  color: textColor || '#ffffff',
                  marginRight: widthPercentageToDP(1),
                  marginTop: heightPercentageToDP(1),
                }}
                size={ResFont(2.5)}
                name={icon}></Icon>
            )}
            <Text
              style={[
                font.font,
                {fontSize: ResFont(1.8), color: textColor || '#ffffff'},
                fontStyle,
              ]}>
              {text}
            </Text>
            {icon && right && (
              <Icon
                style={{
                  color: textColor || '#ffffff',
                  marginRight: widthPercentageToDP(1),
                  marginTop: heightPercentageToDP(0.5),
                }}
                size={ResFont(2.5)}
                name={icon}></Icon>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {alignSelf: 'center'},
});
export default Button;

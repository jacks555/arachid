import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-gesture-handler';
import {colors, font} from './Utils/Styles/Styles';
import {InputType} from '../@types/GlobalTypes';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/AntDesign';
import ResFont from './Utils/ResFont';

const TextInputRequired = ({
  placeholder,
  style,
  inputStyle,
  keyboardType,
  maxLength,
  editable,
  multiline,
  placeholderColor,
  value,
  iconName,
  password,
  onChange,
  iconColor,
  iconStyle,
  title,
  mainStyle,
  titleStyle,
}: InputType) => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          width: 'auto',

          alignSelf: 'center',
        },
        mainStyle,
      ]}>
      <Text
        style={[
          font.font,
          {
            fontSize: ResFont(2.2),
            // textAlign: 'right',
            alignSelf: 'flex-end',
            marginBottom: ResFont(0.5),
            color: colors.textGray,
          },
          titleStyle,
        ]}>
        {title}
      </Text>
      <View style={[styles.container, style]}>
        {iconName ? (
          <Icon
            name={iconName}
            style={[{fontSize: ResFont(3.5), color: iconColor}, iconStyle]}
          />
        ) : null}
        {maxLength && value ? (
          maxLength == value?.length ? (
            <Icon
              name={'checkcircle'}
              style={[
                {
                  fontSize: ResFont(3.5),
                  color: colors.greenCheck,
                  marginLeft: widthPercentageToDP(3),
                },
                iconStyle,
              ]}
            />
          ) : (
            <Icon
              name={'closecircle'}
              style={[
                {
                  fontSize: ResFont(3.5),
                  color: colors.redError,
                  marginLeft: widthPercentageToDP(3),
                },
                iconStyle,
              ]}
            />
          )
        ) : null}
        <TextInput
          secureTextEntry={password}
          editable={editable}
          onChangeText={onChange}
          multiline={multiline}
          keyboardType={keyboardType}
          maxLength={maxLength}
          placeholder={placeholder}
          style={[font.fontLight, styles.input, inputStyle]}
          //   textAlign="center"
          //textAlignVertical="top"
          placeholderTextColor={placeholderColor ? placeholderColor : '#000000'}
          value={value}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: colors.primaryBrown,
    borderWidth: 1,
    paddingVertical: heightPercentageToDP(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: widthPercentageToDP(35),
    height: heightPercentageToDP(5.5),
    fontSize: ResFont(2.2),

    textAlign: 'center',
    color: colors.black,
    textAlignVertical: 'center',
  },
});
export default TextInputRequired;

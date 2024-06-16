import {View, Text, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import {ModalType} from '../@types/GlobalTypes';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const ModalBase = ({
  visible,
  onRequestClose = () => {
    console.log('empty');
  },
  children,
}: ModalType) => {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      style={{
        backgroundColor: '#00000055',
      }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Pressable
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
            position: 'absolute',
            backgroundColor: '#00000055',
          }}
          onPress={() => {
            onRequestClose();
          }}
        />
        {children}
      </View>
    </Modal>
  );
};

export default ModalBase;

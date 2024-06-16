import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LoadingType } from '../@types/GlobalTypes';

const Loading = ({ color, style = {} }:LoadingType) => {
    return (
        <View style={[styles.center, { flex: 1 }, style]} >
            <ActivityIndicator style={{alignSelf:'center'}} color={color || '#ffffff'} size={'large'} />
        </View>
    );
}

const styles = StyleSheet.create({
center:{
    alignSelf:"center",
}
})
export default Loading;
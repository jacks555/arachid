import { StyleSheet } from "react-native";

const IRANYekan = 'IRANYekanWeb'
const IRANYekanBold = 'IRANYekanWeb-Bold'
const IRANYekanLight = 'IRANYekanWeb-Light'

export const colors ={
    primaryBrown:'#AF915B',
    black:'#151515',
    greenCheck:'#008000',
    redError:'#ff0000',
    buttonDis:'#d4c8b2',
    textGray:'#888ea8',
    white:'#ffffff',
    dashboardGray:'#868685',
    tabGray:'#7e7e7e',
    tabBlack:'#3b3f5c',
    gray:'#b4b4b4'
}
export const font = StyleSheet.create({
    fontLight: {
        fontFamily: IRANYekanLight,
        backgroundColor: 'transparent',
    },
    font: {
        fontFamily: IRANYekan,
        backgroundColor: 'transparent',
    },

    fontBold: {
        fontFamily: IRANYekanBold,
        backgroundColor: 'transparent',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    verticalCenter: {
        zIndex: 1,
        justifyContent: 'center',

    },
    horizontalCenter: {
        alignItems: 'center',
    },
});
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Splash from '../Screens/Splash';
import Register from '../Screens/Register';
import Verify from '../Screens/Verify';
import CompleteProfileHome from '../Screens/CompleteProfileHome';
import ChangePass from '../Screens/ChangePass';
import Header from '../Components/Header';
const Stack = createStackNavigator();
const DashboardStack = createStackNavigator();
const Drawerr = createDrawerNavigator();
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../Reducer/index';
import thunk from 'redux-thunk';
import {persistReducer, persistStore as persistStoreRaw} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
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
import {Dropdown} from 'react-native-element-dropdown';

const ArachidLogo = require('./../assets/Images/ArachidLogo.png');

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors, font} from '../Components/Utils/Styles/Styles';
import ResFont from '../Components/Utils/ResFont';
import {useLayoutAnimation} from '../Components/Utils/Animation';
import drawerContent from './DrawerContent';
import DrawerContent from './DrawerContent';
import Home from '../Screens/Home';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStoreWithMiddleware(persistedReducer);
const persistStore = storeToPersist => {
  new Promise(resolve => {
    persistStoreRaw(storeToPersist, undefined, () => {
      registerScreens(storeToPersist, Provider);
      resolve();
    });
  });
};
function Drawer() {
  return (
    <Drawerr.Navigator
      screenOptions={{
        header: () => <Header />,
        drawerPosition: 'right',
        drawerStyle: {width: widthPercentageToDP(50)},
      }}
      drawerContent={props => {
        return <DrawerContent {...props} />;
      }}>
      <Drawerr.Screen name="dashboard" component={Dashboard} />
      <Drawerr.Screen name="dashboard1" component={Dashboard} />
      <Drawerr.Screen name="dashboard2" component={Dashboard} />
      <Drawerr.Screen name="dashboard3" component={Dashboard} />
      <Drawerr.Screen name="dashboard4" component={Dashboard} />
      <Drawerr.Screen name="dashboard5" component={Dashboard} />
      <Drawerr.Screen name="dashboard6" component={Dashboard} />
      <Drawerr.Screen name="dashboard7" component={Dashboard} />
      <Drawerr.Screen name="dashboard8" component={Dashboard} />
    </Drawerr.Navigator>
  );
}
function Dashboard() {
  return (
    <DashboardStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="completehome">
      <DashboardStack.Screen
        name="completehome"
        component={CompleteProfileHome}
      />
      <DashboardStack.Screen name="home" component={Home} />
    </DashboardStack.Navigator>
  );
}
const Routes = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="splash">
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="verify" component={Verify} />
          <Stack.Screen name="drawer" component={Drawer} />
          <Stack.Screen name="changePass" component={ChangePass} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Routes;

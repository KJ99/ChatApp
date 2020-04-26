/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, Text } from 'react-native'
import {createSwitchNavigator, createNavigationContainer, } from 'react-navigation'
import createAnimatedSwitchNavigator  from 'react-navigation-animated-switch'
import { Transition, Easing } from 'react-native-reanimated';
import {createStackNavigator} from '@react-navigation/stack'
import reducer from './reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import LandingController from './controller/landing-controller'
import LoginController from './controller/login-controller'
import RegistrationController from './controller/registration-controller'
import { NavigationNativeContainer, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConfirmAccountController from './controller/confirm-account-controller';
import AccountDisabledController from './controller/account-disabled-controller'
import PasswordResetController from './controller/password-reset-controller'
import TempController from './controller/temp-controller'
import SplashController from './controller/splash-controller'
import ChatListController from './controller/chat-list-controller'
import UserController from './controller/user-controller'
import ConnectionsController from './controller/connections-controller'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const store = createStore(reducer)

const TabNav = () => {
  return (
  <Tab.Navigator>
    <Tab.Screen name='ChatList' component={ChatListController} />
    <Tab.Screen name='Profile' component={UserController} />
    <Tab.Screen name='Connections' component={ConnectionsController} />
  </Tab.Navigator>
  )
}

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: false,
      transitionSpec: {
        open: {
          animation: 'spring',
          config: {
            duration: 500,
            easing: Easing.ease,
          }
        },
        close: {
          animation: 'spring',
          config: {
            duration: 500,
            easing: Easing.ease, 
          }
        } 
      },
      header: () => {return null}
    }}>
      <Stack.Screen name='Splash' component={SplashController}/>
      <Stack.Screen name='Landing' component={LandingController}/>
      <Stack.Screen name='Register' component={RegistrationController}/>
      <Stack.Screen name='Login' component={LoginController}/>
      <Stack.Screen name='ConfirmAccount' component={ConfirmAccountController} />
      <Stack.Screen name='AccountDisabled' component={AccountDisabledController} />
      <Stack.Screen name='PasswordReset' component={PasswordResetController} />
      <Stack.Screen name='App' component={TabNav} />
    </Stack.Navigator> 
  )
}


export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
  )
}



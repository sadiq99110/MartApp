import React,{useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../Screens/signIn';
import Register from '../Screens/register';
import Home from '../Screens/home';
import Details from '../Screens/detail';
import SplashScreen from '../Screens/splashScreen';
import QRcode from '../Screens/qrCode';
import PaymentMethod from '../Screens/paymentMethod';
import WebViewScreen from '../Screens/webView';
import SuccessScreen from '../Screens/suceessScreen';

const StackScreen = () => {
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
      <Stack.Screen   name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="QRcode" component={QRcode} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}
export default StackScreen
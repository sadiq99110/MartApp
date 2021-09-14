import React,{useEffect, useState} from 'react';
import {
    ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
    Image,
  StatusBar,
  StyleSheet,
  Text,
  Linking,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QRcode = ({navigation}) => {
    const [userId,setUserId] = useState('');
    // const [cartId,setCartId] = useState("")

    useEffect(() => {
        _retrieveData();
    },[])
    // useEffect(() => {
    //     activeCart()
    // },[cartId])
    const _retrieveData = async () => {
        try {
            var id = await AsyncStorage.getItem('cartId')
            if(id){
               
                navigation.navigate('Home')
                return
            }
            var value = await AsyncStorage.getItem('user');
            if(value !== null){
                console.log("value ==========>",value);;
                // navigation.navigate('QRcode')
                    //    return value
                    value = JSON.parse(value)
                    setUserId(value._id)
            }
        } catch (error) {
             console.log(error.message)   
        }
    }
    const _storeData = async (id) => {
          
        try {
            await AsyncStorage.setItem('cartId',id)
        } catch (error) {
            console.log(error.message)
        }
    }    
    const activeCart = async (cartId) =>{
        
        try {
           const result = await axios.post('https://martmanagementsystembackend.herokuapp.com/api/carts/activateCart',{
            cartId: cartId,
            userId: userId
           })
           
           console.log("dsfdsfffffffffffffffffffffffffffffffffffffffffffffff",result.data);
           if(result.data.message !== "Already Activated"){
           _storeData(cartId)  

        }
        navigation.navigate('Home');
        } catch (error) {
            console.log(error.message)
        }
    }



   const onSuccess = e => {

        console.log(e.data)
         activeCart(e.data)
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
      };

      const _signOut = async () => {
        try{
            await AsyncStorage.removeItem('user')
            navigation.navigate('SignIn')
        }
        catch(err) {
            alert(err)
        }
    }  

    return(
        <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={
          <Text style={styles.centerText}>
            Scan{' '}
            <Text style={styles.textBold}>QRcode</Text> to
            activate the card.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText} onPress={() => _signOut()}>Logout</Text>
          </TouchableOpacity>
        }
      />
    )
}

export default QRcode

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
      textAlign:'center'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });
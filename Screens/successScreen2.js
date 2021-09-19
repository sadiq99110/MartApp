import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Text, Image } from 'react-native'
import { io } from 'socket.io-client'
const socket = io('https://martmanagementsystembackend.herokuapp.com');

const SuccessScreen2 = ({ navigation }) => {
    const [cartId, setCartId] = useState('');
    const [success, setSuccess] = useState(false)
    // useEffect(() => {
    //     _retrieveData().then((res) => {
    //         axios.post('https://martmanagementsystembackend.herokuapp.com/api/carts/deactivate',{
    //             cartId:res
    //         }).then((res) => {
    //             if(res.data.status == 'success'){
    //                 AsyncStorage.removeItem('cartId').then(() => {
    //                     setTimeout(() => {


    //                     navigation.reset({
    //                         index:0,
    //                         routes:[{name:'QRcode'}]
    //                     })
    //                 },5000)
    //                 })
    //             }
    //         })
    //     })

    // },[])
        socket.on(cartId,(data)=>{
           if(data.type = "success"){
               confirm()
           }

        })
    useEffect(() => {
        _retrieveData();
    

    }, [])

    const _retrieveData = async () => {
        try {
            var id = await AsyncStorage.getItem('cartId')
            if (!id) {
                console.log('cartId-----------------------------', id)
                return
            }
            setCartId(id)
            return id
        } catch (error) {
            console.log(error.message)
        }
    }
    const confirm = () => {
        setSuccess(true);
      AsyncStorage.removeItem("cartId").then(()=>{
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'QRcode' }]
            })
        }, 3000);
      })
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                success !== true ? 
                // <> <Text>CART ID: {cartId}</Text>
                // <Text style={{ textAlign: 'center', fontSize: 30 }}>show this Id cartId to your vendor</Text> </> 
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>CART ID: {cartId}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>show this Id cartId to your vendor</Text> 
                </View>
                : 
                <View>
                <Image source={{ uri: 'https://www.shareicon.net/data/256x256/2016/08/20/817720_check_395x512.png' }} style={styles.image} />
                <Text style={{ textAlign: 'center', fontSize: 30 }}>Payment is done!</Text>
                </View>
            }
          
          
        </View>
    )
}
export default SuccessScreen2

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain'
    }
})
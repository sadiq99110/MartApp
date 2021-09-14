import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { SafeAreaView, View,StyleSheet, ActivityIndicator, FlatList, TouchableOpacity,Text, Image } from 'react-native'
import WebView from 'react-native-webview'

const PaymentMethod = ({navigation}) => {

    return(
        <SafeAreaView>
            <Text style={styles.mainText}>Choose Options 👇</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Cash On Counter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WebViewScreen')}>
                <Text style={styles.textButton}>Cash through Paypal</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default PaymentMethod

const styles = StyleSheet.create({
    mainText:{
        marginTop:20,
        fontSize:20,
        textAlign:'center'
    },
    button:{
        marginTop:20,
        width:'80%',
        marginLeft:'10%',
        borderRadius:20,
        paddingHorizontal:30,
        paddingVertical:20,
        backgroundColor:'#ea7774'
    },
    textButton:{
        textAlign:'center',
        fontWeight:'800',
        color:'white'
    }
})
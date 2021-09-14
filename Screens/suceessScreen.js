import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { SafeAreaView, View,StyleSheet, ActivityIndicator, FlatList, TouchableOpacity,Text, Image } from 'react-native'

const SuccessScreen = ({navigation}) => {
    const [data,setData] = useState();
    const [obj,setObj] = useState();
    const [cartId,setCartId] = useState()
  useEffect(()=>{
    _retrieveData().then(res =>{
        setCartId(res)
        axios.post('https://martmanagementsystembackend.herokuapp.com/api/carts/onGoing',{
            cartId:res
        }).then((res) => {
           
            setData(res.data.message)

        })
     
    })
  },[_retrieveData])
  
useEffect(()=>{
if(data?.length){
    var userId = ""
    AsyncStorage.getItem("user").then((res)=>{
        const userData= JSON.parse(res);
        userId = userData._id;
      
        var products = data.reduce((a,b) => `${a._id}_${a.quantity},${b._id}_${b.quantity}`,"");
        console.log(products);
        setObj({
            cartId,
            userId,
            products,
            amount:1200,
            paymentType:"paypal"
        })
        AsyncStorage.removeItem("cartId").then(()=>{
            setTimeout(()=>{
                navigation.navigate("QRcode")
            },3000)
        })
     
    })

}
},[data])

  const _retrieveData = async () => {
    try {
        var id = await AsyncStorage.getItem('cartId')
        if(!id){
           
            navigation.navigate('QRcode')
            return
        }
      return id
    } catch (error) {
         console.log(error.message)   
    }
}
    return(
        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <Text style={{textAlign:'center', fontSize:30}}>Success</Text>
        </View>
    )
}
export default SuccessScreen
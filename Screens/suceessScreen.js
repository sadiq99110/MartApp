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
        // 
        
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
      console.log(data);
      var products = ""
        // var products = data.reduce((a,b) => `${a.productId}_${a.quantity},${b.productId}_${b.quantity}`,"");
        for (let i = 0; i < data.length; i++) {
          var temp = `${data[i].productId}_${data[i].quantity}`;
            if(products){
                products = products + "," + temp;
            }
            else{
                products = temp;
            }
            
        }
        console.log(products);
        var amount = 0;
        for (let i = 0; i < data.length; i++) {
          amount = Number(data[0].amount) + amount;
            
        }
        console.log("Amount.....................",amount)
        // products = products.replace("undefined_undefined","");
      axios.post("https://martmanagementsystembackend.herokuapp.com/api/orderHistory",  {
        cartId,
        userId,
        products,
        amount,
        paymentType:"paypal"
    }).then(()=>{
AsyncStorage.removeItem("cartId").then(()=>{
            setTimeout(()=>{
                navigation.navigate("QRcode")
            },3000)
        })
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
            <Image source={{uri:'https://www.shareicon.net/data/256x256/2016/08/20/817720_check_395x512.png'}} style={styles.image}/>
            <Text style={{textAlign:'center', fontSize:30}}>Success</Text>    
        </View>
    )
}
export default SuccessScreen

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:100,
        resizeMode:'contain'
    }
})
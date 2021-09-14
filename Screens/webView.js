import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useState,useEffect} from 'react'
import WebView from 'react-native-webview'

const WebViewScreen = ({navigation}) => {
    const [id, setId] = useState('')
    useEffect(() => {
        _retrieveData()
    },[])

    const _retrieveData = async () => {
        try {
            var id = await AsyncStorage.getItem('cartId')
                setId(id)
        } catch (error) {
             console.log(error.message)   
        }
    }

    

    return(
        <WebView  source={{uri:`https://martmanagementsystembackend.herokuapp.com/paypal/${id}`}}
        onNavigationStateChange={(navState) => {
            // console.log(navState)
            // navigation.navigate('WebViewScreen')
            if(navState.url.includes('success')){
                navigation.navigate('SuccessScreen')
            }
          }}
        />
    )
}

export default WebViewScreen
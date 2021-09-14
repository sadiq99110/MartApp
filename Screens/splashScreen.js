import React,{useEffect} from 'react';
import {
    ImageBackground,
  SafeAreaView,
  ScrollView,
    Image,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{name: 'SignIn'}],
              })
        },3000)
    }, [])
    return(
        <View style={styles.conatiner}>
                <Image source ={{uri:'https://i.pinimg.com/originals/96/e7/68/96e768cc8dfc14f7955a33550d35bedf.png'}} style={styles.image}/>
        </View>
    )
}
export default Splash

const styles = StyleSheet.create({
    conatiner:{
        backgroundColor:'white',
        width:'100%',
        height:'100%',
        flex:1,
        justifyContent:'center'
    },
    image: {
        width:'100%',
        height:'30%',
        resizeMode:'contain',
        alignSelf:'center'
    }
})
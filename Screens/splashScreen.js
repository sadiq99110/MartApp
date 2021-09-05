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
                routes: [{name: 'Login'}],
              });
        },3000)
    }, [])
    return(
        <View style={styles.conatiner}>
                <Image source ={{uri:'https://images.unsplash.com/photo-1584680226833-0d680d0a0794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'}} style={styles.image}/>
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
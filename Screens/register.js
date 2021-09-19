import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { SafeAreaView, View,StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView, Button, Text, Alert } from 'react-native'


const Register = ({navigation}) => {
        const [email,setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [name,setName] = useState('')

        useEffect(() => {
            _retrieveData();
        },[])


        const login = async ()=>{
            try {
                const result = await axios.post("https://martmanagementsystembackend.herokuapp.com/api/users/register",{
                   name: name,
                   email: email.trim(),
                   password:password.trim()
                })
                return result;
                } catch (error) {
                    console.log(error.message);
                    
                }
            }

            const handleSubmit = ()=>{
                console.log("xfdsfs")
                login().then((res)=>{
                    console.log(res.data);
                  _storeData(res.data)
                    navigation.reset({
                      index:0,
                      routes:[{name:'QRcode'}]
                  })
                      }).catch(()=>{
                          Alert.alert("Invalid email or password")
                      })
                  }
            
                  const _storeData = async (obj) => {
                    var {password,...userObj} = obj;
                    userObj = JSON.stringify(userObj)
                    try {
                        await AsyncStorage.setItem('user',userObj)
                    } catch (error) {
                        console.log(error.message)
                    }
                }    
        
        
                const _retrieveData = async () => {
                    try {
                        const value = await AsyncStorage.getItem('user');
                        if(value !== null){
                            console.log("value ==========>",value);;
                            navigation.navigate('QRcode')
                        }
                    } catch (error) {
                         console.log(error.message)   
                    }
                }      

        return(
            // <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag'>
            // <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
            <View style={styles.container}>   
            <Image style={styles.logo} source={{uri:'https://i.pinimg.com/originals/96/e7/68/96e768cc8dfc14f7955a33550d35bedf.png'}}/>
            <TextInput 
                    placeholder='Enter your Name'
                    placeholderTextColor='black'
                    style={styles.email}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />    
            <TextInput 
                    placeholder='Enter your email'
                    placeholderTextColor='black'
                    style={styles.email}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                    placeholder='Enter your password'
                    placeholderTextColor='black'
                    style={styles.password}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableOpacity>
                </View>
                // </KeyboardAvoidingView> 
                // </ScrollView>
        )
}
export default Register

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        height:'100%',
        justifyContent:'center'
    },
    logo:{
        width:'100%',
        height:100,
        alignSelf:'center',
        resizeMode:'contain',
        marginBottom:10,
        borderRadius:75
    },
    email:{
        width:'90%',
        height:'9%',
        marginLeft:'5%',
        borderRadius:10,
        borderWidth:0.8,
        borderColor:'grey',
        color:'black'
    },
    password:{
        width:'90%',
        height:'9%',
        marginLeft:'5%',
        borderRadius:10,
        borderWidth:0.8,
        borderColor:'grey',
        marginTop:5,
        color:'black'
    },
    button:{
        width:'80%',
        height:50,
        marginTop:5,
        backgroundColor:'black',
        marginLeft:'10%',
        borderRadius:20,
    },
    loginText:{
        color:'white',
        textAlign:'center',
        fontSize:23,
        top:5,
        fontWeight:'bold'
    }
})
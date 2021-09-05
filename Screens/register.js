import React,{useState,useEffect} from 'react'
import { SafeAreaView, View,StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView, Button, Text } from 'react-native'


const Register = ({navigation}) => {
        const [email,setEmail] = useState('')
        const [password, setPassword] = useState('')



        return(
            // <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag'>
            // <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
            <View style={styles.container}>   
            <Image style={styles.logo} source={{uri:'https://images.unsplash.com/photo-1584680226833-0d680d0a0794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'}}/>
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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
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
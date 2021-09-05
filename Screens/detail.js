import React,{useState,useEffect} from 'react'
import { SafeAreaView, View,StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView, Button, Text } from 'react-native'


const Details = ({navigation, route}) => {
    const {details} = route.params
    console.log('------------->',details)
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{details.title}</Text>
            <View style={styles.image}>
                <Image source={{uri:details.image}} style={styles.mainImage}/>
            </View>
            <ScrollView contentContainerStyle={styles.bottom}>
                    <View style={styles.innerDesc}>
                        <Text style={styles.text}>{details.description }</Text>
                    </View>
                    <View style={styles.price}>
                         <Text style={styles.priceText}>${details.price}</Text>   
                    </View>
            </ScrollView>
        </View>
    )
}
export default Details

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    image:{
        width:'100%',
        height:'40%'
    },
    mainImage:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    bottom:{
        marginTop:20,
        flexDirection:'row'
    },
    innerDesc:{
        flex:0.6
    },
    title:{
        margin:'10%',
        fontSize:25,
        fontWeight:'500',
        textAlign:'center',
        color:'grey'
    },
    text:{
        fontSize:16,
        fontWeight:'300',
        left:20
    },
    price:{
            flex:0.4
    },
    priceText:{
        textAlign:'right',
        fontSize:20,
        right:20,
        color:'blue'
    }
})
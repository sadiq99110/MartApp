import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { SafeAreaView, View,StyleSheet, ActivityIndicator, FlatList, TouchableOpacity,Text, Image } from 'react-native'
import { io } from 'socket.io-client'
import RBSheet from "react-native-raw-bottom-sheet";

const Home = ({navigation}) => {
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [newData, setNewData] = useState([])
    const [cartProducts, setCartProducts] = useState([])


    const _retrieveData = async () => {
        try {
            var id = await AsyncStorage.getItem('cartId')
            if(!id){
                console.log('cartId', id)
                navigation.navigate('QRcode')
                return
            }
          return id
        } catch (error) {
             console.log(error.message)   
        }
    }
    useEffect(() => {
        const socket = io('https://martmanagementsystembackend.herokuapp.com')
        // getData()
        // return () => {

        // }
        _retrieveData().then(res =>{
            axios.post('https://martmanagementsystembackend.herokuapp.com/api/carts/onGoing',{
                cartId:res
            }).then((res) => {
                console.log('------------',res.data)
                setNewData((prevValues)=>([
                    ...prevValues,
                    ...res.data.message
                ]))

            })
            socket.on(res,(data)=>{
                console.log(data)
                setNewData((prevValues)=>([
                    ...prevValues,
                    data
                ]))
            })

        })
    },[])

    const getData = () => {
        // const apiURL = 'https://jsonplaceholder.typicode.com/photos?_limit=206+page=1'
        // fetch(apiURL)
        // .then((res) => res.json())
        // .then((resJSON) => {
        //     // console.log(resJSON)
        //     setData(resJSON)
        // })
        axios.get('https://fakestoreapi.com/products',{
            params:{
                _limit: 10
            }
        }).then((res) => {
            setData(res.data)
            setNewData(res.data)
        })
        .catch((error) => console.log('error', error.message))
        .finally(() => setLoading(false))
    }

    const _signOut = async () => {
        try{
            await AsyncStorage.removeItem('user')
            navigation.navigate('SignIn')
        }
        catch(err) {
            alert(err)
        }
    }


    const renderItem = ({item,index}) => {
        console.log('dadsadad',item)
        return(
            <View style={styles.containerFlatList}>
        <TouchableOpacity style={
            {width:200,height:250,margin:5,}
        }>
            <Image style={styles.image} source={{uri:'data:image/jpeg;base64,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'}} resizeMode='contain' />
        </TouchableOpacity>
        </View>
        )
    }

    const renderItem2 = ({item,index}) => {
        console.log('dadsadad',item)
        return(
        //     <View style={{marginBottom:15}}>
        // <TouchableOpacity onPress={() => navigation.navigate('Details',{
        //     details:item
        // })}>
        //     <Image style={styles.image2} source={{uri:item.productImage}} resizeMode='cover' />
        // </TouchableOpacity>
        //     <View  style={styles.desc}>
        //             <View style={styles.descDescription}>
        //             <Text style={styles.innerDesc}>{item.name}</Text>
        //             </View>
        //             <View style={styles.price}>
        //             <Text style={styles.innerPrice}>${item.amount}</Text>
        //             <Text style={styles.innerPrice}>${item.quantity}</Text>
        //             </View>
        //     </View>
        // </View>
        <View style={styles.newContainer}>
            <Image style={styles.newImage} source={{uri:item.productImage}} resizeMode='cover'/>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.productName}>{item.productName}</Text>
             <Text style={styles.productAmount}>{item.amount}</Text>
             <Text style={styles.productQuantity}>{item.quantity}</Text>   
            </View>    
        </View>
        )
    }


    return (
           <SafeAreaView style={styles.container}>
               <View style={{width:'100%', height:'15%'}}>
                   <Text style={{fontSize:30,fontWeight:'800', textAlign:'right', color:'grey',marginRight:10}}
                   onPress={() => _signOut()}
                   >Logout</Text>
                    <Text style={{fontSize:15, padding:20,fontWeight:"500",color:'grey',textAlign:"center"}}>
                  Your active cart products
                    </Text>
                </View>
               {/* <View style={styles.mainContainer}>
                {
                    loading ? <ActivityIndicator size='large' color='blue' style={styles.indicator}/> 
                    :
                    (<FlatList 
                    data ={data}
                    renderItem ={renderItem}
                    keyExtractor = {item => `key-${item.id}`}
                    horizontal    
                    />)
                }
                </View> */}
            {/* <Image style={styles.image02} source={{uri:'https://images.unsplash.com/photo-1584680226833-0d680d0a0794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'}}/>     */}
            <View style={styles.mainContainer02}>
            <FlatList 
                    data ={newData}
                    renderItem ={renderItem2}
                    keyExtractor = {item => `key-${item.id}`}    
                    />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentMethod')}>
                <Text style={styles.textButton}>Proceed to checkout</Text>
            </TouchableOpacity>        
           </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    containerFlatList:{
        marginLeft:10
    },
    mainContainer:{
        width:'100%',
        height:'20%'
    },
    image:{
        width:200,
        height:200,
        borderRadius:10
    },
    image02:{
        marginTop:15,
        width:'90%',
        marginLeft:'5%',
        borderRadius:10,
        height:'25%',
        resizeMode:'cover'
    },
    mainContainer02:{
        width:'100%',
        height:'70%',
        paddingHorizontal:30,
        paddingVertical:10,
    },
    image2:{
        width:'100%',
        height:200,
        borderRadius:10,
        resizeMode:'contain'
    },
    desc:{
        flexDirection:'row',
    },
    descDescription:{
        flex:0.6
    },
    price:{
        flex:0.4
    },
    innerDesc:{
        textAlign:'left',
        marginLeft:20,
        fontSize:16,
        color:'grey'
    },
    innerPrice:{
        textAlign:'right',
        marginRight:20,
        fontSize:16,
        color:'black',
        fontWeight:'bold'
    },
    newContainer:{
        width:'100%',
        height:'auto',
        flexDirection:'row',
    },
    newImage:{
        width:100,
        height:100,
        borderRadius:20,
        marginTop:5
    },
    productName:{
        paddingTop:10,
        paddingHorizontal:10,
    },
    productAmount:{
        paddingHorizontal:10,
        fontSize:20,
        fontWeight:'bold'
    },
    productQuantity:{
        paddingHorizontal:10,
        fontSize:20,
        color:'grey',
        fontWeight:'bold'
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
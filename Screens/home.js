import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { SafeAreaView, View,StyleSheet, ActivityIndicator, FlatList, TouchableOpacity,Text, Image } from 'react-native'

const Home = ({navigation}) => {
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [newData, setNewData] = useState([])

    useEffect(() => {
        getData()
        return () => {

        }
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

    const renderItem = ({item,index}) => {
        console.log('dadsadad',item)
        return(
            <View style={styles.containerFlatList}>
        <TouchableOpacity style={
            {width:200,height:250,margin:5,}
        }>
            <Image style={styles.image} source={{uri:item.image}} resizeMode='contain' />
        </TouchableOpacity>
        </View>
        )
    }

    const renderItem2 = ({item,index}) => {
        console.log('dadsadad',item)
        return(
            <View style={{marginBottom:15}}>
        <TouchableOpacity onPress={() => navigation.navigate('Details',{
            details:item
        })}>
            <Image style={styles.image2} source={{uri:item.image}} resizeMode='cover' />
        </TouchableOpacity>
            <View  style={styles.desc}>
                    <View style={styles.descDescription}>
                    <Text style={styles.innerDesc}>{item.title}</Text>
                    </View>
                    <View style={styles.price}>
                    <Text style={styles.innerPrice}>${item.price}</Text>
                    </View>
            </View>
        </View>
        )
    }


    return (
           <SafeAreaView style={styles.container}>
               <View style={{width:'100%', height:'25%'}}>
                   <Text style={{fontSize:30,fontWeight:'800', textAlign:'center', color:'grey'}}>Cart Items</Text>
                    <Text style={{fontSize:15, padding:20,fontWeight:"500",color:'grey'}}>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available 
                    </Text>
                </View>
               <View style={styles.mainContainer}>
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
                </View>
            {/* <Image style={styles.image02} source={{uri:'https://images.unsplash.com/photo-1584680226833-0d680d0a0794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'}}/>     */}
            <View style={styles.mainContainer02}>
            <FlatList 
                    data ={data}
                    renderItem ={renderItem2}
                    keyExtractor = {item => `key-${item.id}`}    
                    />
            </View>        
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
        marginTop:10,
        height:'55%',
        marginBottom:5
    },
    image2:{
        width:'100%',
        height:200,
        borderRadius:10,
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
    }
})
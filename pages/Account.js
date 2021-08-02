import React, {useState, useEffect} from 'react'
import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, TouchableHighlight, Image, StatusBar} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import QRCode from 'react-native-qrcode-svg'

const Account = ({navigation, route}) => {


    const [data, setData] = useState([])
    const [qrdata, setQrdata] = useState("")

    useEffect(() => {
        getData()
    }, [])

    function getData(){
        let {userdata} = route.params
        setQrdata(
            "Name: " + userdata.user.f_name + " " + userdata.user.l_name + "\n" +
            "Position: " + userdata.user.user_position + "\n" + 
            "Department: " + userdata.user.user_department
        )
        console.log(qrdata)
        setData(userdata)
    }

    async function onLogout(){
        try{
            await AsyncStorage.removeItem('user_data')
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
            });
        }catch(e){
            console.log(e)
        }

    }

    return (
        <SafeAreaView
            style={{flex: 1}}
        >
            <StatusBar
                animated={true}
                backgroundColor="#a8d6ea"
            />
            <ImageBackground
                style={{
                    flex: 1,
                }}
                imageStyle={{
                    resizeMode: 'cover',
                    height: 500
                }}
                source={{
                  uri: "https://www.pylonglobal.com/assets/img/team/" + data?.user?.user_image,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        padding: 20,
                        marginBottom: -150
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 50,
                            height: 50,
                            borderRadius: 20,
                            backgroundColor: "rgba(0, 0, 0, 0.1)"
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image 
                            source={{uri: "https://raw.githubusercontent.com/wendale1231/Flick/master/assets/icons/left-arrow.png"}}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: "#FFFFFF"
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            colors={['transparent', "#a8d6ea"]}
                            style={{
                                width: "100%",
                                height: 100,
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                    />
                    <View
                        style={{
                            backgroundColor: "#a8d6ea",
                            flex: 1,
                            paddingTop: 20
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center',
                                marginBottom: 20
                            }}
                        >
                            <Text
                                style={{
                                    color: "#FFF",
                                    fontSize: 30,
                                }}
                            >{data?.user?.l_name + ", " + data?.user?.f_name}</Text>
                            <Text
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: 20,
                                }}
                            >{data?.user?.user_position}</Text>
                            <Text
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: 15
                                }}
                            >{data?.user?.user_department}</Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'center'
                            }}
                        >
                            <QRCode
                                value={qrdata ? qrdata : "loading data.."}
                                backgroundColor="#a8d6ea"
                            />
                        </View>
                        <TouchableHighlight
                            style={{
                                margin: 20,
                                backgroundColor:"#3366CC",
                                paddingTop: 20,
                                paddingBottom: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                            }}
                            onPress={() => onLogout()}
                        >
                            <Text
                                style={{
                                    color: "#FFF",
                                    fontSize: 20
                                }}
                            >Logout</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}


export default Account

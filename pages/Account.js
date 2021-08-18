import React, {useState, useEffect, useRef} from 'react'
import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, TouchableHighlight, Image, StatusBar} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import QRCode from 'react-native-qrcode-svg'
import {images} from '../assets'
import BottomSheet from 'reanimated-bottom-sheet';

const Account = ({navigation, route}) => {


    const [data, setData] = useState([])
    const [qrdata, setQrdata] = useState("")
    const sheetRef = useRef(null);
    const [isopen, setIsOpen] = useState(false)
    const renderContent = () => (
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: "#0CB0E6",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height: 150,
            padding: 10
          }}
        >
            <View
                style={{
                    alignItems: 'center'
                }}
            >
                <Image
                    style={{
                        height: 25,
                        width: 40,
                        resizeMode: 'stretch',
                        tintColor: "#FFFFFF"
                    }}
                    source={
                        isopen ? images.downarrow : images.uparrow
                    }
                />
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <TouchableHighlight
                    style={{
                        margin: 20,
                        backgroundColor:"#3366CC",
                        paddingTop: 10,
                        paddingBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '40%',
                        borderRadius: 20,
                    }}
                    onPress={() => navigation.navigate("Edit", { userdata: data })}
                >
                    <Text
                        style={{
                            color: "#FFF",
                            fontSize: 20
                        }}
                    >Edit Account</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={{
                        margin: 20,
                        backgroundColor:"#eaa8a8",
                        paddingTop: 10,
                        paddingBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '40%',
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
      );
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
                backgroundColor="#0CB0E6"
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
                        flexDirection: 'row',
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
                    <View
                        style={{
                            height: 50,
                            width: 130,
                            borderRadius: 20,
                            padding: 5,
                            backgroundColor: "rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <Image 
                            source={images.logo}
                            style={{
                                height: '100%',
                                width: '100%',
                                resizeMode: 'stretch'
                            }}
                        />
                    </View>

                </View>
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            colors={['transparent', "#3366CC"]}
                            style={{
                                width: "100%",
                                height: 100,
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                    />
                    <View
                        style={{
                            backgroundColor: "#3366CC",
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
                                backgroundColor="#3366CC"
                                color="#FFF"
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <BottomSheet
                    ref={sheetRef}
                    initialSnap={1}
                    snapPoints={[150,50]}
                    borderRadius={10}
                    renderContent={renderContent}
                    onOpenEnd={() => setIsOpen(true)}
                    onCloseEnd={() => setIsOpen(false)}
                />
        </SafeAreaView>
    )
}


export default Account

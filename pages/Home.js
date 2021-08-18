import React, {useEffect, useState, useRef} from 'react'
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {images} from '../assets'
import Animated from 'react-native-reanimated'


const HEADER_HEIGHT = 200;

const Home = ({navigation}) => {

    const [data, setData] = useState([])
    const [all_periods, setAll_periods] = useState([])
    const [refresh, setRefresh] = useState("Refresh") 
    const scrollY = useRef(new Animated.Value(0)).current
    const diffClampScrollY = Animated.diffClamp(scrollY, 150, HEADER_HEIGHT)
    const headerY = Animated.interpolateNode(diffClampScrollY, {
        inputRange: [150, HEADER_HEIGHT],
        outputRange: [200, HEADER_HEIGHT - 60]
    })
    useEffect(async () => {
        if(data.length == 0){
            try{
                let data_json = await AsyncStorage.getItem('user_data')
                setData(JSON.parse(data_json))
            }catch(e){
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                });
            }
        }else{
            // getPayroll()
        }
    }, [data])


    async function getPayroll(){
        setRefresh("Refreshing..")
        await fetch('https://sheet2api.com/v1/pGYKwE3SjqSS/wendale', {
            method: "GET",
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((d) => {
            var counter = 0;
            var periods = [];
            d.forEach((entry, index) => {
                if(entry["ID Number"] == data?.user?.company_id){
                    periods[counter] = entry
                    console.log(entry["DatePeriod"])
                }
            })
            setAll_periods(periods)
            setRefresh("Refresh")
        })
    }




    function renderTopBar(){
        return(
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#3366CC",
                    height: headerY,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    justifyContent: 'space-around',
                    zIndex: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.46,
                    shadowRadius: 11.14,
                    elevation: 17,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <View>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                marginBottom: 10,
                                fontWeight: 'bold'
                            }}
                        >WELCOME BACK!</Text>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: 35,
                                marginBottom: 5,
                            }}
                        >{data?.user?.f_name}</Text>
                        <Text
                            style={{
                                color: "#FFFFFF"
                            }}
                        >{data?.user?.user_position}</Text>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: 10
                            }}
                        >{data?.user?.user_department}</Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => data ? navigation.navigate("Account", { userdata: data }) : null}
                        >
                            <Image
                                style={{
                                    height: 120,
                                    width: 100,
                                    resizeMode: 'contain',
                                    borderRadius: 100
                                }}
                                source={{uri : "https://www.pylonglobal.com/assets/img/team/" + data?.user?.user_image}}
                            />  
                        </TouchableOpacity>
                    </View>

                </View>

            </Animated.View>
        )

    }


    function renderRefresh(){
        return(
            <Animated.View
                style={{
                    position: 'absolute',
                    zIndex: 20,
                    backgroundColor: 'rgba(255,255,255,0.99)',
                    width: '100%',
                    padding: 20,
                    marginTop: headerY,
                    height: 100
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >My Payslips:</Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#0CB0E6",
                            padding: 5,
                            borderRadius: 10,
                        }}
                        onPress={()=> getPayroll()}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                color: "#FFFFFF"
                            }}
                        >{refresh}</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }

    function RenderVersion(){
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>MyPylon v1.1.0(beta)</Text>
            </View>
        )
    }


    function renderPayslips(){
        return (
            <Animated.View
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                    }}
                >
                    <Animated.ScrollView
                        style={{
                            flex: 1,
                            padding: 20,
                            paddingTop: 300
                        }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([
                            {
                                nativeEvent: {contentOffset: {y: scrollY}}
                            }
                        ])}
                    >
                        {
                            all_periods.length > 0 && refresh != "Refreshing.." ? all_periods.map((d, index) => {
                                console.log(d)
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            backgroundColor: "#0CB0E6",
                                            borderRadius: 20,
                                            marginBottom: 20,
                                            borderColor: "#000000",
                                            borderWidth: 1,
                                            padding: 30,
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}
                                        activeOpacity={d["STATUS"] == "TRUE" ? 1 : 0.7}
                                        onPress={() => {
                                            d["STATUS"] == "TRUE" ? navigation.navigate("Payslip", { payslipData: d }) : null
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20
                                            }}
                                        >{d["Date"]}</Text>
                                        <Text>
                                            {
                                                d["STATUS"] == "TRUE" ? "Status: Released" : "Status: Pending"
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }) : refresh == "Refreshing.." ?
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1
                                }}
                            >
                                <Image
                                    source={images.loading}
                                    style={{
                                        height:  200,
                                        width: 200,
                                        resizeMode: 'stretch'
                                    }}
                                />
                            </View> :
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1
                                }}
                            >
                                <Text>No Data Available</Text>
                            </View>
                        }
                    </Animated.ScrollView>
                </Animated.View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {renderTopBar()}
            {renderRefresh()}
            {renderPayslips()}
            {RenderVersion()}
            <StatusBar
                animated={true}
                backgroundColor="#3366CC"
            />
        </View>
    )
}

export default Home

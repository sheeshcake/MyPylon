import React, {useEffect, useState, useRef} from 'react'
import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
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
            getPayroll()
        }
    }, [data])


    async function getPayroll(){
        setRefresh("Refreshing..")
        await fetch('https://spreadsheets.google.com/feeds/cells/1qBRZodHpBFARlm2CXSpcbI8fNru_-L3g9cOgmlgRobs/1/public/full?alt=json', {
            method: "GET",
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((d) => {
            // console.log(data.feed.entry)
            var all_periods = [];
            var period = "";
            var counter = -1;
            var all_data = d.feed.entry
            var datas = []
            var total_hours;
            var rate;
            var other_task;
            var holiday_pay;
            var incentives;
            var sss;
            var phic;
            var hdmf;
            var penalty;
            var total_deductions;
            var cash_advance;
            var total_pay;
            var hour = 0;
            var minute = 0;
            var sub_total = 0;
            all_data.forEach((d, i1) => {
                //getting the period
                if(d.gs$cell.inputValue.includes("Period: ")){
                    if(d.gs$cell.inputValue != period){
                        period = d.gs$cell.inputValue;
                        counter++;
                        sub_total = 0;
                        hour = 0;
                        minute = 0;
                    }
                }else{
                    //getting the id
                    if(d.gs$cell.col == 1){
                        if(d.gs$cell.inputValue == data?.user?.company_id/* this is the id number */){
                            //getting all the data of the row
                            for(var i = 0; i < all_data.length; i++){
                                if(all_data[i].gs$cell.row == d.gs$cell.row){
                                    if( all_data[i].gs$cell.col > 3 && all_data[i].gs$cell.col < 20){
                                        datas = [...datas, all_data[i].gs$cell];
                                        var time = all_data[i].gs$cell.inputValue.split(":");
                                        hour = hour + parseInt(time[0]);
                                        minute = minute + parseInt(time[1]);
                                        sub_total = sub_total + ( (parseInt(time[0] * parseInt(rate)) + ( (parseInt(time[1])/60) * parseInt(rate) ) ))
                                    }
                                    switch(all_data[i].gs$cell.col){
                                        case '3': rate = all_data[i].gs$cell.numericValue; break;
                                        // case '20': total_hours = all_data[i].gs$cell.numericValue; console.log(all_data[i].gs$cell); break;
                                        // case '21': sub_total = all_data[i].gs$cell.numericValue; console.log(all_data[i].gs$cell); break;
                                        case '22': other_task = all_data[i].gs$cell.numericValue; break;
                                        case '23': incentives = all_data[i].gs$cell.numericValue; break;
                                        case '24': holiday_pay = all_data[i].gs$cell.numericValue; break;
                                        case '25': sss = all_data[i].gs$cell.numericValue; break;
                                        case '26': phic = all_data[i].gs$cell.numericValue; break;
                                        case '27': hdmf = all_data[i].gs$cell.numericValue; break;
                                        case '28': penalty = all_data[i].gs$cell.numericValue; break;
                                        case '30': total_deductions = all_data[i].gs$cell.numericValue; break;
                                        case '29': cash_advance = all_data[i].gs$cell.numericValue; break;
                                        case '31': total_pay = all_data[i].gs$cell.numericValue; break;
                                    }
                                }
                            }
                            //append to all periods
                            all_periods[counter] = {
                                "period": period,
                                "data": datas,
                                'rate': rate,
                                'total_hours': hour + "hrs " + minute + "mins",
                                'sub_total': sub_total,
                                'other_task': other_task,
                                'incentives': incentives,
                                'holiday_pay': holiday_pay,
                                'sss': sss,
                                'phic': phic,
                                'hdmf': hdmf,
                                'penalty': penalty,
                                'total_deductions': total_deductions,
                                'cash_advance': cash_advance,
                                'total_pay': total_pay,
                            };
                            datas = [];
                        }
                    }
                }
            })
            setAll_periods(all_periods) // output for data
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
                            backgroundColor: "#4154f1",
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
                <Text>MyPylon v1.0.0(beta)</Text>
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
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            backgroundColor: "#daf2fc",
                                            borderRadius: 20,
                                            marginBottom: 20,
                                            borderColor: "#000000",
                                            borderWidth: 1,
                                            padding: 30,
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}
                                        onPress={() => {
                                            d?.data?.length ? navigation.navigate("Payslip", { payslipData: d }) : null
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20
                                            }}
                                        >{d?.period}</Text>
                                        <Text>
                                            {
                                                d?.data?.length ? "Status: Released" : "Status: Pending"
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

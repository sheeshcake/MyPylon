import React, { useEffect, useState, useRef} from 'react'
import { Animated, View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';

const Payslip = ({navigation, route}) => {
    
    const [payslipdata, setPaySlipData] = useState([])
    const header_h = useRef(new Animated.Value(100)).current
    const [start_day, setStartDay] = useState(0)

    useEffect(() => {
        let { payslipData } = route.params
        let period = payslipData?.period
        setStartDay(period.split(" ")[3].split("-")[0])
        setPaySlipData(payslipData)
    }, [])
    
    function renderTopBar(){
        return(
            <Animated.View
                style={{
                    backgroundColor: "#3366CC",
                    height: header_h,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    justifyContent: 'space-around',
                    marginBottom: -20,
                    zIndex: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.46,
                    shadowRadius: 11.14,
                    elevation: 17,
                    transition: '0.5s'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}
                >
                    <View>
                        <TouchableOpacity
                            style={{
                                borderRadius: 20,
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: "#FFFFFF"
                                }}
                                source={{uri: "https://raw.githubusercontent.com/wendale1231/Flick/master/assets/icons/left-arrow.png"}}
                            />
                        </TouchableOpacity>

                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#FFFFFF"
                            }}
                        >{payslipdata?.period}</Text>
                    </View>

                </View>

            </Animated.View>
        )


    }
    

    function renderData(){
        return(
            <View
                style={{
                    borderRadius: 30,
                    marginTop: 20,
                    marginBottom: 50,
                    padding: 10
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        marginBottom: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20
                        }}
                    >
                        Summary
                    </Text>
                </View>
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell>Total Hours</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.total_hours}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Rate Per Hour</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.rate}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Sub Total Pay</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.sub_total}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Other Task</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.other_task}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Incentives</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.incentives}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Holiday Pay</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.holiday_pay}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>SSS</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.sss}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>PHIC</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.phic}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>HDMF</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.hdmf}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Penalty</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.penalty}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Cash Advance</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.cash_advance}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Total Deductions</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.total_deductions}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Total Pay</DataTable.Cell>
                        <DataTable.Cell>{payslipdata.total_pay}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        borderTopWidth: 1,
                        borderTopColor: "#000000",
                        marginBottom: 20,
                        paddingTop: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20
                        }}
                    >
                        Daily Data
                    </Text>
                </View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title>Duration</DataTable.Title>
                    </DataTable.Header>
                    { payslipdata?.data?.map((item, index) => {
                        const date = parseInt(index) + parseInt(start_day)
                        const duration = item.inputValue.split(":")
                        return(
                            <DataTable.Row
                                key={index}
                            >
                                <DataTable.Cell>{payslipdata?.period.split(" ")[2] + " " + date}</DataTable.Cell>
                                <DataTable.Cell>{duration[0] + "hr " + duration[1] + " min" }</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
            </View>
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
    
    
    return (
        <View
            style={{
                flex: 1
            }}
        >
            <StatusBar
                animated={true}
                backgroundColor="#3366CC"
            />
            {renderTopBar()}
            <ScrollView
                style={{
                    paddingTop: 20,
                    paddingBottom: 20
                }}
                onScroll={(event) => {
                    const scrolling = event.nativeEvent.contentOffset.y;
                    console.log(scrolling)
                    if(scrolling > 70){
                        Animated.timing(
                            header_h,
                                {
                                    toValue: 70,
                                    duration: 120,
                                    useNativeDriver: false
                                }
                        ).start();
                    }else{
                        Animated.timing(
                            header_h,
                                {
                                    toValue: 100,
                                    duration: 120,
                                    useNativeDriver: false
                                }
                        ).start();
                    }
                }}
            >
                {renderData()}
            </ScrollView>
            {RenderVersion()}
        </View>
    )
}

export default Payslip

import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {

    const [data, setData] = useState()
    const [all_periods, setAll_periods] = useState([])

    useEffect(async () => {
        getPayroll()
        try{
            setData(await AsyncStorage.getItem('user_data'))
        }catch(e){
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
            });
        }
    }, [])

    async function getPayroll(){
        await fetch('https://spreadsheets.google.com/feeds/cells/1qBRZodHpBFARlm2CXSpcbI8fNru_-L3g9cOgmlgRobs/1/public/full?alt=json', {
            method: "GET",
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            // console.log(data.feed.entry)
            var all_periods = [];
            var period = "";
            var counter = -1;
            var all_data = data.feed.entry
            var datas = []
            var total_hours;
            var sub_total;
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
            all_data.forEach((d, i1) => {
                //getting the period
                if(d.gs$cell.inputValue.includes("Period: ")){
                    if(d.gs$cell.inputValue != period){
                        period = d.gs$cell.inputValue;
                        counter++;
                        all_periods[counter] = {"period":period}
                    }
                }else{
                    //getting the id
                    if(d.gs$cell.col == 1){
                        if(d.gs$cell.inputValue == 3/* this is the id number */){
                            //getting all the data of the row
                            for(var i = 0; i < all_data.length; i++){
                                console.log(all_data[i].gs$cell)
                                if(all_data[i].gs$cell.row == d.gs$cell.row && all_data[i].gs$cell.col > 3 && all_data[i].gs$cell.col < 20){
                                    datas = [...datas, all_data[i].gs$cell];
                                }
                                switch(all_data[i].gs$cell.col){
                                    case '20': total_hours = all_data[i].gs$cell.numericValue; break;
                                    case '22': sub_total = all_data[i].gs$cell.numericValue; break;
                                    case '23': other_task = all_data[i].gs$cell.numericValue; break;
                                    case '24': incentives = all_data[i].gs$cell.numericValue; break;
                                    case '25': holiday_pay = all_data[i].gs$cell.numericValue; break;
                                    case '26': sss = all_data[i].gs$cell.numericValue; break;
                                    case '27': phic = all_data[i].gs$cell.numericValue; break;
                                    case '28': hdmf = all_data[i].gs$cell.numericValue; break;
                                    case '29': penalty = all_data[i].gs$cell.numericValue; break;
                                    case '30': total_deductions = all_data[i].gs$cell.numericValue; break;
                                    case '31': cash_advance = all_data[i].gs$cell.numericValue; break;
                                    case '32': total_pay = all_data[i].gs$cell.numericValue; break;
                                }
                            }
                            //append to all periods
                            all_periods[counter] = {...all_periods[counter] , 
                                "data": datas,
                                'total_hours': total_hours,
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
            console.log(all_periods.reverse())
            setAll_periods(all_periods.reverse()) // output for data
        })
    }


    return (
        <View>
            <Text>{data}</Text>
            <Text>{JSON.stringify(all_periods)}</Text>
        </View>
    )
}

export default Home

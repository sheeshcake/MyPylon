import React, { useState, useEffect} from 'react'
import { View, Text, Image, SafeAreaView, ScrollView, TextInput, Button, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../assets';

const Login = ({navigation}) => {


useEffect(() => {
    getData()
}, [])

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [buttonText, setButtonText] = useState("Login")
const [buttonStatus, setButtonStatus] = useState(false)


async function onLogin(){
    setButtonStatus(true)
    setButtonText("Logging in....")
    await fetch('https://www.pylonglobal.com/api/login', {
        method: "POST",
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then((response) => response.json())
    .then((json) => {
        console.log(json.data)
        if(!json.success){
            alert(json.data)
            setButtonStatus(false)
            setButtonText("Login")
        }else{
            saveData(json.data)
        }
    })
}

async function saveData(data){
    try {
        await AsyncStorage.setItem('user_data', JSON.stringify(data))
        navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
        });
    } catch (e) {
        console.log("trying again..")
    }

}

async function getData(){
    try {
        const value = await AsyncStorage.getItem('user_data')
        if(value !== null){
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
            });
        }
    } catch (e) {
        console.log("trying again..")
    }
}

function RenderHeader(){
    return (
        <View
            style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }}
        >
            <Image 
                source={images.logo}
            />
        </View>
    )
}

function RenderForm(){
    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 200,
            }}
        >
            <View
                style={{
                    marginTop: 30,
                    padding: 30,
                    borderRadius: 30,
                    backgroundColor: "#FFFFFF",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            marginBottom: 30
                        }}
                    >Login</Text>
                    <View
                        style={{
                            borderColor: "#dbdbdb",
                            borderWidth: 1,
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    >
                        <TextInput
                            style={{
                                width: 300,
                                height: 40
                            }}
                            placeholder="Username"
                            onChangeText={setUsername}
                            value={username}
                        />
                    </View>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        marginBottom: 20,
                    }}
                >
                    <View
                        style={{
                            borderColor: "#dbdbdb",
                            borderWidth: 1,
                            borderRadius: 10,
                        }}
                    >
                        <TextInput
                            style={{
                                width: 300,
                                height: 40
                            }}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </View>
                </View>
                <Button 
                    style={{
                        borderRadius: 20
                    }}
                    disabled={buttonStatus}
                    title={buttonText}
                    onPress={onLogin}
                />
            </View>
            

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
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#daf2fc"
            }}
        >
            <StatusBar
                animated={true}
                backgroundColor="#daf2fc"
            />
            {RenderHeader()}
            <ScrollView>
                {RenderForm()}
            </ScrollView>
            {RenderVersion()}
        </SafeAreaView>
    )
}

export default Login

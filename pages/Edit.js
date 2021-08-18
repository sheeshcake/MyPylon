import React, {useEffect, useState, useRef} from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, Button } from 'react-native'
import {images} from '../assets'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {

    const [id, setID] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [show, setShow] = useState(false)
    const [buttonText, setButtonText] = useState("Update")
    const [buttonStatus, setButtonStatus] = useState(false)
    useEffect(() => {
        if(id == ""){
            getData()
        }
    }, [id])
    async function getData(){
        let data_json = await AsyncStorage.getItem('user_data')
        console.log(data_json)
        let userdata = JSON.parse(data_json)
        setUsername(userdata.user.username)
        setPassword(userdata.user.plain_password)
        setEmail(userdata.user.email)
        setID(userdata.user.id)
    }

    async function onUpdate(){
        setButtonStatus(true)
        setButtonText("Updating....")
        console.log(id, username, password, email)
        await fetch('https://www.pylonglobal.com/api/update', {
            method: "POST",
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                username: username,
                password: password,
                email: email
            })
        }).then((response) => response.json())
        .then((json) => {
            if(!json.success){
                alert(json.data)
                setButtonStatus(false)
                setButtonText("Update")
            }else{
                alert("User Updated!")
                setButtonStatus(false)
                setButtonText("Update")
                saveData(json.data)
            }
        })
    }

    async function saveData(data){
        try {
            await AsyncStorage.setItem('user_data', JSON.stringify(data))
            navigation.goBack()
        } catch (e) {
            console.log("trying again..")
        }
    
    }

    function renderHeader(){
        return (
            <View
                style={{
                    height: 100,
                    justifyContent: 'center',
                    backgroundColor:"#0CB0E6"
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 20,
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
            </View>
        )
    }

    function renderDetails(){
        return (
            <View
                style={{
                    flex: 1,
                    margin: 20
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            padding: 10
                        }}
                    >
                        <Text>Username</Text>
                    </View>
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
                                height: 40,
                                color: 'black',
                                alignSelf: 'stretch',
                            }}
                            placeholder="Username"
                            onChangeText={setUsername}
                            value={username}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            padding: 10
                        }}
                    >
                        <Text>Password</Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderColor: "#dbdbdb",
                            borderWidth: 1,
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    >
                    <TextInput
                        style={{
                            height: 40,
                            width: '80%',
                            color: 'black',
                            alignSelf: 'stretch',
                        }}
                        placeholder="Username"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={!show}
                    />
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                                borderRadius: 20,
                                backgroundColor: "rgba(0, 0, 0, 0.1)"
                            }}
                            onPress={() => setShow(!show)}
                        >
                            <Image 
                                source={show ? images.eyeclose : images.eyeopen}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            padding: 10
                        }}
                    >
                        <Text>Email</Text>
                    </View>
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
                                height: 40,
                                color: 'black',
                                alignSelf: 'stretch',
                            }}
                            placeholder="Username"
                            onChangeText={setEmail}
                            value={email}
                        />
                    </View>
                </View>
                <Button 
                    title={buttonText}
                    disabled={buttonStatus}
                    onPress={onUpdate}
                />
            </View>
        )
    }


    return (
        <View
            style={{
                flex: 1
            }}
        >
            {renderHeader()}
            <ScrollView>
                {renderDetails()}
            </ScrollView>
            
        </View>
    )
}

export default Edit

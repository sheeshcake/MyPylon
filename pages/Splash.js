import React from 'react'
import { View } from 'react-native'
import Video from 'react-native-video'
import {videos} from '../assets';

const Splash = ({navigation}) => {

    setTimeout (() => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
        });
      }, 4000); 

    return (
        <View
            style={{
                flex: 1,
                height: '100%',
                width: '100%'
            }}
        >
            <Video source={videos.splash}
                style={{position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 1}}
                muted={true}
                repeat={true}
                resizeMode="cover"       
          />
        </View>
    )
}

export default Splash

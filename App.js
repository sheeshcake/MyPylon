
import React, {useEffect} from 'react';
import { Login, Home, Payslip, Account, Edit, Splash } from "./pages";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';


const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Splash'}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Account"
          component={Account}
        />
        <Stack.Screen
          name="Payslip"
          component={Payslip}
      />
        <Stack.Screen
          name="Edit"
          component={Edit}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
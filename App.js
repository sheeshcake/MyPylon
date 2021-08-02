
import React from 'react';
import { Login, Home, Payslip, Account } from "./pages";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Login'}
      >
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

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
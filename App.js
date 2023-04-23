import React, {useState, useEffect, useMemo} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './context';
import Button from 'react-bootstrap/Button';

import Login from './components/views/login'
import RestaurantScreen from './components/screens/restaurantScreen'
import 'bootstrap/dist/css/bootstrap.min.css';

const Tab = createBottomTabNavigator();

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  const AuthStack = createNativeStackNavigator();
  const Stack = createBottomTabNavigator();

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setSignedIn(true)
      },
      signOut: () => {
        setSignedIn(false)
      }
    } 
  },[]);

  const AuthStackScreen = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false, headerMode: 'none'}}>
      <AuthStack.Screen name="Login" component={Login}/>
    </AuthStack.Navigator>
  );
  
  
  const StackScreen = () => (
    <Stack.Navigator>
      <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={{headerRight: () => (
        <Button
          onClick={() => handleSignOut()}
          variant="rdelivery" type="Button"
          className="me-2"
        >
          Logout
        </Button>
      )
    }}/>
    </Stack.Navigator>
  );

  useEffect(() => {

    async function getIsSignedIn() {
      try {
        const user = await AsyncStorage.getItem('@user');
        const isSignedIn = user != undefined &&  Object.keys(user).length !== 0 ? true : false;
        setSignedIn(isSignedIn);
      }
      catch(e){
        alert(e.message);
      }
    };

    getIsSignedIn();

  },[signedIn]);

  const handleSignOut = () => {
    deleteUser();
  };

  const deleteUser = async (user) => {
    try{
        await AsyncStorage.removeItem('@user')
        setSignedIn(false);
    }
    catch(e){
        alert(e.message);
    }
  };

  return (
    <AuthContext.Provider value ={authContext}>
      <style type="text/css">
            {`
                .btn-rdelivery {
                    background-color: #DA583B;
                    color: white;
                }
            `}
      </style>
      <NavigationContainer>
        {signedIn ? (
            <StackScreen/>
          ) : (
            <AuthStackScreen/>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

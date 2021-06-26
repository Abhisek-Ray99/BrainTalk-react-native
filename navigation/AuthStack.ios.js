import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign'; 

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

const AuthStack = ({navigation}) => {

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadylaunched').then((value) => {
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    })

  },[]);


  if(isFirstLaunch === null){
    return null;
  }else if(isFirstLaunch === true){
    routeName = "Onboarding";
  }else{
    routeName = "Login";
  }

  return(
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <AntDesign.Button
                name="arrowleft"
                size={30}
                backgroundColor='#fff'
                color='#000000'
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          )
        })}
      />
    </Stack.Navigator>
  )
  
}

export default AuthStack;
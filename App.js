import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './navigation/SignIn';
import SignUp from './navigation/SignUp';
import Profile from './navigation/Profile';
import MainContainer from './navigation/MainContainer';
import AdminButtons from './navigation/AdminButtons';
import AdminPage from './navigation/AdminPage';
import Splash from './navigation/SplashScreen';
import AdminLogIn from './navigation/AdminLogIn';
import BorrowBooks from './navigation/BorrowBooks';
import ChatBot from './navigation/Chatbot';

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ headerShown: false}}>
      <Stack.Screen
      name = 'Splash'
      component={Splash}
      />

        <Stack.Screen
        name = 'SignIn'
        component={SignIn}
        />

        {/*
        <Stack.Screen
        name='Main'
        component={MainContainer}/> */}

        <Stack.Screen
        name='Main'
        component={MainContainer}/>

        <Stack.Screen
        name='SignUp'
        component={SignUp}/>

        <Stack.Screen
        name='AdminLogIn'
        component={AdminLogIn}/>
        
        <Stack.Screen
        name='AdminButtons'
        component={AdminButtons}/>
        
        <Stack.Screen
        name='AdminPage'
        component={AdminPage}/>
        
        <Stack.Screen
        name='BorrowBooks'
        component={BorrowBooks}/>
  


      </Stack.Navigator>
    </NavigationContainer>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

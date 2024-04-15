import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatBot from "./Chatbot";
import Profile from "./Profile";
import BorrowBooks from "./BorrowBooks";

const Tab = createBottomTabNavigator();
const chatName = 'Chat'
const borrowName = 'Borrow Books'
const profileName = 'Profile'

export default function MainContainer(){
    return(
        <NavigationContainer
        independent={true}>
            <Tab.Navigator
            initialRouteName={chatName}>
                <Tab.Screen name = {chatName} component={ChatBot} options = {{headerShown:false}}/>
                <Tab.Screen name = {borrowName} component={BorrowBooks} options = {{headerShown:false}}/>
                <Tab.Screen name = {profileName} component={Profile} options = {{headerShown:false}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
} 
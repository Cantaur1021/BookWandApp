import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatBot from "./Chatbot";
import Profile from "./Profile";
import BorrowBooks from "./BorrowBooks";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const chatName = 'Chat'
const borrowName = 'Borrow Books'
const profileName = 'Profile'

export default function MainContainer() {
    return (
        <NavigationContainer
            independent={true}>
            <Tab.Navigator
                initialRouteName={chatName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name

                        if (rn == chatName) {
                            iconName = focused ? 'chatbox' : 'chatbox-outline'
                        }
                        else if (rn == borrowName) {
                            iconName = focused ? 'list-circle' : 'list-circle-outline'
                        }
                        else if (rn == profileName) {
                            iconName = focused ? 'man' : 'man-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}




            >
                <Tab.Screen name={chatName} component={ChatBot} options={{ headerShown: false }} />
                <Tab.Screen name={borrowName} component={BorrowBooks} options={{ headerShown: false }} />
                <Tab.Screen name={profileName} component={Profile} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
} 
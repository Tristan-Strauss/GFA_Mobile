import Ionicicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: "#ffd33d",
        }}
        >
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: "Home",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="resources" 
                options={{ 
                    title: "Resources",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicicons name={focused ? "book-sharp" : "book-outline"} color={color} size={24} />
                    )
                }}
            />
            <Tabs.Screen 
                name="principals"
                options={{
                    title: "Principals",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicicons name={focused ? "albums-sharp" : "albums-outline"} color={color} size={24} />
                    )
                }}
            />
            {/* <Tabs.Screen 
                name="calendar"
                options={{
                    title: "Calendar",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicicons name={focused ? "calendar-sharp" : "calendar-outline"} color={color} size={24}/>
                    )
                }}
            /> */}
            <Tabs.Screen 
                name="about" 
                options={{
                    title: "About",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicicons name={focused ? "information-circle-sharp" : "information-circle-outline"} color={color} size={24} />
                    )
                }} 
            />
        </Tabs>
    )
}
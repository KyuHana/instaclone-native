import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import {Ionicons} from '@expo/vector-icons';
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import Me from "../screens/Me";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator()

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "white",
        style: {
          borderTopColor: "rgba(255,255,255,0.3)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen 
        name="Feed" 
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
              iconName={"home"}
              color={color}
              focused={focused}
            />
          ),
        }} 
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen 
        name="Search" 
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
              iconName={"search"}
              color={color}
              focused={focused}
            />
          ),
        }} 
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Camera"
        component={View}
        options={{  
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
              iconName={"camera"}
              color={color}
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen 
        name="Notifications" 
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
                iconName={"heart"}
                color={color}
                focused={focused}
              />
          )
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen 
        name="Me" 
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
                iconName={"person"}
                color={color}
                focused={focused}
              />
          )
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator> 
  )
}
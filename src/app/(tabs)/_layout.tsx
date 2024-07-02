import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          borderTopColor: "transparent",
          height: 70,
          paddingVertical: 10,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon(props) {
            return <Ionicons name="home-outline" size={24} {...props} />;
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon(props) {
            return <Ionicons name="settings-outline" size={24} {...props} />;
          },
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

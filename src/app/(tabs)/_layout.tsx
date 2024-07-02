import { Tabs, router } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerRight: () => {
          return (
            <Pressable onPress={()=>{
                router.push("/settings")
            }}>
              <Ionicons
                name="settings-outline"
                size={24}
                className="mr-4 font-bold"
              />
            </Pressable>
          );
        },
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
            name="projects"
            options={{
            title: "Projects",
            tabBarIcon(props) {
                return <Ionicons name="folder-outline" size={24} {...props} />;
            },
            }}
        />
    </Tabs>
  );
};

export default TabsLayout;

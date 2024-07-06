import { Tabs, router } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
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
          title: "Projects",
          tabBarIcon(props) {
            return <Ionicons name="file-tray-full" size={24} {...props} />;
          },
        }}
      />
        <Tabs.Screen
            name="forms_to_fill"
            options={{
            title: "Forms to Fill",
            tabBarIcon(props) {
                return <Ionicons name="documents-outline" size={24} {...props} />;
            },
            }}
        />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon(props) {
            return <Ionicons
            name="settings-outline"
            size={24}
            {...props}
          />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

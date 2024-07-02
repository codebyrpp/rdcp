import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <AppStack>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="settings" options={{
        title: "Settings",
        headerShown: true,
      }} />
    </AppStack>
  ) : (
    <AppStack>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" options={{}} />
    </AppStack>
  );
};

const AppStack = ({ children }) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: "fade",
        statusBarStyle: "dark",
        statusBarTranslucent: true,
      }}
    >
      {children}
    </Stack>
  );
};

export default function AppLayout() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

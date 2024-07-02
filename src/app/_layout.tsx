import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: "fade",
        statusBarStyle: "dark",
        statusBarTranslucent: true,
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="login" />
      )}
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

import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Layout = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <AppStack>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="forms/[id]"/>
    </AppStack>
  ) : (
    <AppStack>
      <Stack.Screen name="index" />
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
    <Provider store={store}>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Provider>
  );
}

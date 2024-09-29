import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export type AppStackProps = {
  children: React.ReactNode;
};

export const AppStack = ({ children }: AppStackProps) => {
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

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <Provider store={store}>
        <AppStack>
          <Stack.Screen name="login" />
          <Stack.Screen name="(app)" />
        </AppStack>
    </Provider>
  );
}

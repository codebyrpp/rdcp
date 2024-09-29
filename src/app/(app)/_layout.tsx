import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { AppStack } from "../_layout";
import { Redirect, Stack, router } from "expo-router";
import { useEffect } from "react";


export default function AppLayout() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <AppStack>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="forms/[id]" />
    </AppStack>
  );
}

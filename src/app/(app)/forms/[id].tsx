import ViewForm from "@/components/features/view_form";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";

interface FormScreenProps {
  id: string;
}

function FormScreen({ id }: FormScreenProps) {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      // Prompt the user before leaving the screen
      // Prompt the user before leaving the screen
      Alert.alert(
        "Discard changes?",
        "You have unsaved changes. Are you sure to discard them and leave the screen?",
        [
          { text: "Don't leave", style: "cancel", onPress: () => { } },
          {
            text: "Discard",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: `${"Form 1"}`,
          headerShown: true,
        }} />
      <ViewForm />
    </>
  );
}

export default FormScreen;

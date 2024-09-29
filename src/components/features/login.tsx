// app/login.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as LocalAuthentication from "expo-local-authentication";
import { TextButton } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const [isFingerprintAvailable, setIsFingerprintAvailable] = useState(false);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then((result) => {
      if (result) {
        LocalAuthentication.isEnrolledAsync().then((result) => {
          setIsFingerprintAvailable(result);
        });
      }
    });
  }, []);

  const handleLogin = async () => {
    // Perform your login logic here
    const success = await login(email, password);
    if (success) {
      router.replace("/");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleFingerprintLogin = () => {
    LocalAuthentication.authenticateAsync({
      promptMessage: "Login with fingerprint",
    }).then((result) => {
      if (result.success) {
        // Perform your login logic here
        handleLogin();
      } else {
        alert("Fingerprint authentication failed");
      }
    });
  };

  return (
    <View className="flex-1 justify-center px-8">
      <Text className="text-5xl font-bold mb-2 text-center text-slate-900">Welcome!</Text>
      <Text className="text-center mb-8">Login to access your projects</Text>
      <View className="flex gap-2 items-center flex-row border mb-4 rounded-lg p-2 ">
        {/* email icon */}

        <TextInput
          placeholder="Email"
          className="flex-1"
          value={email}
          onChangeText={setEmail}
        />
        <Ionicons name="mail" size={20} className="mb-0 p-0" />
      </View>
      <View className="flex gap-2 flex-row items-center border mb-4 rounded-lg p-2 ">
        {/* email icon */}

        <TextInput
          placeholder="Password"
          className="flex-1"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Ionicons name="eye" size={20} className="mb-0 p-0" />
      </View>
      {/* <Text className="text-red-500 mb-4">Invalid email or password!</Text> */}
      <TextButton text="Login" onPress={handleLogin} />
    
      {isFingerprintAvailable && (
        <Pressable onPress={handleFingerprintLogin}>
          <View className="flex flex-row justify-center mt-8">
            <View className="w-fit border flex flex-row rounded-lg p-3">
              <Ionicons name="finger-print" size={24} />
              <Text className="ml-2">Login with fingerprint</Text>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
}

// app/login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    // Perform your login logic here
    login();
    router.replace("/home");
  };

  return (
    <View className="flex-1 justify-center px-8">
      <Text className="text-5xl font-bold mb-2 text-center">Welcome!</Text>
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
      <Pressable className="bg-black p-4 rounded-lg" onPress={handleLogin}>
        <Text className="text-center text-white font-bold">Login</Text>
      </Pressable>
      <Pressable
        className="text-blue-500 mt-4"
        onPress={() => router.push("/forgot-password")}
      >
        <Text className="text-center underline">Forgot password?</Text>
      </Pressable>
      <View className="flex flex-row justify-center mt-8">
        <Text className="text-center">Don't have an account?</Text>
        <Pressable
          className="text-blue-500 ml-2"
          onPress={() => router.push("/register")}
        >
          <Text className="font-bold underline">Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

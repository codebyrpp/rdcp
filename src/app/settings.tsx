import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from '@/context/AuthContext';

export default function Settings() {
    const { logout } = useAuth();
    const handleLogout = () => {
      logout();
      router.replace("/login");
    };
  return (
    <View className="flex px-5 gap-4 mt-6">
        {/* add fingerprint */}
        <View className="flex flex-row gap-4">
          <View className="flex justify-center">
            <Ionicons name="finger-print" size={24} />
          </View>
          <View>
            <Text className="text-lg font-bold">Add fingerprint</Text>
            <Text className="text-gray-500 font-bold">Secure your account</Text>
          </View>
        </View>
        <Pressable onPress={handleLogout}>
          <View className="flex flex-row gap-4">
            <View className="flex justify-center">
              {/* back icon */}
              <Ionicons name="exit-outline" size={24} />
            </View>
            <View>
              <Text className="text-lg font-bold">Log out</Text>
              <Text className="text-gray-500 font-bold">
                rajivapitiwaduge@gmail.com
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
  )
}

const styles = StyleSheet.create({})
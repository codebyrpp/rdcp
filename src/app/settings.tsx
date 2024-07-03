import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const FingerprintSetup = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);

  const handleFingerprintSetup = () => {
    // ask to setup fingerprint using modal
    setIsModalVisible(true);
    // if user agrees, console.log("Fingerprint setup successful")
  };

  const enableFingerprint = () => {
    setIsEnabled(true);
    setIsModalVisible(false);
  };

  const disableFingerprint = () => {
    setIsEnabled(false);
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal animationType="slide" visible={isModalVisible} transparent={true}>
        <View
          className="flex justify-center items-center w-full h-1/4 bg-white p-6 
          absolute bottom-0 shadow elevation-1 rounded-xl"
        >
          <Text className="text-lg font-bold">
            Do you want to set up fingerprint?
          </Text>
          <Text className="text-gray-500 font-bold text-center px-3 my-2">
            You will be able to login using fingerprints added in your device
          </Text>
          <View className="flex flex-row gap-3 mt-3">
            <Pressable
              className="p-2 rounded-lg bg-green-400 w-12"
              onPress={enableFingerprint}
            >
              <Text className="font-bold text-center">Yes</Text>
            </Pressable>
            <Pressable
              className="p-2 rounded-lg bg-red-400 font-bold text-white w-12"
              onPress={disableFingerprint}
            >
              <Text className="font-bold text-center">No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* add fingerprint */}
      <Pressable onPress={handleFingerprintSetup}>
        <View className="flex flex-row gap-4">
          <View className="flex justify-center">
            <Ionicons name="finger-print" size={24} />
          </View>
          {isEnabled ? (
            <View>
              <Text className="text-lg font-bold">Setup Fingerprint Login</Text>
              <Text className="text-gray-500 font-bold">
                Easier access to your account
              </Text>
            </View>
          ) : (
            <View>
              <Text className="text-lg font-bold">
                Remove Fingerprint Login
              </Text>
              <Text className="text-gray-500 font-bold">
                Disable fingerprint login for this device
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </>
  );
};

export default function Settings() {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  return (
    <View className="flex px-5 gap-4 mt-6">
      {/* add fingerprint */}
      <FingerprintSetup />
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
  );
}

const styles = StyleSheet.create({});

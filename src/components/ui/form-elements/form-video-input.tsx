import React, { useState } from "react";
import { Button, Image, View, StyleSheet, Text, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FormInput, { FormInputProps } from "./form-input";
import Ionicons from "@expo/vector-icons/Ionicons";

interface VideoFileInputProps extends FormInputProps {}

export default function VideoFileInput(props: VideoFileInputProps) {
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  // remove selected image
  const removeVideo = () => {
    setVideo(null);
  };

  return (
    <FormInput {...props}>
      {video && (
        <View className="flex">
          <View className="relative">
            {/* close icon */}
            <Pressable
              onPress={removeVideo}
              className="absolute z-10 right-2 top-2 
              bg-black p-1 rounded-full shadow elevation-1 border"
            >
              <Ionicons name="close" size={20} color="white" />
            </Pressable>
            {/* Image file name */}
            <Text className="mt-2 text-center text-gray-500">
              {video.split("/").pop()}
            </Text>
          </View>
        </View>
      )}
      {!video && (
        <View className="flex sm:flex-row gap-2 sm:gap-4">
          {/* Pick image from camera roll */}
          <Pressable
            onPress={pickVideo}
            className="flex flex-row items-center gap-2 p-2 rounded-lg bg-gray-200"
          >
            <Ionicons name="film" size={24} color="black" />
            <Text>Pick a video from camera roll</Text>
          </Pressable>
          {/* Capture image */}
          <Pressable
            onPress={captureImage}
            className="flex flex-row items-center gap-2 p-2 rounded-lg bg-gray-200"
          >
            <Ionicons name="camera" size={24} color="black" />
            <Text>Capture video</Text>
          </Pressable>
          {/* Remove image */}
        </View>
      )}
    </FormInput>
  );
}

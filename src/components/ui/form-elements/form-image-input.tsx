import React, { useState } from "react";
import { Button, Image, View, StyleSheet, Text, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FormInput, { FormInputProps } from "./form-input";
import Ionicons from "@expo/vector-icons/Ionicons";


interface ImageFileInputProps extends FormInputProps {
}

export default function ImageFileInput(props : ImageFileInputProps) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // remove selected image
  const removeImage = () => {
    setImage(null);
  };

  return (
    <FormInput {...props}>
      {image && (
        <View className="flex">
          <View className="relative">
            {/* close icon */}
            <Pressable
              onPress={removeImage}
              className="absolute z-10 right-2 top-2 
              bg-black p-1 rounded-full shadow elevation-1 border"
            >
              <Ionicons name="close" size={20} color="white" />
            </Pressable>
            <Image
              source={{ uri: image }}
              className="h-72 w-full rounded-lg border border-gray-500"
            />
            {/* Image file name */}
            <Text className="mt-2 text-center text-gray-500">
              {image.split("/").pop()}
            </Text>
          </View>
        </View>
      )}
      {!image && (
        <View className="flex flex-row gap-4">
          {/* Pick image from camera roll */}
          <Pressable
            onPress={pickImage}
            className="flex flex-row items-center gap-2 p-2 rounded-lg bg-gray-200"
          >
            <Ionicons name="image" size={24} color="black" />
            <Text>Pick an image from camera roll</Text>
          </Pressable>
          {/* Capture image */}
          <Pressable
            onPress={captureImage}
            className="flex flex-row items-center gap-2 p-2 rounded-lg bg-gray-200"
          >
            <Ionicons name="camera" size={24} color="black" />
            <Text>Capture an image</Text>
          </Pressable>
          {/* Remove image */}
        </View>
      )}
    </FormInput>
  );
}

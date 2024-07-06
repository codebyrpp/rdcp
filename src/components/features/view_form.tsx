import React, { useState } from "react";
import { View, TextInput, Text, Image, Button } from "react-native";
import ImageFileInput from "../ui/form-elements/form-image-input";
import FormInput from "../ui/form-elements/form-input";
import TextInputForm from "../ui/form-elements/form-text-input";
import VideoFileInput from "../ui/form-elements/form-video-input";
import DropdownInput from "../ui/form-elements/form-dropdown";

const ViewForm = () => {
  return (
    <View className="p-4 flex gap-4">
      <TextInputForm
        question="What is your name?"
        description="This is a text input field."
        isRequired={true}
        errorMessages={["This field is required.", "Please enter a valid name."]}
      />
      <DropdownInput
        question="What is your favorite color?"
        description="This is a dropdown input field."
      />
      <ImageFileInput
        question="Pick an image"
        description="This is an image input field."
       />
      <VideoFileInput
        question="Pick a video"
        description="This is a video input field."
        isRequired={true}
      />

    </View>
  );
};

export default ViewForm;

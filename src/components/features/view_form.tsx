import React, { useState } from "react";
import { View, TextInput, Text, Image, Button, ScrollView } from "react-native";
import ImageFileInput from "../ui/form-elements/form-image-input";
import TextInputForm from "../ui/form-elements/form-text-input";
import VideoFileInput from "../ui/form-elements/form-video-input";
import DropdownInput from "../ui/form-elements/form-dropdown";
import AudioFileInput from "../ui/form-elements/form-audio-input";
import CheckboxInput from "../ui/form-elements/form-checkbox-input";
import RadioButtonGroupInput from "../ui/form-elements/form-radio-input";
import DateTimePickerInput from "../ui/form-elements/form-datetime-input";

const ViewForm = () => {
  const options = [
    { id: "1", label: "Option 1", value: "option1" },
    { id: "2", label: "Option 2", value: "option2" },
    { id: "3", label: "Option 3", value: "option3" },
  ];

  return (
    <ScrollView>
      <View className="p-4 flex gap-4">
        <TextInputForm
          question="What is your name?"
          description="This is a text input field."
          isRequired={true}
          errorMessages={[
            "This field is required.",
            "Please enter a valid name.",
          ]}
        />
        <DateTimePickerInput
          question="Select Date and Time"
          description="Please pick a date and time for your appointment."
          isRequired={true}
          mode="datetime"
        />
        <RadioButtonGroupInput
          options={options}
          question="Select an option:"
          description="You can select one option."
          isRequired={true}
          initialSelectedId="2"
        />
        <CheckboxInput
          question="What is your favorite color?"
          description="This is a checkbox input field."
          options={[
            {
              label: "Red",
              value: "red",
            },
            {
              label: "Green",

              value: "green",
            },
            {
              label: "Blue",

              value: "blue",
            },
          ]}
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
        <AudioFileInput
          question="Pick an audio"
          description="This is an audio input field."
        />
      </View>
    </ScrollView>
  );
};

export default ViewForm;

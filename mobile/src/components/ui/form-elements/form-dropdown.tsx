import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormInput, { FormInputProps } from "./form-input";
import { Picker } from "@react-native-picker/picker";

interface DropdownInputProps extends FormInputProps {}

export default function DropdownInput(props: DropdownInputProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);
  // 100 generated options - color 1-100
  const options = Array.from({ length: 100 }, (_, i) => ({
    label: `Color ${i + 1}`,
    value: i + 1,
  }));

  return (
    <FormInput {...props}>
      <View className="border border-gray-300 rounded-md">
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          {options.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </FormInput>
  );
}

const styles = StyleSheet.create({});

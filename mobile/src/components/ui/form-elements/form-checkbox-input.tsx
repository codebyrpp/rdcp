import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import FormInput, { FormInputProps } from "./form-input";

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxInputProps extends FormInputProps {
  options: CheckboxOption[];
  initialChecked?: string[]; // Array of initially checked values
}

export default function CheckboxInput({
  options,
  initialChecked = [],
  ...props
}: CheckboxInputProps) {
  const [checkedValues, setCheckedValues] = useState<string[]>(initialChecked);

  const toggleCheckbox = (value: string) => {
    setCheckedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <FormInput {...props}>
      <View className="flex gap-3 px-3">
        {options.map((option) => (
          <View key={option.value} className="flex flex-row items-center">
            <Checkbox
              value={checkedValues.includes(option.value)}
              onValueChange={() => toggleCheckbox(option.value)}
              color={checkedValues.includes(option.value) ? "black" : undefined}
            />
            <Text className="ml-2">{option.label}</Text>
          </View>
        ))}
      </View>
    </FormInput>
  );
}

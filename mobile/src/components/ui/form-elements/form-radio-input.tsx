import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import FormInput, { FormInputProps } from "./form-input";

interface RadioButtonGroupInputProps extends FormInputProps {
  options: { id: string; label: string; value: string }[];
  initialSelectedId?: string;
}

export default function RadioButtonGroupInput({
  options,
  initialSelectedId,
  ...props
}: RadioButtonGroupInputProps) {
  const radioButtons: RadioButtonProps[] = useMemo(
    () =>
      options.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.value,
      })),
    [options]
  );

  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialSelectedId
  );

  return (
    <FormInput {...props}>
      <View>
        <RadioGroup
          containerStyle={{ alignItems: "flex-start"}}
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
        />
      </View>
    </FormInput>
  );
}

const styles = StyleSheet.create({
  // Add any custom styles if needed
});

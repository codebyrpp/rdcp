import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import FormInput, { FormInputProps } from "./form-input";

interface TextInputFormProps extends FormInputProps {
  question: string;
  description?: string;
  isRequired?: boolean;
}

export default function TextInputForm({
  question,
  description,
  isRequired = true,
  errorMessages,
}: TextInputFormProps) {
  const [textInputValue, setTextInputValue] = useState("");

  return (
    <FormInput
      question={question}
      description={description}
      isRequired={isRequired}
        errorMessages={errorMessages}
    >
      <TextInput
        style={styles.input}
        value={textInputValue}
        onChangeText={setTextInputValue}
        placeholder="Type your answer here"
      />
    </FormInput>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 10,
  },
});

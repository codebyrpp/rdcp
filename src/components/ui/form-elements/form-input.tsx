import { StyleSheet, Text, View } from "react-native";
import React from "react";

export interface FormInputProps {
  question: string;
  description?: string;
  isRequired?: boolean;
  errorMessages?: string[];
  children?: React.ReactNode;
}
export default function FormInput({
  question,
  description,
  isRequired = false,
  children,
  errorMessages,
}: FormInputProps) {
  return (
    <View className="flex gap-2 rounded-xl border p-4 bg-white">
      <View>
        <View className="flex flex-row">
          <Text className="font-bold text-lg">{question}</Text>
          {isRequired && <Text className="text-red-500 ml-1">*</Text>}
        </View>
        {description && <Text className="text-gray-500">{description}</Text>}
      </View>
      {children}
      {/* show error here */}
      {errorMessages && (
        <View className="flex gap-2">
          {errorMessages.map((message, index) => (
            <Text key={index} className="text-red-500">
              {message}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

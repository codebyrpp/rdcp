import React from "react";
import { TextInput, View } from "react-native";

interface InputProps {
  onValueChange: (query: string) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ onValueChange: onValueChange, placeholder }) => {
  const handleChange = (text: string) => {
    onValueChange(text);
  };

  return (
    <View className="flex flex-row gap-2">
      <TextInput
        className="bg-white border-slate-200 w-full border-2 p-2 rounded-lg"
        placeholder={placeholder}
        onChangeText={handleChange}
      />
    </View>
  );
};

export default Input;

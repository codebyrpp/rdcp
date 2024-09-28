import React from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  onPress: () => void;
  text: string;
  theme?: "dark" | "light";
}

const TextButton = ({ onPress, text, theme = "dark" }: ButtonProps) => {
  if (theme === "light")
    return (
      <Pressable className="p-4 rounded-lg border" onPress={onPress}>
        <Text className="text-center text-black font-bold">{text}</Text>
      </Pressable>
    );

  return (
    <Pressable className="bg-slate-900 p-4 rounded-lg" onPress={onPress}>
      <Text className="text-center text-white font-bold">{text}</Text>
    </Pressable>
  );
};

export { TextButton };

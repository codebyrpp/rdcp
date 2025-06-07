import React from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  theme?: "dark" | "light";
}

const TextButton = ({
  onPress,
  text,
  theme = "dark",
  disabled,
}: ButtonProps) => {
  if (theme === "light")
    return (
      <Pressable
        className="p-4 rounded-lg border"
        disabled={disabled}
        onPress={onPress}
      >
        <Text className="text-center text-black font-bold">{text}</Text>
      </Pressable>
    );

  return (
    <Pressable
      className="bg-slate-900 p-4 rounded-lg"
      disabled={disabled}
      onPress={onPress}
    >
      <Text className="text-center text-white font-bold">{text}</Text>
    </Pressable>
  );
};

export { TextButton };

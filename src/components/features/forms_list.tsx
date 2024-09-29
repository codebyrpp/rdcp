// components/features/forms_list/FormListElement.tsx
import React from "react";
import { Text, View } from "react-native";

interface Form {
  id: string;
  name: string;
  description: string; // Add other relevant fields
}

export const FormListElement: React.FC<{ form: Form }> = ({ form }) => {
  return (
    <View className="flex-row justify-between p-3 border border-slate-300 rounded-md mb-2">
      <View>
        <Text className="font-bold">{form.name}</Text>
        <Text className="text-slate-500">{form.description}</Text>
      </View>
    </View>
  );
};

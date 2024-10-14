// components/features/forms_list/FormListElement.tsx
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface Form {
  id: string;
  name: string;
  description: string; // Add other relevant fields
}

export const FormListElement: React.FC<{ form: Form }> = ({ form }) => {
  return (
    <View
      className="flex gap-2 justify-between p-3 
    bg-white
    border border-slate-300 rounded-lg mb-2"
    >
      <View>
        <Text className="font-bold">{form.name}</Text>
        {form.description && (
          <Text className="text-slate-500">{form.description}</Text>
        )}
      </View>
      <View className="flex flex-row gap-3">
        <Link
          className="bg-slate-800 p-2 rounded-lg"
          href={{
            pathname: "/forms/[id]",
            params: { id: form.id, name: form.name },
          }}
        >
          <Text className="text-white">Fill Form</Text>
        </Link>
        {/* <Pressable className="bg-white border p-2 rounded-lg justify-center">
          <Text className="">Local Records</Text>
        </Pressable> */}
      </View>
    </View>
  );
};

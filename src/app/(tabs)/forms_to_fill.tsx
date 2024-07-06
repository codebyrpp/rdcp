import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Link, router } from "expo-router";

export default function FormsToFill() {
  const [forms, setForms] = React.useState([]);

  useEffect(() => {
    // 100 dummy forms
    const _forms = Array.from({ length: 100 }, (_, index) => ({
      id: index,
      title: `Form ${index + 1}`,
      description: "This is a description of the form",
    }));

    setForms(_forms);
  }, []);

  return (
    <View className="flex-1 gap-2 p-4">
      {/* Vertical List of forms to fill go here */}
      <Text className="text-muted mt-4 mb-3 ml-2">
        You are currently added as a participant to fill the following forms
      </Text>
      <FlatList
        data={forms}
        renderItem={({ item }) => <FormListElement form={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

interface Form {
  id: number;
  title: string;
  description: string;
}

interface FormListElementProps {
  form: Form;
}

function FormListElement({ form }: FormListElementProps): React.JSX.Element {
  return (
    <View
      key={form.id}
      className="flex flex-row justify-between p-3 border rounded-xl my-1"
    >
      <View>
        <Text className="font-bold">{form.title}</Text>
        <Text className="text-gray-500">{form.description}</Text>
      </View>
      <View className="flex flex-row justify-center gap-3">
        <Link
          className="bg-black p-2 rounded-lg"
          href={{
            pathname: "/forms/[id]",
            params: { id: form.id },
          }}
        >
          <Text className="text-white">Fill Form</Text>
        </Link>
        <Pressable className="bg-white border p-2 rounded-lg justify-center">
          <Text className="">Local Records</Text>
        </Pressable>
      </View>
    </View>
  );
}

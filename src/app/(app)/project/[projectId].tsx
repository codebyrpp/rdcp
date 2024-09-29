import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React from "react";
import { useProjectWithForms } from "@/hooks/useProjectsWithForms";
import { FormListElement } from "@/components/features/forms_list";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ProjectDetails({ route }) {
  const params = useLocalSearchParams();
  const { projectId } = params; // Extract projectId from route params
  const { projectWithForms, error, isLoading } = useProjectWithForms(
    projectId as string
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <Text className="text-red-500">Error fetching project with forms</Text>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `${projectWithForms.name}`,
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <View className="flex-1 p-4">
        {projectWithForms.description && (
          <Text className="text-slate-500">{projectWithForms.description}</Text>
        )}
        <Text className="text-slate-500 my-2">Forms:</Text>
        <FlatList
          data={projectWithForms.forms} // Assuming `forms` is an array in ProjectDTO
          renderItem={({ item }) => <FormListElement form={item} />} // Update this based on your form rendering component
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
}

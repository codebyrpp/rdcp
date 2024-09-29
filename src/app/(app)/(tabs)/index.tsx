import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectListElement } from "@/components/features/projects_list";

export default function Home() {
  const { projects, error, isLoading } = useProjects();

  if (projects.length == 0 && isLoading) {
    // CircularProgressIndicator in the center of the screen
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (projects.length == 0 && error) {
    return <Text className="text-red-500">Error fetching projects</Text>;
  }

  return (
    <View className="flex-1 gap-2 p-4">
      <Text className="text-slate-500 my-1">
        You can find the projects you are currently working on here
      </Text>
      <FlatList
        data={projects}
        renderItem={({ item }) => <ProjectListElement project={item} />}
        keyExtractor={(item) => item.id.toString()} // Ensure id is string
      />
    </View>
  );
}

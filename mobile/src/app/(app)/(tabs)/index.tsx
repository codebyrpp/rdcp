import {
  ActivityIndicator,
  FlatList,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectListElement } from "@/components/features/projects_list";
import Input from "@/components/ui/input";
import { Link, router } from "expo-router";

export default function Home() {
  const { projects, error, isLoading } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handlePress = (id: string) => {
    router.push(`/project/${id}`); // Navigating to the dynamic route
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  if (projects.length == 0 && isLoading) {
    // CircularProgressIndicator in the center of the screen
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000000" />
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
      <Input onValueChange={setSearchTerm} placeholder="Search projects" />
      <FlatList
        className="flex w-full"
        data={filteredProjects}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <ProjectListElement project={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure id is string
      />
    </View>
  );
}

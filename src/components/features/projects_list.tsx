// components/ProjectListElement.tsx
import { Project } from "@/models/project";
import React from "react";
import { View, Text } from "react-native";

const ProjectListElement = ({ project }: { project: Project }) => {
  return (
    <View
      key={project.id}
      className="flex sm:flex-row gap-2 justify-between p-3 bg-slate-50 
      border border-slate-300 rounded-xl my-1"
    >
      <View className="flex">
        <Text className="font-bold">{project.name}</Text>
        {project.description && (
          <Text className="text-slate-500">{project.description}</Text>
        )}
      </View>
      <View className="flex flex-row flex-wrap gap-1">
        {/* Pills for roles */}
        {project.roles.map((role) => (
          <Text
            key={role}
            className="bg-slate-200 text-slate-500 p-1 rounded-md"
          >
            {role}
          </Text>
        ))}
      </View>
    </View>
  );
};

export { ProjectListElement };

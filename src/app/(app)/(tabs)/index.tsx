import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'

export default function Home() {

  const [projects, setProjects] = React.useState([])

  useEffect(() => {
    // 100 dummy projects
    const _projects = Array.from({ length: 100 }, (_, index) => ({
      id: index,
      name: `Project ${index + 1}`,
      description: 'This is a description of the project',
    }))

    setProjects(_projects)
  }, [])

  return (
    <View className='flex-1 gap-2 p-4'>
      <Text className='text-muted my-1 text-balance'>
        You can find the projects you are currently working on here
      </Text>
      <View className="flex flex-row gap-2">
        {/* Search Input  */}
        <TextInput
          className="bg-white border-gray-200 w-full border-2  p-2 rounded-lg"
          placeholder="Search projects by name"
        />
      </View>
      <FlatList
        data={projects}
        renderItem={({ item }) => <ProjectListElement project={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

interface Project {
  id: string,
  name: string,
  description: string,
}

const ProjectListElement = ({ project }: { project: Project }) => {
  return (
    <View
      key={project.id}
      className="flex sm:flex-row gap-2 justify-between p-3 bg-gray-50 
      border border-gray-400 rounded-xl my-1"
    >
      <View className="flex">
        <Text className="font-bold">{project.name}</Text>
        <Text className="text-gray-500">{project.description}</Text>
      </View>
      <View className="flex flex-row flex-wrap gap-1">
        {/* pills for roles */}
        <Text className="bg-gray-200 text-gray-500 p-1 rounded-md">Role 1</Text>
        <Text className="bg-gray-200 text-gray-500 p-1 rounded-md">Role 2</Text>
      </View>
    </View>
  )
}
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av";
import FormInput, { FormInputProps } from "./form-input";
import Ionicons from "@expo/vector-icons/Ionicons";

interface AudioFileInputProps extends FormInputProps {}

export default function AudioFileInput(props: AudioFileInputProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        alert("Permission to access microphone is required!");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      setRecording(null);
      await recording?.stopAndUnloadAsync();
      const uri = recording?.getURI();
      setAudioUri(uri || null);
      setSound(null);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const playSound = async () => {
    try {
      if (sound === null && audioUri) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: true }
        );
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish) {
              setIsPlaying(false);
              setSound(null);
            }
          }
        });
        setSound(newSound);
      } else if (sound) {
        await sound.playAsync();
      }
    } catch (err) {
      console.error("Failed to play sound", err);
    }
  };

  const pauseSound = async () => {
    try {
      await sound?.pauseAsync();
    } catch (err) {
      console.error("Failed to pause sound", err);
    }
  };

  const removeAudio = async () => {
    try {
      await sound?.unloadAsync();
      setAudioUri(null);
      setSound(null);
      setIsPlaying(false);
    } catch (err) {
      console.error("Failed to remove audio", err);
    }
  };

  return (
    <FormInput {...props}>
      {audioUri ? (
        <View style={styles.audioContainer}>
          <Text style={styles.audioFileName}>{audioUri.split("/").pop()}</Text>
          <View style={styles.audioControls}>
            {isPlaying ? (
              <Pressable onPress={pauseSound} style={styles.audioButton}>
                <Ionicons name="pause" size={24} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={playSound} style={styles.audioButton}>
                <Ionicons name="play" size={24} color="black" />
              </Pressable>
            )}
            <Pressable
              onPress={removeAudio}
              style={[styles.audioButton, styles.removeButton]}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.audioControls}>
          {recording ? (
            <View className="flex flex-row gap-2">
              <View className="flex flex-row gap-2 p-2 items-center">
                <Ionicons name="mic" size={24} color="red" />
                <Text>Recording...</Text>
              </View>
              <Pressable onPress={stopRecording} style={styles.audioButton}>
                <Ionicons name="stop" size={24} color="black" />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={startRecording} style={styles.audioButton}>
              <Ionicons name="mic" size={24} color="black" />
              <Text>Start Recording</Text>
            </Pressable>
          )}
        </View>
      )}
    </FormInput>
  );
}

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  audioFileName: {
    marginBottom: 10,
    textAlign: "center",
    color: "gray",
  },
  audioControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "lightgray",
  },
  removeButton: {
    marginLeft: "auto",
  },
});

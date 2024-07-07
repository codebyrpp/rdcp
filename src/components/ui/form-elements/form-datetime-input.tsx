import React, { useState } from "react";
import { Button, Text, View, StyleSheet, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import FormInput, { FormInputProps } from "./form-input";
import { TextButton } from "../button";

interface DateTimePickerInputProps extends FormInputProps {
  mode?: "date" | "time" | "datetime";
}

export default function DateTimePickerInput({
  mode = "date",
  ...props
}: DateTimePickerInputProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const [showPicker, setShowPicker] = useState(false);

  const showDateTimePicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date || new Date(),
        onChange,
        mode: DateTimePickerAndroid[mode],
        is24Hour: true,
      });
    } else {
      setShowPicker(true);
    }
  };

  return (
    <FormInput {...props}>
      <View style={styles.container}>
        <TextButton text="Pick Date/Time" onPress={showDateTimePicker}/>
        {Platform.OS === "ios" && showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
        {date && <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>}
      </View>
    </FormInput>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
});

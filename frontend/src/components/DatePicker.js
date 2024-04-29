import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { View, Pressable, Platform, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const DatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      toggleDatePicker();
      setDateOfBirth(currentDate.toDateString());
      props.handle(currentDate.toDateString());
      
    } else {
      toggleDatePicker();
    }
  };

  return (
    <View style={styles.textBox}>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}

      <Pressable onPress={toggleDatePicker}>
        <TextInput
          mode="outlined"
          secure={false}
          label="Birthday"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          editable={false}
          onPressIn={toggleDatePicker}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    width: "80%",
    marginBottom: 15,
  },
});

export default DatePicker;

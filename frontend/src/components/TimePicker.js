import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const TimePicker = (props) => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [val, setVal] = useState("");

  const toggleTimePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedTime) => {
    if (type === "set") {
      const currentTime = selectedTime;
      setTime(currentTime);
      toggleTimePicker();
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setVal(formattedTime);
      props.handle(currentTime);
      
    } else {
      toggleTimePicker();
    }
  };

  return (
    <View style={styles.textBox}>
      {showPicker && (
        <DateTimePicker
          mode="time"
          display="spinner"
          value={time}
          onChange={onChange}
        />
      )}

      <Pressable onPress={toggleTimePicker}>
        <TextInput
          mode="outlined"
          secure={false}
          label={props.label}
          value={val}
          onChangeText={setVal}
          editable={false}
          onPressIn={toggleTimePicker}
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

export default TimePicker;

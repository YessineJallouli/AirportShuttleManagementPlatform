import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const CustomInput = (props) => {
  return (
    <View style={styles.textBox}>
      <TextInput
        label={props.name}
        mode="outlined"
        secureTextEntry={props.secure}
        onChangeText={props.onChange}
        value = {props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    width: "80%",
    marginBottom: 10,
  },
});

export default CustomInput;

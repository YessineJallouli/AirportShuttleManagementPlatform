import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PwdValidUI = (props) => {
  return (
    <View style={{ marginBottom: 10, width: "80%" }}>
      {[
        { text: "must not contain whitespaces", color: props.isWhiteSpace ? "red" : "green" },
        { text: "at least one lower case character", color: props.isContainsLowercase ? "green" : "red" },
        { text: "at least one uppercase case character", color: props.isContainsUppercase ? "green" : "red" },
        { text: "at least one digit", color: props.isContainsNumber ? "green" : "red" },
        { text: "at least one special character", color: props.isContainsSymbol ? "green" : "red" },
        { text: "length must be between 8 and 16", color: props.isValidLength ? "green" : "red" },
      ].map((condition, index) => (
        <Text key={index} style={{ color: condition.color }}>
          <Icon name="check" size={20} /> {condition.text}
        </Text>
      ))}
    </View>
  );
};

export default PwdValidUI;
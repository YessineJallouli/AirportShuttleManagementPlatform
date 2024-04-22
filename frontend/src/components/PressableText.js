import { Text, TouchableOpacity } from "react-native";

const ClickableText = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={props.textStyle}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default ClickableText;

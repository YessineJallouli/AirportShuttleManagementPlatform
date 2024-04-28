import { View, Text } from 'react-native';

export default errorText = (props) => {
    return (
        <View style={{ width: "80%" }}>
            {!props.check && (
                <Text style={{ fontWeight: "bold", color: "red" }}>
                    {props.text}
                </Text>
            )}
        </View>
    );
};

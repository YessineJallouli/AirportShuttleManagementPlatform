import { StyleSheet, Text } from "react-native";
import { Modal, Portal } from "react-native-paper";
import CustomButton from "./CustomButton";

const CustomModal = (props) => {
    
    return (
        <Portal>
            <Modal
                visible={props.visible}
                onDismiss={() => props.setVisible(false)}
                contentContainerStyle={style.containerStyle}
            >
                <Text style = {{fontSize : 18}}>{props.text}</Text>
                <CustomButton name={props.buttonText} onPress = {props.handlePress}/>
            </Modal>
        </Portal>
    );
};

const style = StyleSheet.create({
    containerStyle: {
        backgroundColor: "rgb(237, 221, 246)",
        marginLeft: "10%",
        marginRight: "10%",
        height: 200,
        alignItems: "center",
        justifyContent : "space-between",
        paddingTop : 40,
    }
});

export default CustomModal;

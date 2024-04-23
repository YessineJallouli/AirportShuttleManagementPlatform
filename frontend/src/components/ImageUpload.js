import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = (props) => {
    const [uploadMessage, setUploadMessage] = useState("");
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });
        console.log(result.assets[0]);
        if (!result.canceled) {
            props.data = result.assets[0];
            let fileName = result.assets[0].fileName;
            setUploadMessage(fileName + " is uploaded");
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={pickImage} style={styles.buttonContainer}>
                <Text>{props.name}</Text>
            </Pressable>
            {uploadMessage !== "" && (
                <Text style={{ marginTop: 5 }}>{uploadMessage}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        width: "80%",
        borderWidth: 1,
        borderColor: "rgb(150,146,152)",
        borderRadius: 4,
        backgroundColor: "rgb(255, 251, 255)",
    },
});
export default ImageUpload;

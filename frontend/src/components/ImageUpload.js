import { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUpload = (props) => {
    const [uploadMessage, setUploadMessage] = useState("");
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });
        console.log(result.assets[0])
        if (!result.canceled) {
            props.data = result.assets[0]
            let fileName = result.assets[0].fileName
            setUploadMessage(fileName + " is uploaded");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title= {props.name}
                    onPress={pickImage}
                    color="#f0bbed"
                />
            </View>
            {uploadMessage !== "" && <Text style={styles.message}>{uploadMessage}</Text> }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 3000,
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4,
    },
    buttonContainer: {
        paddingVertical: 4,
        width: 290,
    },
    image: {
        width: 200,
        height: 200,
    },
});
export default ImageUpload;
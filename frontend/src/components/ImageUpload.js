import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUpload = (props) => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            // aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title= {props.name}
                    onPress={pickImage}
                />
            </View>
            {image && <Image source={{ uri: image }} style={styles.image} />}
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
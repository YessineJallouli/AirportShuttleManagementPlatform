import { useState } from "react";
import { View, Pressable, Image, StyleSheet, Text } from "react-native";
import driverImage from "../../assets/Images/driver.jpg";
import riderImage from "../../assets/Images/rider.jpg";
import { Button, MD3Colors } from "react-native-paper";

const SignUpOptionsScreen = ({ navigation }) => {
  const [isDriverPressed, setIsDriverPressed] = useState(false);
  const [isRiderPressed, setIsRiderPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 40 }}>
        Sign up as
      </Text>
      <View style={styles.subContainer}>
        {[
          {
            text: "Driver",
            image: driverImage,
            isPressed: isDriverPressed,
            handlePress: () => {
              setIsDriverPressed(true);
              setIsRiderPressed(false);
            },
          },
          {
            text: "Rider",
            image: riderImage,
            isPressed: isRiderPressed,
            handlePress: () => {
              setIsDriverPressed(false);
              setIsRiderPressed(true);
            },
          },
        ].map((content, index) => {
          return (
            <Pressable
              key={index}
              style={styles.pressContainer}
              onPress={content.handlePress}
            >
              <Image
                source={content.image}
                style={[styles.img, content.isPressed && styles.pressed]}
                resizeMode="contain"
              />
              <Text style={{ marginTop: 10 }}>{content.text}</Text>
            </Pressable>
          );
        })}
      </View>

      <Button
        mode="contained"
        onPress={() => {
          if (isRiderPressed) {
            navigation.navigate("SignUpRider");
          } else {
              navigation.navigate("SignUpDriver")
          }
        }}
      >
        Continue
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  subContainer: {
    flexDirection: "row",
  },

  img: {
    height: 200,
    borderWidth: 2,
    borderColor: "black",
    width: "100%",
    borderRadius: 10,
  },

  pressContainer: {
    height: 250,
    alignItems: "center",
    padding: 10,
    width: "50%",
  },

  pressed: {
    borderWidth: 4,
    borderColor: MD3Colors.primary30,
  },
});

export default SignUpOptionsScreen;

import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, MD3Colors, RadioButton } from "react-native-paper";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import PressableText from "../components/PressableText";
import MainHeader from "../components/MainHeader";

const SignInScreen = ({ navigation }) => {
    const [checked, setChecked] = useState("user");
    return (
        <View style={styles.parentContainer}>
            <MainHeader/>
            <View style={styles.checkBoxesContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                        value="user"
                        status={checked === "user" ? "checked" : "unchecked"}
                        onPress={() => setChecked("user")}
                    />
                    <Text>User</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                        value="driver"
                        status={checked === "driver" ? "checked" : "unchecked"}
                        onPress={() => setChecked("driver")}
                    />

                    <Text>Driver</Text>
                </View>
            </View>

            <CustomInput name="Email" secure={false} />

            <CustomInput name="password" secure={true} />

            <View style={styles.forgetPwdContainer}>
                <PressableText
                    name="Forgot Password ?"
                    textStyle={styles.forgetPwdText}
                    onPress={() => navigation.navigate("ForgotPwd")}
                />
            </View>

            <CustomButton
                name="Sign In"
                onPress={() => {
                    console.log("pressed");
                }}
            />

            <Text>Or Login With</Text>

            <IconButton
                icon="google"
                iconColor={MD3Colors.primary20}
                size={50}
                onPress={() => console.log("Pressed")}
            ></IconButton>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>You don't have an account? </Text>
                <PressableText
                    name="Sign Up"
                    textStyle={styles.signUpText}
                    onPress={() => navigation.navigate("SignUpOptions")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        padding: "5%",
    },

    checkBoxesContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    forgetPwdContainer: {
        alignItems: "flex-end",
        width: "80%",
        marginBottom: 20,
    },

    forgetPwdText: {
        color: MD3Colors.error50,
        fontSize: 15,
    },

    signUpText: {
        color: MD3Colors.primary30,
        fontWeight: "bold",
    },
});

export default SignInScreen;

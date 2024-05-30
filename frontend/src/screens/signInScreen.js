import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import axios from "axios";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import PressableText from "../components/PressableText";
import MainHeader from "../components/MainHeader";
import CustomModal from "../components/CustomModal";
import {BASE_URL} from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibleNotExist, setVisibleNotExist] = useState(false);
    const [visibleNotMatch, setVisibleNotMatch] = useState(false);
    const [visibleError, setVisibleError] = useState(false);
    return (
        <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                contentContainerStyle={{
                    alignItems: "center",
                }}
            >
        <View style={styles.parentContainer}>
            <MainHeader />
            <CustomInput
                name="Email"
                secure={false}
                value={email}
                onChange={setEmail}
            />

            <CustomInput
                name="password"
                secure={true}
                value={password}
                onChange={setPassword}
            />

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
                    const userData = {
                        email: email,
                        password: password,
                    };
                    const route = `${BASE_URL}/api/users/login`;;
                    axios
                        .post(
                            route,
                            userData
                        )
                        .then(async (response) => {
                            if (response.data.verdict === "logged") {
                                try{
                                    await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
                                    await AsyncStorage.setItem("userRole", response.data.userRole);
                                    await AsyncStorage.setItem("token",response.data.token);
                                }catch(error){
                                    console.log(error);
                                }
                                if(response.data.userRole === "rider"){
                                    navigation.replace("homeScreenRider"); // so we can't go the signIn page when log in
                                }
                                
                            } else if (response.data.verdict === "notExist") {
                                setVisibleNotExist(true);
                            } else if (response.data.verdict === "notMatch") {
                                setVisibleNotMatch(true);
                            } else {
                                setVisibleError(true);
                            }
                        })
                        .catch((error) => {
                            setVisibleError(true);
                        });
                }}
            />

            <Text>Or Login With</Text>

            <IconButton
                icon="google"
                iconColor={MD3Colors.primary20}
                size={50}
                onPress={() => console.log("pressed")}
            ></IconButton>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>You don't have an account? </Text>
                <PressableText
                    name="Sign Up"
                    textStyle={styles.signUpText}
                    onPress={() => navigation.navigate("SignUpOptions")}
                />
            </View>
            <CustomModal
                visible={visibleNotExist}
                setVisible={setVisibleNotExist}
                text={"You entered an incorrect email !"}
                handlePress={() => setVisibleNotExist(false)}
                buttonText="Close"
            />

            <CustomModal
                visible={visibleNotMatch}
                setVisible={setVisibleNotMatch}
                text={"Password is incorrect !"}
                handlePress={() => setVisibleNotMatch(false)}
                buttonText="Close"
            />

            <CustomModal
                visible={visibleError}
                setVisible={setVisibleError}
                text={"An error has occured !"}
                handlePress={() => setVisibleError(false)}
                buttonText="Close"
            />
        </View>
        </ScrollView>
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

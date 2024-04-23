import { useState } from "react";
import {
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    StyleSheet,
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import { CountryPicker } from "react-native-country-codes-picker";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import DatePicker from "../components/DatePicker";
import {
    emailRegex,
    isContainsLowercase,
    isWhiteSpace,
    isContainsUppercase,
    isContainsNumber,
    isContainsSymbol,
    isValidLength,
} from "../utilities/InputValidation";
import MainHeader from "../components/MainHeader";
import PressableText from "../components/PressableText";
import PwdValidUI from "../components/pwdValidUI";

const SignUpUserScreen = ({ navigation }) => {
    const [emailValue, setEmail] = useState("");
    const [pwdValue, setPwdValue] = useState("");
    const [confPwdValue, setConfPwdValue] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [pwdMatch, setPwdMatch] = useState(true);

    const [show, setShow] = useState(false);
    const [country, setCountry] = useState("");

    return (
        <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={{
                alignItems: "center",
            }}
        >
            <MainHeader />
            <CustomInput
                name="Email"
                secure={false}
                value={emailValue}
                onChange={setEmail}
            />
            {/* shows only when the Email is not valid */}
            <View style={{ width: "80%" }}>
                {!emailValid && (
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                        Email is not valid
                    </Text>
                )}
            </View>
            {/* shows only when the Email is not valid */}
            <CustomInput name="First Name" secure={false} />
            <CustomInput name="Last Name" secure={false} />
            <CustomInput
                name="Password"
                secure={true}
                value={pwdValue}
                onChange={setPwdValue}
            />

            <PwdValidUI
                isWhiteSpace={isWhiteSpace(pwdValue)}
                isContainsUppercase={isContainsUppercase(pwdValue)}
                isContainsLowercase={isContainsLowercase(pwdValue)}
                isContainsNumber={isContainsNumber(pwdValue)}
                isContainsSymbol={isContainsSymbol(pwdValue)}
                isValidLength={isValidLength(pwdValue)}
            />

            <CustomInput
                name="Confirm Password"
                secure={true}
                value={confPwdValue}
                onChange={setConfPwdValue}
            />
            {/* shows only when passwords don't match*/}
            <View style={{ width: "80%" }}>
                {!pwdMatch && (
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                        Password does not match
                    </Text>
                )}
            </View>
            {/* shows only when passwords don't match*/}
            <DatePicker></DatePicker>
            <Text style={{ marginBottom: 10 }}>
                Tap on the Box below to enter your country
            </Text>
            <View
                style={{
                    width: "80%",
                    borderWidth: 1,
                    borderColor: "rgb(124, 117, 126)",
                    marginBottom: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => setShow(true)}
                    style={{
                        height: 45,
                        backgroundColor: "rgb(255, 251, 255)",
                        paddingTop: 15,
                        paddingLeft: 15,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>{country}</Text>
                </TouchableOpacity>

                <CountryPicker
                    style={{
                        modal: {
                            height: 500,
                        },
                    }}
                    show={show}
                    pickerButtonOnPress={(item) => {
                        setCountry(item.flag + " " + item.name["en"]);
                        setShow(false);
                    }}
                />
            </View>
            <CustomButton
                name="Sign Up"
                onPress={() => {
                    setEmailValid(emailRegex.test(emailValue));
                    setPwdMatch(pwdValue == confPwdValue);
                }}
            />
            <Text>Or Sign Up With </Text>
            <IconButton
                icon="google"
                iconColor={MD3Colors.primary20}
                size={50}
                onPress={() => console.log("Pressed")}
            ></IconButton>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>You already have an account? </Text>
                <PressableText
                    name="Sign In"
                    textStyle={styles.signInText}
                    onPress={() => navigation.navigate("SignIn")}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    forgetPwdContainer: {
        alignItems: "flex-end",
        width: "80%",
        marginBottom: 20,
    },

    forgetPwdText: {
        color: MD3Colors.error50,
        fontSize: 15,
    },

    signInText: {
        color: MD3Colors.primary30,
        fontWeight: "bold",
    },
});

export default SignUpUserScreen;

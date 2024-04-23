import { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import DatePicker from "../components/DatePicker";
import ImageUpload from "../components/ImageUpload"

import {
    emailRegex,
    isContainsLowercase,
    isWhiteSpace,
    isContainsUppercase,
    isContainsNumber,
    isContainsSymbol,
    isValidLength,
    phoneNumberRegex,
} from "../utilities/InputValidation";
import MainHeader from "../components/MainHeader";
import PressableText from "../components/PressableText";

const SignUpDriverScreen = ({ navigation }) => {
    const [emailValue, setEmail] = useState("");
    const [pwdValue, setPwdValue] = useState("");
    const [confPwdValue, setConfPwdValue] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [pwdMatch, setPwdMatch] = useState(true);

    const [colorCond1, setColorCond1] = useState("black");
    const [colorCond2, setColorCond2] = useState("black");
    const [colorCond3, setColorCond3] = useState("black");
    const [colorCond4, setColorCond4] = useState("black");
    const [colorCond5, setColorCond5] = useState("black");
    const [colorCond6, setColorCond6] = useState("black");


    // phone number states
    const [phoneValid, setPhoneValid] = useState(true);
    const [phoneValue, setPhoneValue] = useState("");

    const handlePwdChange = (value) => {
        setPwdValue(value);
        setColorCond1(isWhiteSpace(value) ? "red" : "green");
        setColorCond2(isContainsLowercase(value) ? "green" : "red");
        setColorCond3(isContainsUppercase(value) ? "green" : "red");
        setColorCond4(isContainsNumber(value) ? "green" : "red");
        setColorCond5(isContainsSymbol(value) ? "green" : "red");
        setColorCond6(isValidLength(value) ? "green" : "red");
    };

    const handlePhoneChange = (value) => {
        setPhoneValue(value);
    }

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
                onChange={(text) => {
                    setPwdValue(text);
                    handlePwdChange(text);
                  }}
            />

            <View style={{ marginBottom: 10, width: "80%" }}>
                {[
                    { text: "must not contain whitespaces", color: colorCond1 },
                    { text: "at least one lower case character", color: colorCond2 },
                    { text: "at least one uppercase case character", color: colorCond3 },
                    { text: "at least one digit", color: colorCond4 },
                    { text: "at least one special character", color: colorCond5 },
                    { text: "length must be between 8 and 16", color: colorCond6 },
                ].map((condition, index) => (
                    <Text key={index} style={{ color: condition.color }}>
                        <Icon name="check" size={20} /> {condition.text}
                    </Text>
                ))}
            </View>
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

            <CustomInput
                name="Phone Number"
                secure={false}
                value = {phoneValue}
                onChange = {handlePhoneChange}
            />

            <View style={{ width: "80%" }}>
                {!phoneValid && (
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                        Phone Number is not valid
                    </Text>
                )}
            </View>
            <Text style = {{width : "80%", textAlign: "center", margin: 10}}>Tap on the boxes below to upload the necessary documents</Text>
            <ImageUpload
                name="Identity Card picture"
            />

            <ImageUpload
                name="Driving license picture"
            />

            <ImageUpload
                name="Car registration document picture"
            />




            <CustomButton
                name="Sign Up"
                onPress={() => {
                    setEmailValid(emailRegex.test(emailValue));
                    setPwdMatch(pwdValue == confPwdValue);
                    setPhoneValid(phoneNumberRegex.test(phoneValue));
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

export default SignUpDriverScreen;

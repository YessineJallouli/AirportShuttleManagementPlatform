import React, { useState } from "react";
import {
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    StyleSheet,
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import { CountryPicker } from "react-native-country-codes-picker";
import axios from "axios";

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
import ErrorText from "../components/ErrorText";
import CustomModal from "../components/CustomModal";

const SignUpUserScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [firstNameValid, setfirstNameValid] = useState(true);
    const [lastName, setLastName] = useState("");
    const [lastNameValid, setLastNameValid] = useState(true);
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [pwd, setPwd] = useState("");
    const [confPwd, setConfPwd] = useState("");
    const [pwdMatch, setPwdMatch] = useState(true);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [dateOfBirthValid, setDateOfBirthValid] = useState(true);

    const [showCountries, setShowCountries] = useState(false);
    const [country, setCountry] = useState("");
    const [countryFlag, setCountryFlag] = useState("");
    const [countryValid, setCountryValid] = useState(true);

    const [visibleExist, setVisibleExist] = useState(false);
    const [visibleCreated, setVisibleCreated] = useState(false);
    const [visibleError, setVisibleError] = useState(true);

    return (
        <View style={{ flex: 1 }}>
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
                    value={email}
                    onChange={setEmail}
                />

                <ErrorText check={emailValid} text="Email is not Valid" />

                <CustomInput
                    name="First Name"
                    secure={false}
                    value={firstName}
                    onChange={setFirstName}
                />

                <ErrorText
                    check={firstNameValid}
                    text="Please enter your first name"
                />

                <CustomInput
                    name="Last Name"
                    secure={false}
                    value={lastName}
                    onChange={setLastName}
                />

                <ErrorText
                    check={lastNameValid}
                    text="Please enter your last name"
                />

                <CustomInput
                    name="Password"
                    secure={true}
                    value={pwd}
                    onChange={setPwd}
                />

                <PwdValidUI
                    isWhiteSpace={isWhiteSpace(pwd)}
                    isContainsUppercase={isContainsUppercase(pwd)}
                    isContainsLowercase={isContainsLowercase(pwd)}
                    isContainsNumber={isContainsNumber(pwd)}
                    isContainsSymbol={isContainsSymbol(pwd)}
                    isValidLength={isValidLength(pwd)}
                />

                <CustomInput
                    name="Confirm Password"
                    secure={true}
                    value={confPwd}
                    onChange={setConfPwd}
                />
                <ErrorText check={pwdMatch} text="Password does not match" />

                <DatePicker handle={setDateOfBirth} />

                <ErrorText
                    check={dateOfBirthValid}
                    text="Please enter your date of birth"
                />
                <Text style={{ marginBottom: 10 }}>
                    Tap on the Box below to enter your country
                </Text>
                <View
                    style={{
                        width: "80%",
                        borderWidth: 1,
                        borderColor: "rgb(124, 117, 126)",
                        marginBottom: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setShowCountries(true)}
                        style={{
                            height: 45,
                            backgroundColor: "rgb(255, 251, 255)",
                            paddingTop: 15,
                            paddingLeft: 15,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>
                            {countryFlag + " " + country}
                        </Text>
                    </TouchableOpacity>

                    <CountryPicker
                        style={{
                            modal: {
                                height: 500,
                            },
                        }}
                        show={showCountries}
                        pickerButtonOnPress={(item) => {
                            setCountry(item.name["en"]);
                            setCountryFlag(item.flag);
                            setShowCountries(false);
                        }}
                        onBackdropPress={() => setShowCountries(false)}
                    />
                </View>

                <ErrorText
                    check={countryValid}
                    text="Please select your country"
                />

                <CustomButton
                    name="Sign Up"
                    onPress={() => {
                        setEmailValid(emailRegex.test(email));
                        setfirstNameValid(firstName !== "");
                        setLastNameValid(lastName !== "");
                        setPwdMatch(pwd === confPwd);
                        setDateOfBirthValid(dateOfBirth !== "");
                        setCountryValid(country !== "");
                        const pwdValid =
                            !isWhiteSpace(pwd) &&
                            isContainsUppercase(pwd) &&
                            isContainsLowercase(pwd) &&
                            isContainsNumber(pwd) &&
                            isContainsSymbol(pwd) &&
                            isValidLength(pwd);
                        if (
                            emailValid &&
                            firstNameValid &&
                            lastNameValid &&
                            pwdValid &&
                            pwdMatch &&
                            dateOfBirthValid &&
                            countryValid
                        ) {
                            const userData = {
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                password: pwd,
                                dateOfBirth: dateOfBirth,
                                country: country,
                            };
                            axios
                                .post(
                                    "http://192.168.100.195:8000/api/users/register",
                                    userData
                                )
                                .then((response) => {
                                    console.log(response.data.verdict);
                                    if (response.data.verdict === "exist") {
                                        setVisibleExist(true);
                                    } else if (response.data.verdict === "created") {
                                        setVisibleCreated(true);
                                    }
                                })
                                .catch((error) => {
                                    setVisibleError(true);
                                    console.error("Error:", error);

                                });
                        }
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
            <CustomModal
                visible={visibleExist}
                setVisible={setVisibleExist}
                text={"Email entered already exists !"}
                handlePress = {() => setVisibleExist(false)}
                buttonText = "Close"
            />

            <CustomModal
                visible={visibleCreated}
                setVisible={setVisibleCreated}
                text={"You've registered successfully !"}
                handlePress = {() => navigation.navigate("SignIn")}
                buttonText = "Login In"
            />


            <CustomModal
                visible={visibleError}
                setVisible={setVisibleError}
                text={"An error has occured try again !"}
                handlePress = {() => setVisibleError(false)}
                buttonText = "Close"
            />
        </View>
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

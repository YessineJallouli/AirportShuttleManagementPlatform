import { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import DatePicker from "../components/DatePicker";
import ImageUpload from "../components/ImageUpload";
import * as FileSystem from 'expo-file-system';
import CustomModal from "../components/CustomModal";

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
import PwdValidUI from "../components/pwdValidUI";
import ErrorText from "../components/ErrorText";
import axios from "axios";
import {API_HOST} from '@env';

const SignUpDriverScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastName, setLastName] = useState("");
    const [lastNameValid, setLastNameValid] = useState(true);

    const [emailValue, setEmail] = useState("");
    const [pwdValue, setPwdValue] = useState("");
    const [confPwdValue, setConfPwdValue] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [pwdMatch, setPwdMatch] = useState(true);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [dateOfBirthValid, setDateOfBirthValid] = useState(true);

    // phone number states
    const [phoneValid, setPhoneValid] = useState(true);
    const [phoneValue, setPhoneValue] = useState("");

    const handlePhoneChange = (value) => {
        setPhoneValue(value);
    };

    // pictures states
    const [identityCard, setIdentityCard] = useState(null);
    const [drivingLicense, setDrivingLicense] = useState(null);
    const [carRegistration, setCarRegistration] = useState(null);
    const [picturesValid, setPicturesValid] = useState(true);

    const [visibleExist, setVisibleExist] = useState(false);
    const [visibleCreated, setVisibleCreated] = useState(false);
    const [visibleError, setVisibleError] = useState(false);

    const handleIdentityCardData = (data) => {
        setIdentityCard(data);
    };
    const handleDrivingLicenseData = (data) => {
        setDrivingLicense(data);
    };
    const handleCarRegistrationData = (data) => {
        setCarRegistration(data);
    };

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

                <DatePicker handle={setDateOfBirth} />

                <ErrorText
                    check={dateOfBirthValid}
                    text="Please enter your date of birth"
                />

                <CustomInput
                    name="Phone Number"
                    secure={false}
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    keyboardType = "numeric"
                />

                <View style={{ width: "80%" }}>
                    {!phoneValid && (
                        <Text style={{ fontWeight: "bold", color: "red" }}>
                            Phone Number is not valid
                        </Text>
                    )}
                </View>

                <Text style={{ width: "80%", textAlign: "center", margin: 10 }}>
                    Tap on the boxes below to upload the necessary documents
                </Text>

                <ImageUpload
                    name="Identity Card picture"
                    data={handleIdentityCardData}
                />

                <ImageUpload
                    name="Driving license picture"
                    data={handleDrivingLicenseData}
                />

                <ImageUpload
                    name="Car registration document picture"
                    data={handleCarRegistrationData}
                />

                <View style={{ width: "80%" }}>
                    {!picturesValid && (
                        <Text style={{ fontWeight: "bold", color: "red" }}>
                            Please upload all the documents
                        </Text>
                    )}
                </View>

                <CustomButton
                    name="Sign Up"
                    onPress={() => {
                        const isEmailValid = emailRegex.test(emailValue);
                        setEmailValid(emailRegex.test(emailValue));
                        setFirstNameValid(firstName !== "");
                        setLastNameValid(lastName !== "");
                        setPwdMatch(pwdValue === confPwdValue);
                        setDateOfBirthValid(dateOfBirth !== "");
                        setPhoneValid(phoneNumberRegex.test(phoneValue));
                        setPicturesValid(identityCard != null && drivingLicense != null && carRegistration != null);

                        const pwdValid =
                            !isWhiteSpace(pwdValue) &&
                            isContainsUppercase(pwdValue) &&
                            isContainsLowercase(pwdValue) &&
                            isContainsNumber(pwdValue) &&
                            isContainsSymbol(pwdValue) &&
                            isValidLength(pwdValue);

                        if (
                            isEmailValid &&
                            firstName !== "" &&
                            lastName !== "" &&
                            pwdValid &&
                            pwdValue === confPwdValue &&
                            dateOfBirth !== "" &&
                            phoneValid &&
                            picturesValid
                        ) {
                            console.log("Everything is Valid");
                            const driverData = {
                                email: emailValue,
                                firstName: firstName,
                                lastName: lastName,
                                password: pwdValue,
                                dateOfBirth: dateOfBirth,
                                phoneNumber: phoneValue,
                                identityCard: identityCard.base64,
                                drivingLicense: drivingLicense.base64,
                                carRegistration: carRegistration.base64,
                            };
                            axios.post(
                                    `${API_HOST}/api/drivers/register`,
                                    driverData
                                )
                                .then((response) => {
                                    console.log(response.data.verdict);

                                    if (response.data.verdict === "exist") {
                                        setVisibleExist(true);
                                    } else if (
                                        response.data.verdict === "created"
                                    ) {
                                        setVisibleCreated(true);
                                    }
                                })
                                .catch((error) => {
                                    setVisibleError(true);
                                    console.error("Error:", error);
                                });

                        }
                        else {
                            console.log("NOT VALID");
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
                handlePress={() => setVisibleExist(false)}
                buttonText="Close"
            />

            <CustomModal
                visible={visibleCreated}
                setVisible={setVisibleCreated}
                text={"You've registered successfully !"}
                handlePress={() => navigation.navigate("SignIn")}
                buttonText="Log In"
            />

            <CustomModal
                visible={visibleError}
                setVisible={setVisibleError}
                text={"An error has occured try again !"}
                handlePress={() => setVisibleError(false)}
                buttonText="Close"
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

export default SignUpDriverScreen;

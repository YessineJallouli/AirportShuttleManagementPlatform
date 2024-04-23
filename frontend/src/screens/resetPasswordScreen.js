import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {
    isContainsLowercase,
    isWhiteSpace,
    isContainsUppercase,
    isContainsNumber,
    isContainsSymbol,
    isValidLength,
} from "../utilities/InputValidation";
import PwdValidUI from "../components/pwdValidUI";

const ResetPasswordScreen = () => {
    const [newPwdValue, setNewPwdValue] = useState("");
    const [newPwdValueConf, setNewPwdValueConf] = useState("");
    const [match, setMatch] = useState(true);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter the sent code</Text>

            <CustomInput name="Enter Code" secure={false} />

            <CustomInput
                name="Enter new Password"
                secure={true}
                value={newPwdValue}
                onChange={setNewPwdValue}
            />

            <PwdValidUI
                isWhiteSpace={isWhiteSpace(newPwdValue)}
                isContainsUppercase={isContainsUppercase(newPwdValue)}
                isContainsLowercase={isContainsLowercase(newPwdValue)}
                isContainsNumber={isContainsNumber(newPwdValue)}
                isContainsSymbol={isContainsSymbol(newPwdValue)}
                isValidLength={isValidLength(newPwdValue)}
            />

            <CustomInput
                style={{ marginTop: 20 }}
                name="Confirm new Password"
                secure={true}
                value={newPwdValueConf}
                onChange={setNewPwdValueConf}
            />

            {/* shows only when the Email is not valid */}
            <View style={{ width: "80%", marginBottom: 10 }}>
                {!match && (
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                        Password doesn't not match
                    </Text>
                )}
            </View>

            <CustomButton
                name="Reset Password"
                onPress={() => {
                    setMatch(newPwdValue == newPwdValueConf);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default ResetPasswordScreen;

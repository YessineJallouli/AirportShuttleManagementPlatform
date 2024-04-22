import { View, Text, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the sent code</Text>

      <CustomInput name="Enter Code" secure={false} />

      <CustomInput name="Enter new Password" secure={true} />

      <CustomInput
        style={{ marginTop: 20 }}
        name="Confirm new Password"
        secure={true}
      />

      <CustomButton name="Reset Password" />
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

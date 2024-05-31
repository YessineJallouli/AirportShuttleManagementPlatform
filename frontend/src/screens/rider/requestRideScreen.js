import React, { useEffect, useState, useRef } from "react";
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    FlatList,
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import styled from "styled-components";
import airportsData from '../../../assets/airports.json';

const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: '#6D28D9',
    green: "#108981",
    red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
    margin-top: 50px;
`;

const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
    text-align: center;
`;

const RequestRideScreen = ({ route, navigation }) => {
    const [airportInput, setAirportInput] = useState("");
    const [airportData, setAirportData] = useState([]);
    const [inputLayout, setInputLayout] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const [notSelected, setNotSelected] = useState(true);

    const onChangeAirportInput = async (text) => {
        setAirportInput(text);
        setNotSelected(true);

        if (text.length > 2) {
            const filteredAirports = airportsData.filter(
                (airport) =>
                    airport.name && airport.name.toLowerCase().startsWith(text.toLowerCase())
            );
            setAirportData(filteredAirports);
        } else {
            setAirportData([]);
        }

        console.log(airportData);
    };

    useEffect(() => {
        if (route.params && route.params.destinationCoordinate) {
            console.log("Destination selected successfully:", route.params.destinationCoordinate);
        }
    }, [route.params?.destinationCoordinate]);

    const chooseDestination = () => {
        navigation.navigate("Map");
    };
    const selectAirport = (airportName) => {
        console.log("hi");
        console.log(airportName);
        console.log(notSelected);
        setAirportInput(airportName);
        setNotSelected(false);
    };


    const getAirportList = (item) => {
        let mainText = item.name;
        return (
            <View style={{ flexDirection: 'row', alignItems: "center", padding: 15 }}>
                <Text style={{ fontWeight: "700" }}>
                    {mainText}
                </Text>
            </View>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <PageTitle> Request a Ride </PageTitle>
                    <SubTitle> Please fill out the details above to request your ride </SubTitle>
                    <View
                        ref={inputRef}
                        onLayout={(event) => {
                            const layout = event.nativeEvent.layout;
                            setInputLayout(layout);
                        }}
                        style={{ width: "100%", alignItems: "center" }}
                    >
                        <CustomInput
                            name="Landing Airport"
                            value={airportInput}
                            onChange={onChangeAirportInput}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </View>

                    {airportData.length > 0 && notSelected && airportInput.length > 2 && inputLayout && (
                        <FlatList
                            style={[styles.flatList, { top: inputLayout.height + inputLayout.y }]}
                            data={airportData}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    onPress={() => selectAirport(item.name)}
                                    style={styles.pressableItem}
                                >
                                    {getAirportList(item)}
                                </Pressable>
                            )}
                            keyExtractor={item => item.name}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                    <CustomInput name="Flight ID" />
                    <CustomInput name="Estimated Arrival Time" />
                    <CustomInput name="Gate Number" />
                    <CustomInput name="Number of Riders" keyboardType="numeric" />
                    <View style={styles.container}>
                        <Pressable onPress={chooseDestination} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>
                                Select Destination on Map
                            </Text>
                        </Pressable>
                    </View>
                    {route.params && route.params.destinationCoordinate && (
                        <Text> Destination Selected Successfully! </Text>
                    )}
                    <CustomButton name="Confirm Request" />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 14,
        width: "80%",
        borderWidth: 1,
        borderColor: "rgb(150,146,152)",
        borderRadius: 4,
        backgroundColor: "rgb(255, 251, 255)",
        marginBottom: 10,
        marginTop: 5,
    },
    buttonText: {
        fontSize: 15, // Adjust the font size as needed
    },
    flatList: {
        position: "absolute",
        width: "90%",
        zIndex: 100, // Ensure the FlatList is above other components
        backgroundColor: primary, // Optional: To make sure the background is visible
        borderWidth: 1,
        borderColor: darkLight,
    },
    pressableItem: {
        zIndex: 200, // Ensure Pressable items are above FlatList
    },
});
export default RequestRideScreen;

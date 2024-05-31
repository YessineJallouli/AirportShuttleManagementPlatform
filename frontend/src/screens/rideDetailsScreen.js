import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RideDetailsScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Text>Airport: {item.airport}</Text>
            <Text>Flight ID: {item.flightId}</Text>
            <Text>Arrival Day: {item.arrivalDay}</Text>
            <Text>Arrival Time: {item.arrivalTime}</Text>
            <Text>Gate Number: {item.gateNumber}</Text>
            <Text>Number of Riders: {item.nbRiders}</Text>
            <Text style={item.status === 'Pending' ? styles.pending : styles.accepted}>{item.status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    pending: {
        color: 'red',
    },
    accepted: {
        color: 'green',
    },
});

export default RideDetailsScreen;
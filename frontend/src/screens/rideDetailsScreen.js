import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const RideDetailsScreen = ({ route }) => {
    const { item } = route.params;
    
    const navigation = useNavigation();

    const handleViewOnMap = (item) => {
         console.log(item.destinationCoordinate);
         navigation.navigate('MapDetails', { destinationCoordinate: item.destinationCoordinate });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerMessage}>Here are the details for your ride:</Text>
                
                <Text style={styles.label}>Airport</Text>
                <Text style={styles.value}>{item.airport}</Text>
                
                <Text style={styles.label}>Flight ID</Text>
                <Text style={styles.value}>{item.flightId}</Text>
                
                <Text style={styles.label}>Arrival Day</Text>
                <Text style={styles.value}>{item.arrivalDay}</Text>
                
                <Text style={styles.label}>Arrival Time</Text>
                <Text style={styles.value}>{item.arrivalTime}</Text>
                
                <Text style={styles.label}>Gate Number</Text>
                <Text style={styles.value}>{item.gateNumber}</Text>
                
                <Text style={styles.label}>Number of Riders</Text>
                <Text style={styles.value}>{item.nbRiders}</Text>

                <Text style={styles.label}>Destination</Text>
                <TouchableOpacity onPress={() => handleViewOnMap(item)}>
                    <Text style={styles.value}>Click Here To View Destination on Map</Text>
                </TouchableOpacity>

                <Text style={[styles.status, item.status === 'Pending' ? styles.pending : styles.accepted]}>
                    {item.status === 'Pending' ? 'Your ride is currently pending approval' : 'Your ride has been approved'}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    headerMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30,
        textAlign: 'center',
        color: '#444',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    value: {
        fontSize: 18,
        marginBottom: 10,
        color: '#666',
    },
    status: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    pending: {
        backgroundColor: '#f5f5f5',
        color: '#ffc107',
    },
    accepted: {
        backgroundColor: '#f5f5f5',
        color: 'green',
    },
});

export default RideDetailsScreen;


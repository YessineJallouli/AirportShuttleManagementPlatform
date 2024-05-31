import React from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const mapJson = [
    {
        featureType: 'transit.station.airport',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#6200ee',
            },
        ],
    },
    {
        featureType: 'transit.station.airport',
        elementType: 'labels.icon',
        stylers: [
            {
                color: '#ff0000',
            },
            {
                weight: 8,
            },
        ],
    },
    {
        featureType: 'transit.station.airport',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#ff0000',
            },
        ],
    },
];

export default function MapDetailsScreen({route})
{
    const {destinationCoordinate} = route.params;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={destinationCoordinate}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton
                        customMapStyle={mapJson}
                    >
                        <Marker
                            coordinate={destinationCoordinate}
                        />
                    </MapView>


                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        flex: 1,
        width: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    imageStyle: {
        position : 'absolute',
        zIndex: 10000,
        marginBottom: 10,
        width : 50,
        height : 50,
    },
    headerText: {
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        zIndex: 10000,
        textDecorationLine : "underline"
    },
});

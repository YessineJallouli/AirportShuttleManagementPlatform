import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CustomButton from '../components/CustomButton';

const INITIAL_REGION = {
    latitude: 34.21990328478478,
    longitude: 9.94603218510747,
    latitudeDelta: 14.418300729444333,
    longitudeDelta: 8.81210770457983,
};

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

export default function Map() {
    const [markerCoordinate, setMarkerCoordinate] = useState({
        latitude: INITIAL_REGION.latitude,
        longitude: INITIAL_REGION.longitude,
    });

    const onRegionChange = (region) => {
        setMarkerCoordinate({
            latitude: region.latitude,
            longitude: region.longitude,
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={INITIAL_REGION}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton
                        onRegionChange={onRegionChange}
                        customMapStyle={mapJson}>
                        <Marker
                            coordinate={markerCoordinate}
                            title={'Choose your destination'}
                        />
                    </MapView>
                </View>

                <View style={styles.bottomContainer}>
                    <CustomButton name="Confirm Destination" />
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
});

import React, { useState } from 'react';
import {StyleSheet, View, SafeAreaView, Text, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomButton from '../components/CustomButton';
import markerPic from '../../assets/Images/marker.png';

const INITIAL_REGION = {
    latitude: 34.69046202675601,
    longitude: 9.970483537763357,
    latitudeDelta: 14.336851132718834,
    longitudeDelta: 8.812108375132084,
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

export default function Map({route, navigation }) {
    const [markerCoordinate, setMarkerCoordinate] = useState({
        latitude: INITIAL_REGION.latitude,
        longitude: INITIAL_REGION.longitude,
        latitudeDelta: INITIAL_REGION.latitudeDelta,
        longitudeDelta: INITIAL_REGION.longitudeDelta,
    });

    const onRegionChange = (region) => {
        setMarkerCoordinate({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        });
    };


    const handleConfirmDestination = () => {
        navigation.navigate('RequestRide', {destinationCoordinate: markerCoordinate});
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Choose your destination</Text>
                <Image style={styles.imageStyle} source= {markerPic} />

                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={INITIAL_REGION}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton
                        showsUserLocation={true}
                        onRegionChange={onRegionChange}
                        customMapStyle={mapJson}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <CustomButton
                        name="Confirm Destination"
                        onPress={handleConfirmDestination}
                    />
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

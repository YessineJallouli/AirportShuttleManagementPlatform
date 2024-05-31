import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Image, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MD3Colors } from 'react-native-paper';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/Images/splashIcon.png';
import { BASE_URL } from "@env";

export default function HomeScreenRider() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const sidebarAnimation = useState(new Animated.Value(-Dimensions.get('window').width))[0]; // Initially positioned off-screen
    
    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            axios.post(`${BASE_URL}/api/users/userData`, { token: token }).then(res => setUserData(res.data.data));
            await delay(3000);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 2000); // Polling every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    
    const navigation = useNavigation();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
        Animated.timing(sidebarAnimation, {
            toValue: sidebarVisible ? -Dimensions.get('window').width : 0, // Slide in/out
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.removeItem('userRole');
            await AsyncStorage.removeItem('token');
            navigation.replace('SignIn'); // Navigate to SignIn screen
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleAccountDetails = () => {
        navigation.navigate('Account');
    };

    const handleRequestRide = () => {
        navigation.navigate('RequestRide');
    };

    //const pendingRides = userData.rides;

    const confirmedRides = [{ id: '3', ride: 'Confirmed Ride 1' }];

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={primaryPurple} />
            </SafeAreaView>
        );
    } else return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.accountButton}
                    onPress={toggleSidebar}
                    activeOpacity={1} // Ensures button opacity is 100% when pressed
                >
                    <Text style={styles.buttonText}>☰</Text>
                </TouchableOpacity>
                <Image
                    source={Logo} 
                    style={styles.logo}
                />
            </View>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnimation }] }]}>
                <View style={styles.sidebarContent}>
                    <TouchableOpacity style={styles.sidebarButton} onPress={handleAccountDetails}>
                        <Text style={styles.sidebarButtonText}>Account Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sidebarButton} onPress={handleLogOut}>
                        <Text style={styles.sidebarButtonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.closeSidebarButton} onPress={toggleSidebar}>
                    <Text style={styles.closeSidebarButtonText}>Close</Text>
                </TouchableOpacity>
            </Animated.View>
            <Text style={styles.welcomeText}>Welcome {userData.firstName} {'\n'}Feel free to order a ride!</Text>
            <TouchableOpacity style={styles.requestButton}  onPress={handleRequestRide}>
                <Text style={styles.requestButtonText}>Request a Ride</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Your Rides</Text>



            <FlatList
                data={userData.rides}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.rideItem}>
                        <Text>Airport: {item.airport}</Text>
                        <Text>Arrival Day: {item.arrivalDay}</Text>
                        <Text style={item.status === 'Pending' ? styles.pending : styles.accepted}>{item.status}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('RideDetails', {item})}
                            style={styles.detailsButton}
                        >
                            <Text style={styles.detailsButtonText}>Details</Text>
                        </TouchableOpacity>
                    </View>
                )}
                style={styles.rideList}
            />

        </SafeAreaView>
    );
}

const primaryPurple = '#6200EE';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    accountButton: {
        backgroundColor: primaryPurple,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width * 0.75,
        height: '100%',
        backgroundColor: '#fff', // Opaque background
        paddingVertical: 20,
        paddingHorizontal: 10,
        elevation: 5,
        zIndex: 1000,
    },
    sidebarContent: {
        flex: 1,
        justifyContent: 'flex-start', // Align buttons towards the top
        alignItems: 'center',
        marginTop: 100, // Adjust this value to move buttons down
    },
    sidebarButton: {
        backgroundColor: primaryPurple,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        width: '80%',
    },
    sidebarButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeSidebarButton: {
        alignItems: 'center',
        marginVertical: 20,
    },
    closeSidebarButtonText: {
        color: primaryPurple,
        fontSize: 16,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    requestButton: {
        backgroundColor: primaryPurple,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    requestButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    rideList: {
        marginBottom: 20,
        marginHorizontal: 20,
    },
    rideItem: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        marginBottom: 10
    },
    pending: {
        color: '#ffc107',
    },
    accepted: {
        color: 'green',
    },
    detailsButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    detailsButtonText: {
        fontWeight: 'bold',
        color: 'black',
    },
});

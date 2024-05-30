import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Image, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MD3Colors } from 'react-native-paper';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/Images/logo_tmp.jpg';
import { BASE_URL } from "@env";


export default function HomeScreenRider() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const [userData, setUserData]= useState(null);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try{
            const token = await AsyncStorage.getItem("token");
            axios.post(`${BASE_URL}/api/users/userData`, {token : token}).then(res => setUserData(res.data.data));
            await delay(3000);
        }catch(error){
            console.error('Error fetching user data:', error);
        }finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);
    
    const navigation = useNavigation();
    const [showAccountOptions, setShowAccountOptions] = useState(false);

    const handleAccountClick = () => {
        setShowAccountOptions(!showAccountOptions);
    };

    const handleLogOut = async () => {
        console.log("hello there");
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

    const pendingRides = [{ id: '1', ride: 'Pending Ride 1' }, { id: '2', ride: 'Pending Ride 2' }];
    const confirmedRides = [{ id: '3', ride: 'Confirmed Ride 1' }];

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={primaryPurple} />
            </SafeAreaView>
        );
    }else return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.accountButton}
                    onPress={handleAccountClick}
                    activeOpacity={1} // Ensures button opacity is 100% when pressed
                >
                    <Text style={styles.buttonText}>☰</Text>
                </TouchableOpacity>
                <Image
                    source={Logo} 
                    style={styles.logo}
                />
                {showAccountOptions && (
                    <View style={styles.accountOptions}>
                        <Button title="Account Details" onPress={handleAccountDetails} color={MD3Colors.primary30} />
                        <Button title="Log Out" onPress={handleLogOut} color={MD3Colors.primary30} />
                    </View>
                )}
            </View>
            <Text style={styles.welcomeText}>Welcome {userData.firstName} {'\n'}Feel free to order a ride !</Text>
            <TouchableOpacity style={styles.requestButton}>
                <Text style={styles.requestButtonText}>Request a Ride</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Pending Rides</Text>
            <FlatList
                data={pendingRides}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text style={styles.rideItem}>{item.ride}</Text>}
                style={styles.rideList}
            />
            <Text style={styles.sectionTitle}>Confirmed Rides</Text>
            <FlatList
                data={confirmedRides}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text style={styles.rideItem}>{item.ride}</Text>}
                style={styles.rideList}
            />

            <Button title = "logout" onPress = {handleLogOut}/>
        </SafeAreaView>
    );
}

const primaryPurple = '#6200EE';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    accountOptions: {
        position: 'absolute',
        top: 40,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 5,
        padding: 10,
        elevation: 5,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    requestButton: {
        backgroundColor: primaryPurple,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
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
    },
    rideItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 3,
    },
});

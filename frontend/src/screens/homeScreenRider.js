import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Text } from "react-native";
import axios from "axios";
import {BASE_URL} from "@env";
const HomeScreenRider = () => {
    const [userData, setUserData]= useState(null);
    const fetchData = async () => {
        try{
            const token = await AsyncStorage.getItem("token");
            axios.post(`${BASE_URL}/api/users/userData`, {token : token}).then(res => setUserData(res.data.data));
        }catch(error){
            console.error('Error fetching user data:', error);
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);
    return <Text>{userData ? `Welcome, ${userData.firstName}` : 'Welcome rider'}</Text>
}

export default HomeScreenRider;
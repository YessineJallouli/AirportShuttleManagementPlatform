import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenDriver from '../screens/homeScreenDriver'; // Assuming you have a screen for driver home
import UserAccountScreen from '../screens/userAccountScreen';
import Map from '../screens/mapScreen';

const DriverStack = createNativeStackNavigator();

const DriverStackNavigator = () => (
    <DriverStack.Navigator screenOptions={{ headerShown: false }}>
        <DriverStack.Screen name="DriverHome" component={HomeScreenDriver} />
        <DriverStack.Screen name="UserAccount" component={UserAccountScreen} />
        <DriverStack.Screen name="Map" component={Map} />
    </DriverStack.Navigator>
);

export default DriverStackNavigator;

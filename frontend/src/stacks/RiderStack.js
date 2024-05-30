import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenRider from '../screens/homeScreenRider';
import UserAccountScreen from '../screens/userAccountScreen';
import Map from '../screens/mapScreen';

const RiderStack = createNativeStackNavigator();

const RiderStackNavigator = () => (
    <RiderStack.Navigator screenOptions={{ headerShown: false }}>
        <RiderStack.Screen name="HomeScreenRider" component={HomeScreenRider} />
        <RiderStack.Screen name="UserAccount" component={UserAccountScreen} />
        <RiderStack.Screen name="Map" component={Map} />
    </RiderStack.Navigator>
);

export default RiderStackNavigator;

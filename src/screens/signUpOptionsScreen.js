import {useState} from 'react'
import { View ,Pressable, Image, StyleSheet, Text } from 'react-native';
import driverImage from '../../assets/Images/driver.jpg'
import userImage from '../../assets/Images/user.jpg'
import { Button , MD3Colors } from 'react-native-paper';


const SignUpOptionsScreen = ({navigation}) => {
    const [isDriverPressed, setIsDriverPressed] = useState(false);
    const [isUserPressed, setIsUserPressed] = useState(false);

    return(
        <View style = {styles.container}>
            <Text style= {{fontSize : 20, marginTop: 20, marginBottom : 40}}>Sign up as</Text>
        <View style = {styles.subContainer}>
            <Pressable style = {styles.pressContainer} onPress = {() => {setIsDriverPressed(true); setIsUserPressed(false);}}>
            <Image
                source= {driverImage}
                style = {[styles.img,  isDriverPressed && styles.pressed ]}  
            />
            <Text style = {{marginTop : 10}}>Driver</Text>
        </Pressable>

        <Pressable style = {styles.pressContainer} onPress = {() => {setIsDriverPressed(false); setIsUserPressed(true);}}>
            <Image
                source= {userImage}
                style = {[styles.img, isUserPressed && styles.pressed]}
                resizeMode='contain'
            />
            <Text style = {{marginTop : 10}}>User</Text>
        </Pressable>

        </View>
        <Button mode = "contained" onPress = {() => {
            if(isUserPressed){
                navigation.navigate('SignUpUser');
            }else{

            }
        }}>
            Continue 
        </Button>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
    },

    subContainer : {
        flexDirection : 'row',
    },

    img : {
        height : 200,
        borderWidth : 2,
        borderColor : 'black',
        width : '100%',
        borderRadius: 10
    },

    pressContainer : {
        height : 250,
        alignItems : 'center',
        padding : 10,
        width: '50%'
         
    },
    
    pressed : {
        borderWidth : 4,
        borderColor : MD3Colors.primary30,
        
    }
});

export default SignUpOptionsScreen;
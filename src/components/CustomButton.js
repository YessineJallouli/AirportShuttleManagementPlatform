import { Text, StyleSheet } from 'react-native';
import { Button, MD3Colors } from 'react-native-paper';

const CustomButton = (props) => {
    return(
        <Button 
            mode = 'contained-tonal' 
            style = {styles.btn} 
            onPress={props.onPress}>
            <Text style = {{color : 'white'}}>{props.name}</Text>
        </Button>
    );
}

const styles = StyleSheet.create({
    btn : {
        backgroundColor : MD3Colors.primary20,
        width : '70%',
        marginBottom : 20
    }
});

export default CustomButton;
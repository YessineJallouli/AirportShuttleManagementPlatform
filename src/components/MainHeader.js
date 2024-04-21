import { Image, StyleSheet } from 'react-native';
import TypeWriter from 'react-native-typewriter'
import Logo from '../../assets/Images/logo_tmp.jpg';

const MainHeader = () => {
    return(
        <>
            <Image source={Logo} style ={styles.logo}/>
            <TypeWriter typing = {1} style = {styles.welcomeText}>Land Anywhere and we'll give you a ride...</TypeWriter>
        </>
    );
}

const styles = StyleSheet.create({
    logo : {
        width : 300,
        height : 250,
    },

    welcomeText : {
        fontSize : 15,
        fontWeight : 'bold',
        marginBottom : 40
    }
});

export default MainHeader;
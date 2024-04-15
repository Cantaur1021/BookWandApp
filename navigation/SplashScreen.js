import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';


export default function Splash({ navigation }) {


    setTimeout(() => {
        navigation.navigate('SignIn');
    }, 2000)


   
    return (
        <View style={styles.root}>
            <View style={styles.ImageContainer}>
                <Image style={styles.image}
                    source={require('../assets/iphone-splash-preview-dark.png')} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },

    image: {
        width: 200,
        height: 200,

    }

});
import React from 'react';
import { Text, View, ImageBackground, StyleSheet, StatusBar, Image } from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import Colors from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import { scaleUI } from '../../config/constants/ScaleUI';
import { useNavigation } from '@react-navigation/native';
import { WINDOW_HEIGHT } from '../../config/constants/DimensionsWindown';

const Boarding = ({ navigation }) => {
    const Navigation = useNavigation();
    const handleMovetoLogin = () => {
        Navigation.navigate('SignIn');
    }
    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/boarding.jpg')}
                        resizeMode="stretch"
                        style={styles.image}></Image>
                </View>
                <View style={styles.content}>
                    <Text style={styles.description}>
                        Vì chúng tôi có thể giúp bạn tiết kiệm thời gian và nhân lực!
                    </Text>
                    <View style={styles.buttonContainer}>
                        <BigCustomButton onPress={handleMovetoLogin}>
                            Get Started
                        </BigCustomButton>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Boarding;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE
    },
    imageContainer: {
        paddingTop: 40,
        height: "60%",
    },
    image: {
        flex: 1,
    },
    content: {
        height: "40%",
        backgroundColor: Colors.SECONDARY
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginLeft: 30,
        bottom: 40,
    },
    description: {
        padding: 30,
        margin: 15,
        fontSize: FontSize.H4,
        borderWidth:0.5,
        borderRadius: 8,
        backgroundColor: Colors.WHITE,
        fontFamily: Fonts.POPPINS,
        color: Colors.PRIMARY,
    },
})
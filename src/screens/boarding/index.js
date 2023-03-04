import React from 'react';
import { Text, View, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import Colors from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import { scaleUI } from '../../config/constants/ScaleUI';
import { useNavigation } from '@react-navigation/native';

const Boarding = ({navigation}) => {
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
            <ImageBackground
                source={require('../../assets/images/boarding.jpg')}
                resizeMode="stretch"
                style={styles.image}>
                <View style={styles.backGroundColor}>
                    <Text style={styles.heading}>CHÀO MỪNG BẠN {'\n'}ĐẾN VỚI CÔNG TY CHÚNG TÔI!</Text>
                    <Text style={styles.description}>
                        Vì chúng tôi có thể giúp bạn tiết kiệm thời gian và nhân lực!   
                    </Text>
                    <View style={styles.buttonContainer}>
                        <BigCustomButton onPress={handleMovetoLogin}>
                            Get Started
                        </BigCustomButton>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

export default Boarding;

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    backGroundColor: {
        backgroundColor: 'transparent',
        marginTop: 60
    },
    buttonContainer: {
        position: 'absolute',
        bottom: scaleUI(-100, true),
        left: 0,
        right: 0,
        marginHorizontal: 24,
    },
    description: {
        fontSize: FontSize.BODY_18,
        fontFamily: Fonts.POPPINS,
        color: Colors.WHITE,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    heading: {
        fontSize: FontSize.H3,
        fontWeight: "bold",
        fontFamily: Fonts.POPPINS_BOLD,
        marginTop: 100,
        color: Colors.SECONDARY,
    }
})
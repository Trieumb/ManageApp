import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { WINDOW_WITH } from '../config/constants/DimensionsWindown';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Colors from '../config/constants/Colors';
import Fonts from '../config/constants/Fonts';
import FontSize from '../config/constants/FontSize';


const BigCustomButton = ({
    children,
    onPress,
    disable,
}) => {
    return (
        <>
            {!disable ? (
                <Pressable onPress={onPress} style={styles.button}>
                    <Text style={styles.text}>{children}</Text>
                </Pressable>
            ) : (
                <View style={[styles.disableButton]}>
                    <LoadingSpinner color={Colors.WHITE} />
                </View>
            )}
        </>
    );
};

export default BigCustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.PRIMARY,
        width:WINDOW_WITH - 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        marginVertical: 8,
        marginTop: 15,
    },
    disableButton: {
        backgroundColor: Colors.SECONDARY,
        width:WINDOW_WITH - 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 10,
    },
    pressed: {
        opacity: 0.25,
    },
    text: {
        fontFamily: Fonts.POPPINS,
        fontWeight: '600',
        fontSize: FontSize.H5,
        color: Colors.WHITE,
    },
    disableText: {
        backgroundColor: Colors.NEUTRAL_20,
    },
});

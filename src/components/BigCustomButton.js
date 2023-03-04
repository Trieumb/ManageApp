import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { WINDOW_WITH } from '../config/constants/DimensionsWindown';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { COLORS, FONTS, FONT_SIZE } from '../config/constants';

const BigCustomButton = ({
    children,
    onPress,
    disable,
}) => {
    return (
        <>
            {!disable ? (
                <Pressable
                    style={({ pressed }) =>
                        pressed
                            ? [styles.button, styles.pressed]
                            : [styles.button]
                    }
                    onPress={onPress}>
                    <Text style={[styles.text]}>{children}</Text>
                </Pressable>
            ) : (
                <View style={[styles.disableButton]}>
                    <LoadingSpinner color={COLORS.WHITE} />
                </View>
            )}
        </>
    );
};

export default BigCustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.PRIMARY,
        width:WINDOW_WITH - 60,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    disableButton: {
        backgroundColor: COLORS.PRIMARY,
        width:WINDOW_WITH - 60,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    pressed: {
        opacity: 0.25,
    },
    text: {
        paddingVertical: 16,
        fontFamily: FONTS.POPPINS,
        fontWeight: 'bold',
        fontSize: FONT_SIZE.H5,
        color: COLORS.WHITE,
    },
    disableText: {
        backgroundColor: COLORS.NEUTRAL_20,
    },
});

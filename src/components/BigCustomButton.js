import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    TextStyle,
    ViewStyle
} from 'react-native';
import { COLORS, FONTS, FONT_SIZE } from '../config/constants';

const BigCustomButton = ({
    children,
    onPress,
    disable,
    ViewStyle,
    TextStyle,
    disable
}) => {
    return (
        <>
            {!disable ? (
                <Pressable
                    style={({ pressed }) =>
                        pressed
                            ? [styles.button, styles.pressed, ViewStyle]
                            : [styles.button, ViewStyle]
                    }
                    onPress={onPress}>
                    <Text style={[styles.text, TextStyle]}>{children}</Text>
                </Pressable>
            ) : (
                <View style={[styles.disableButton, ViewStyle]}>
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
        width: DEMENSION_WINDOW.WINDOW_WITH - 60,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    disableButton: {
        backgroundColor: COLORS.PRIMARY,
        width: DEMENSION_WINDOW.WINDOW_WITH - 60,
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

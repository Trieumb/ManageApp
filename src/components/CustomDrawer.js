import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    StatusBar,
    Pressable,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import Fonts from '../config/constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = (props) => {
    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={styles.container}>
                <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: Colors.SECONDARY}}>
                    <ImageBackground
                        style={styles.imageBakground}>
                        <Text style={styles.author}>Xin chào! Trieumb</Text>
                        <Image source={{ uri: 'https://www.pngitem.com/pimgs/m/523-5236058_nh-icon-hot-hnh-hd-png-download.png' }}
                            style={styles.image} />
                    </ImageBackground>
                    <View style={styles.listDrawerContainer}>
                        <DrawerItemList  {...props}/>
                    </View>   
                </DrawerContentScrollView>
                <View style={styles.footer}>
                    <Pressable style={styles.buttonFooter}>
                        <View style={styles.buttonItem}>
                            <Ionicons name='logo-facebook' size={20} />
                            <Text style={styles.textFooter}>ThangMayHaNoi</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.buttonFooter}>
                        <View style={styles.buttonItem}>
                        <Ionicons name='exit-outline' size={20} />
                        <Text style={styles.textFooter}>Đăng xuất</Text>
                        </View>
                    </Pressable>
                </View>

            </View>
        </>

    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        backgroundColor: Colors.WHITE
    },
    listDrawerContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        borderRadius: 8
    },
    imageBakground: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    author: {
        color: Colors.BLACK,
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: FontSize.BODY_18,
        marginRight: 20
    },
    footer: {
        backgroundColor: "transparent",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.SECONDARY,
    },
    buttonFooter: {
        paddingVertical: 10,
    },
    buttonItem: {
        flexDirection: 'row',
    },
    textFooter: {
        fontSize: FontSize.BODY,
        fontFamily: Fonts.POPPINS_BOLD,
        
    }
})
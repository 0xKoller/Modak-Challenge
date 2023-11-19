import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {RootStackParams } from '../../types/index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SavedNavigationProp = NativeStackNavigationProp<RootStackParams, 'Saved'>;

const Header = () => {
    

    const {navigate} = useNavigation<SavedNavigationProp>();
    
    // const handleView = (route: 'Home' | 'Saved') => {
    //     navigate(route);
    // }

    return (
        <View style={styles.container}>
            {/* <View style={styles.left}>
                <TouchableOpacity onPress={() => handleView('Home')}>
                    <Image  style={styles.image} source={require('../../../assets/logo.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.right}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => handleView('Home')}>
                        <Text>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleView('Saved')}>
                        <Text>Saved</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        shadowColor: "#000", // El color de la sombra
        shadowOffset: { width: 0, height: 4 }, // La dirección de la sombra
        shadowOpacity: 0.3, // La opacidad de la sombra
        shadowRadius: 5, // El desenfoque de la sombra
        // Propiedad de sombra para Android
        elevation: 8, // La altura de la sombra, que da el efecto 3D
        paddingTop: 40,
    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
    },
    image: {
        width: 70,
        height: 70,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 120,
    }
});

export default Header;
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image  style={styles.image} source={require('../../../assets/logo.png')} />
            </View>
            <View style={styles.right}>
                <Text style={styles.title}>Header</Text>
            </View>
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
});

export default Header;
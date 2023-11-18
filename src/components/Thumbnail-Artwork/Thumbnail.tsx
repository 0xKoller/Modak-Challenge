import React, {FC} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Artwork } from '../../types/index';

const ThumbnailArtwork: FC<Artwork> = ({id, image_id, title, artist_display}) => {
    const BASE_IMAGE_URL = `https://www.artic.edu/iiif/2/`
    const DEFAULT_RES = `/full/843,/0/default.jpg`
    return (
        <View style={styles.container} key={id}>
            {image_id !== null && (
                <Image style={styles.image} source={{uri: `${BASE_IMAGE_URL}${image_id}${DEFAULT_RES}`}} />
            )}
            <View style={styles.detail}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{artist_display}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        alignItems: 'center',
        backgroundColor: '#fefefe',
        justifyContent: 'space-around',
        width: "80%", // Mantener el ancho en 25%
        padding: 10, // Ajustar según sea necesario
        margin: 10, // Ajustar según sea necesario
        shadowColor: "#000", // El color de la sombra
        shadowOffset: { width: 0, height: 4 }, // La dirección de la sombra
        shadowOpacity: 0.3, // La opacidad de la sombra
        shadowRadius: 5, // El desenfoque de la sombra
        borderRadius: 10, // El radio de la esquina del elemento
        // Propiedad de sombra para Android
        elevation: 8, // La altura de la sombra, que da el efecto 3D
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        overflow: 'hidden',
    },
    detail: {
        alignSelf: 'stretch', // Asegura que el contenedor se extienda completamente
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#555",
        textAlign: 'left', // Asegura que el texto está alineado a la izquierda
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#CCC",
        textAlign: 'left', // Asegura que el texto está alineado a la izquierda
    },
});

export default ThumbnailArtwork;
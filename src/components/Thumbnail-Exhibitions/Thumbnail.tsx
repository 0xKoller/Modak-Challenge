import React, {FC} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { Exhibitions } from '../../types/index';

const ThumbnailExhibitions: FC<{exhibitions: Exhibitions[]}> = ({ exhibitions }) => {
    const BASE_IMAGE_URL = `https://www.artic.edu/iiif/2/`
    const DEFAULT_RES = `/full/843,/0/default.jpg`
    console.log(exhibitions)
    return (
        <View >
            <ScrollView>
            {exhibitions?.map((exhibition) => (
                <View style={styles.container} key={exhibition.id}>
                    {exhibition.image_id !== null && (
                        <Image style={styles.image} source={{uri: `${BASE_IMAGE_URL}${exhibition.image_id}${DEFAULT_RES}`}} />
                    )}
                    <View style={styles.detail}>
                        <Text style={styles.title}>{exhibition.title}</Text>
                        <Text style={styles.subtitle}>{exhibition.gallery_title}</Text>
                        <Text style={styles.description}>{exhibition.short_description}</Text>
                    </View>
                </View>
            )
            )}
            </ScrollView>
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
    description: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#CCC",
        textAlign: 'left', // Asegura que el texto está alineado a la izquierda
    },
});

export default ThumbnailExhibitions;
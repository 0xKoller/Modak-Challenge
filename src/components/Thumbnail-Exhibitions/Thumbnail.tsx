import React, {FC} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Exhibitions, RootStackParams } from '../../types/index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ExhibitionNavigationProp = NativeStackNavigationProp<RootStackParams, 'ExhibitionDetail'>;

const ThumbnailExhibitions: FC<{exhibitions: Exhibitions[]}> = ({ exhibitions }) => {
    const BASE_IMAGE_URL = `https://www.artic.edu/iiif/2/`
    const DEFAULT_RES = `/full/843,/0/default.jpg`

    const {navigate} = useNavigation<ExhibitionNavigationProp>();
    
    const handleView = (id: string): void => {
        navigate('ExhibitionDetail', {id});
    }
    const cleanTags = (description) => {
        return description.replace(/<\/?p>/g, '');
    }

    
    return (
        <View style={styles.container}>
            {exhibitions?.map((exhibition) => (
                <View style={styles.exhibition} key={exhibition.id}>
                    {exhibition.image_url !== null && (
                        <Image style={styles.image} source={{uri: `${exhibition.image_url}`}} />
                    )}
                    <View style={styles.detail}>
                        <Text style={styles.title}>{exhibition.title}</Text>
                        {exhibition.gallery_title !== null && <Text style={styles.subtitle}>Been displayed at {exhibition.gallery_title}</Text>}
                        <Text style={styles.description}>{cleanTags(exhibition.short_description)}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => handleView(exhibition.id)}>
                        <Text>See more</Text>
                    </TouchableOpacity>
                </View>
            )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        alignItems: 'center',
        backgroundColor: '#fefefe',
        justifyContent: 'space-around',
        width: "80%", 
        margin: 10, 
    },
    exhibition:
    {
        alignItems: 'center',
        backgroundColor: '#fefefe',
        justifyContent: 'space-around',
        width: "100%", 
        padding: 10, 
        margin: 10, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 5,
        borderRadius: 10, 
        elevation: 8, 
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        overflow: 'hidden'
    },
    detail: {
        alignSelf: 'stretch'
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#555",
        textAlign: 'left'
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#CCC",
        textAlign: 'left'
    },
    description: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#888",
        textAlign: 'left',
        lineHeight: 20,
        marginTop: 10
    },
    
    button: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
    },
});

export default ThumbnailExhibitions;
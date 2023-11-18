import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import Header from '../../components/Header';
import ThumbnailArtwork from '../../components/Thumbnail-Artwork/Thumbnail';
import ThumbnailExhibitions from '../../components/Thumbnail-Exhibitions/Thumbnail';

import fetchApi from '../../utils/fetch';
import { Artwork, Exhibitions } from '../../types';

const Home = () => {
    const [artwork, setArtwork] = useState<Artwork[]>([]);
    const [exhibitions, setExhibitions] = useState<Exhibitions[]>([]);

    useEffect(() => {
        const getLatestArtwork = async () => {
            try {
                const quantity = 1; // Como solo esperas un objeto
                const response = await fetchApi(`/artworks?limit=${quantity}&fields=id,title,artist_display,image_id`);
                setArtwork(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        const getLatestExhibitions = async () => {
             try {
                const quantity = 4; // Como solo esperas un objeto
                const response = await fetchApi(`/exhibitions?limit=${quantity}&fields=id,title,gallery_title,short_description,image_id`);
                setExhibitions(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getLatestArtwork().catch(console.error);
        getLatestExhibitions().catch(console.error);
    }, []);

    // console.log(exhibitions);
    return (
        <View style={styles.container}>
            <Header />
            <View>
                <Text style={styles.title}>Art of the day</Text>
                <View style={styles.artOfTheDay}>
                    {artwork.length === 0 ? <ActivityIndicator size="large" color="#ccc" /> : artwork.map((art) => <ThumbnailArtwork key={art.id} {...art} />)}
                </View>
            </View>
            <View>
                <Text style={styles.title}>Last exhibitions</Text>
                <View style={styles.artOfTheDay}>
                    {exhibitions.length === 0 ? <ActivityIndicator size="large" color="#ccc" /> : <ThumbnailExhibitions exhibitions={exhibitions} />}
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',        
    },
    artOfTheDay: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: 'left', 
        marginLeft: 20,
        marginTop: 20,
        color: "#555",
    },
});

export default Home;
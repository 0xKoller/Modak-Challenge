import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import useArtworkStorage from '../../hooks/useArtworkStorage';

import fetchApi from '../../utils/fetch';

import { Artwork } from '../../types';
import ThumbnailArtwork from '../../components/Thumbnail-Artwork';


const Saved = () => {
    const [artworkIDs, setArtworkIDs] = useState<String[]>([]);
    const [artworkData, setArtworkData] = useState<Artwork[]>([]); 
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const {getArtworkStorage, removeArtworkStorage} = useArtworkStorage();
    
    const getArtwork = async () => {
        try {
            const response = await getArtworkStorage();
            const data = JSON.parse(response);
            setArtworkIDs(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getArtworkData = async (id: String) => {
        console.log(id)
        const response = await fetchApi(`/artworks/${id}`);
        return response.data;
    }

    useEffect(() => {
        getArtwork().catch(console.error).finally(() => setIsLoading(false));
    }, [])
    
    useEffect(() => {
        if (artworkIDs.length > 0) {
            const promises = artworkIDs.map((id) => getArtworkData(id));
            Promise.all(promises).then((data) => setArtworkData(data));          
        }
    }, [artworkIDs])



    const handleDelete = async (id: String) => {
        try {
            const response = await removeArtworkStorage(id);
            if (response.length !== 0) {
                getArtwork().catch(console.error).finally(() => setIsLoading(false));
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            {/* <Header/> */}
            {/* <TouchableOpacity onPress={() => handleDelete('7122')}>
                <Text>Erase</Text>
            </TouchableOpacity> */}
                <View style={styles.container}>
                    {isLoading ? <ActivityIndicator size="large" color="#ccc" /> : 
                    artworkIDs.length === 0 ? <Text>There is no saved artwork</Text> :
                    <ScrollView style={styles.scroll}>
                        {artworkData.length === 0 ? <ActivityIndicator size="large" color="#ccc" /> : artworkData.map((art) => <ThumbnailArtwork {...art} />)}
                    </ScrollView>}
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        color: '#222'
    },
    scroll:{
        width: '100%',
        height: '100%',
        marginBottom: 80,
    }
})


export default Saved

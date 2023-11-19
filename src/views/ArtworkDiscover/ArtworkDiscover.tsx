import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';


import {RootStackParams } from '../../types/index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ThumbnailArtwork from '../../components/Thumbnail-Artwork';
import fetchApi from '../../utils/fetch';

import { Artwork } from '../../types';

const ArtworkDiscover = () => {
    const [artwork, setArtwork] = useState<Artwork[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>(''); // Estado para el input de búsqueda

    const getLatestArtwork = async () => {
        await fetchApi(`/artworks/search?q=${searchQuery}&limit=10&fields=id,title,artist_display,image_id`)
        .then((response) => {
            setArtwork(response.data);
        })
    };
    useEffect(() => {
        getLatestArtwork().catch(console.error).finally(() => {setIsLoading(false)});
    }, []);

    useEffect(() => {
        if (artwork !== undefined && artwork.length > 0) {
            console.log(artwork)
        }
    }, [artwork])

    useEffect(() => {
        getLatestArtwork().catch(console.error).finally(() => {setIsLoading(false)});
    }, [searchQuery])

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }
  return (
    <ScrollView>
        <Text>ArtworkDiscover</Text>
        <TextInput
                style={styles.input}
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Search..."
                placeholderTextColor="#666"
            />
            <View>
                {artwork.length === 0 ? <ActivityIndicator size="large" color="#ccc" /> : artwork.map((art) => <ThumbnailArtwork key={art.id} {...art} />)}
            </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        fontSize: 18,
    },
})

export default ArtworkDiscover
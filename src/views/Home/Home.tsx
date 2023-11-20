/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView } from 'react-native';

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
        const quantity = 2;
        const response = await fetchApi(
          `/artworks?limit=${quantity}&fields=id,title,artist_display,image_id,updated_at`
        );
        setArtwork(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    // const getLatestExhibitions = async () => {
    //     const oneYearAgo = new Date();
    //     oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    //     const oneYearAgoDateString = oneYearAgo.toISOString(); // Formato ISO 8601
    //     try {
    //         const quantity = 4;
    //         const response = await fetchApi(`/exhibitions/search?query[range][aic_start_at][gte]=${oneYearAgoDateString}&limit=${quantity}&fields=id,title,short_description,gallery_title,image_url,aic_start_at, aic_end_at`);
    //         setExhibitions(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    getLatestArtwork().catch(console.error);
    // getLatestExhibitions().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Art of the day</Text>
          <View style={styles.artOfTheDay}>
            {artwork.length === 0 ? (
              <ActivityIndicator size="large" color="#ccc" />
            ) : (
              artwork.map((art) => <ThumbnailArtwork key={art.id} {...art} />)
            )}
          </View>
        </View>
        {/* <View>
                <Text style={styles.title}>Last exhibitions</Text>
                <View style={styles.artOfTheDay}>
                    {exhibitions.length === 0 ? <ActivityIndicator size="large" color="#ccc" /> : <ThumbnailExhibitions exhibitions={exhibitions} />}
                </View>
            </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  artOfTheDay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 20,
    color: '#555',
  },
});

export default Home;

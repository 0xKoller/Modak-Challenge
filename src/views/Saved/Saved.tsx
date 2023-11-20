import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import useArtworkStorage from '../../hooks/useArtworkStorage';
import { useFocusEffect } from '@react-navigation/native';

import fetchApi from '../../utils/fetch';

import { Artwork } from '../../types';
import ThumbnailArtwork from '../../components/Thumbnail-Artwork';

const Saved = () => {
  const [artworkIDs, setArtworkIDs] = useState<string[]>([]);
  const [artworkData, setArtworkData] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getArtworkStorage } = useArtworkStorage();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchSavedArtworks = async () => {
        setIsLoading(true);
        try {
          const response = await getArtworkStorage();
          const data = JSON.parse(response);
          if (isActive) {
            setArtworkIDs(data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      fetchSavedArtworks();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const getArtwork = async () => {
    try {
      const response = await getArtworkStorage();
      const data = JSON.parse(response);
      setArtworkIDs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getArtworkData = async (id: string) => {
    const response = await fetchApi(`/artworks/${id}`);
    return response.data;
  };

  useEffect(() => {
    getArtwork()
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (artworkIDs.length > 0) {
      const promises = artworkIDs.map((id) => getArtworkData(id));
      Promise.all(promises).then((data) => setArtworkData(data));
    }
  }, [artworkIDs]);

  return (
    <View>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#ccc" />
        ) : artworkIDs.length === 0 ? (
          <Text>There is no saved artwork</Text>
        ) : (
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              {artworkData.length === 0 ? (
                <ActivityIndicator size="large" color="#ccc" />
              ) : (
                artworkData.map((art, index) => <ThumbnailArtwork key={index} {...art} />)
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

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
    color: '#222',
  },
  scroll: {
    width: '100%',
    height: '100%',
    marginBottom: 80,
  },
});

export default Saved;

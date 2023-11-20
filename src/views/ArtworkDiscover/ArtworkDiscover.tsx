import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput } from 'react-native';

import ThumbnailArtwork from '../../components/Thumbnail-Artwork';
import fetchApi from '../../utils/fetch';

import { Artwork } from '../../types';

const ArtworkDiscover = () => {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getLatestArtwork = async () => {
    await fetchApi(`/artworks/search?q=${searchQuery}&limit=10&fields=id,title,artist_display,image_id`).then(
      (response) => {
        setArtwork(response.data);
      }
    );
  };

  useEffect(() => {
    if (searchQuery !== '') {
      setIsLoading(true);
      getLatestArtwork()
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Search for new art...</Text>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search..."
            placeholderTextColor="#666"
          />
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#ccc" />
          ) : searchQuery === '' ? (
            <Text style={styles.searchPrompt}>Search for art and artists...</Text>
          ) : artwork.length === 0 ? (
            <Text>No results found.</Text>
          ) : (
            artwork.map((art) => <ThumbnailArtwork key={art.id} {...art} />)
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  searchPrompt: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ArtworkDiscover;

import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Artwork, RootStackParams } from '../../types';

import Header from '../../components/Header';
import fetchApi from '../../utils/fetch';
import useArtworkStorage from '../../hooks/useArtworkStorage';

function ArtworkDetail() {
  const { params } = useRoute<NativeStackScreenProps<RootStackParams, 'ArtworkDetail'>['route']>();
  const BASE_IMAGE_URL = `https://www.artic.edu/iiif/2/`
  const DEFAULT_RES = `/full/full/0/color.jpg`

  const [artwork, setArtwork] = useState<Artwork>({});
  const {setArtworkStorage} = useArtworkStorage();

  useEffect(() => {
    const getLatestArtwork = async () => {
          try {
            const response = await fetchApi(`/artworks/${params.id}`);
            const {date_display,place_of_origin,dimensions,publication_history,exhibition_history,artwork_type_title,artist_title,department_title,material_titles} = response.data;
            const artworkData = {
                                      date_display,
                                      place_of_origin,
                                      dimensions,
                                      publication_history,
                                      exhibition_history,
                                      artwork_type_title,
                                      artist_title,
                                      department_title,
                                      material_titles
                                };
            setArtwork(artworkData);
          } catch (error) {
            console.log(error);
        }
      };
      getLatestArtwork().catch(console.error);
    }, []);
    
    const handleSave = async () => {
      try {
        const response = await setArtworkStorage(params.id);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <ScrollView>
        <Header />
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.title} >{params.title}</Text>
            <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
          {params.image_id !== null && (
                <Image style={styles.image} source={{uri: `${BASE_IMAGE_URL}${params.image_id}${DEFAULT_RES}`}} alt='Foto' />
                
            )}
            <View style={styles.description}>
              
              <View style={styles.divider}>
                <Text style={styles.subtitle}>Origin</Text>
              <Text style={styles.headings}>Artist: <Text style={styles.value}> {artwork.artist_title} </Text></Text>
              <Text style={styles.headings}>Date: <Text style={styles.value}> {artwork.date_display} </Text></Text>
              <Text style={styles.headings}>Place of origin: <Text style={styles.value}> {artwork.place_of_origin} </Text></Text>

              </View>
              <View style={styles.divider}>
                <Text style={styles.subtitle}>Materials</Text>
              <Text style={styles.headings}>Dimensions: <Text style={styles.value}> {artwork.dimensions} </Text></Text>
              <Text style={styles.headings}>Type: <Text style={styles.value}> {artwork.artwork_type_title} </Text></Text>
              <Text style={styles.headings}>Department: <Text style={styles.value}> {artwork.department_title} </Text></Text>
              <Text style={styles.headings}>Material: <Text style={styles.value}> {artwork.material_titles} </Text></Text>
              </View>
              <View style={styles.divider}>
                <Text style={styles.subtitle}>History</Text>
              <Text style={styles.headings}>Publication history: <Text style={styles.value}> {artwork.publication_history} </Text></Text>
              <Text style={styles.headings}>Exhibition history: <Text style={styles.value}> {artwork.exhibition_history} </Text></Text>
              </View>
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    width: "95%", 
    marginHorizontal: 10,
    marginVertical: 20,
  },
  title:{
    fontSize: 42,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: '100%', 
    height: 350, 
    resizeMode: 'contain', 
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',

  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#777',

  },
  description: {
    marginVertical: 10,
    width: '100%'
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  headings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginVertical: 2,
  },
  divider: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,

  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555'
  },
  top:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  }
})

export default ArtworkDetail
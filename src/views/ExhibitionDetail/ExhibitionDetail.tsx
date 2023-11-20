import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Exhibitions, RootStackParams } from '../../types';

import Header from '../../components/Header';
import fetchApi from '../../utils/fetch';

function ExhibitionDetail() {
  const { params } = useRoute<NativeStackScreenProps<RootStackParams, 'ExhibitionDetail'>['route']>();
  const BASE_IMAGE_URL = `https://www.artic.edu/iiif/2/`
  const DEFAULT_RES = `/full/full/0/color.jpg`

  const [exhibition, setExhibition] = useState<Exhibitions>({});
  
  const cleanTags = (description) => {
        return description.replace(/<\/?p>/g, '');
  }

  const cleanDates = (date) => {
    const clean = date.replace(/T.*/g, '');
    const formatted = clean.split('-').reverse().join('/');
    return formatted;
  }

  useEffect(() => {
    const getExhibition = async () => {
          try {
            const response = await fetchApi(`/exhibitions/${params.id}`);
            const {title,
              short_description,
              gallery_title,
              status,
              aic_start_at,
              aic_end_at,
              artwork_ids,
              image_url,
              artwork_titles} = response.data;
            const exhibitionData = {
                                     title,
                                      short_description,
                                      gallery_title,
                                      status,
                                      aic_start_at,
                                      aic_end_at,
                                      artwork_ids,
                                      image_url,
                                      artwork_titles
                                };
            setExhibition(exhibitionData);
          } catch (error) {
            console.log(error);
        }
      };
      getExhibition().catch(console.error);
    }, []);
  
  return (
    <ScrollView>
        
        <View style={styles.container}>
          <Text style={styles.title} >{exhibition.title}</Text>
          {exhibition.image_url !== null && (
                <Image style={styles.image} source={{uri: `${exhibition.image_url}`}} alt='Foto' />
                
            )}
            <View style={styles.description}>
              
              <View style={styles.divider}>
                <Text style={styles.subtitle}>About</Text>
                {exhibition.gallery_title !== undefined && exhibition.gallery_title !== null && <Text style={styles.headings}>Been displayed at: <Text style={styles.value}> {exhibition.gallery_title} </Text></Text>}
                
                <Text style={styles.headings}>Status: <Text style={styles.value}> {exhibition.status} </Text></Text>
                {exhibition.short_description !== undefined && <Text style={styles.headings}>Description: <Text style={styles.value}> {(exhibition.short_description)} </Text></Text>}
                
              </View>
              <View style={styles.divider}>
                <Text style={styles.subtitle}>Dates</Text>
                <View style={styles.dates}>
                {exhibition.aic_start_at !== undefined && <Text style={styles.headings}>From: <Text style={styles.value}> {(exhibition.aic_start_at)} </Text></Text>}
                {exhibition.aic_end_at !== undefined && <Text style={styles.headings}>To: <Text style={styles.value}> {(exhibition.aic_end_at)} </Text></Text>}
                </View>
              </View>
              {exhibition.artwork_titles && exhibition.artwork_titles.length > 0 && <View style={styles.divider}>
                <Text style={styles.subtitle}>Artworks</Text>
                <View>
                  {exhibition.artwork_titles?.map((artwork) => (
                    <Text key={artwork} style={styles.artworks}>- {artwork}</Text>
                  )
                  )}
                </View>    
              </View>}
              
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
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: '100%', 
    height: 200, 
    resizeMode: 'cover', 
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
    marginVertical: 5,
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
  },
  dates: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    
  },
  artworks: {
    color: '#555',
  }
})

export default ExhibitionDetail
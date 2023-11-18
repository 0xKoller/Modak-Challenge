import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../types';
import Header from '../../components/Header';

function ArtworkDetail() {
  const { params } = useRoute<NativeStackScreenProps<RootStackParams, 'ArtworkDetail'>['route']>();
  console.log(params)
  const BASE_IMAGE_URL = `https://www.artic.edu/iiif/2/`
  const DEFAULT_RES = `/full/full/0/color.jpg`
  console.log(`${BASE_IMAGE_URL}${params.image_id}${DEFAULT_RES}`)
  return (
    <View>
        <Header />
        <View style={styles.container}>
          <Text>{params.title}</Text>
          {params.image_id !== null && (
                <Image style={styles.image} source={{uri: `${BASE_IMAGE_URL}${params.image_id}${DEFAULT_RES}`}} alt='Foto' />
                
            )}
          <Text>{params.artist_display}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    width: "95%", 
    marginHorizontal: 10,
    marginVertical: 20,
  },
  image: {
    width: '100%', 
    height: 350, 
    resizeMode: 'contain', 
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',

  }
})

export default ArtworkDetail
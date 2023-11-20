import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image, Dimensions, ActivityIndicator, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Artwork, RootStackParams } from '../../types';

import fetchApi from '../../utils/fetch';
import useArtworkStorage from '../../hooks/useArtworkStorage';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const screenWidth = Dimensions.get('window').width;
const BASE_IMAGE_URL = `https://www.artic.edu/iiif/2/`
const DEFAULT_RES = `/full/full/0/color.jpg`

function ArtworkDetail() {
  const { params } = useRoute<NativeStackScreenProps<RootStackParams, 'ArtworkDetail'>['route']>();
  const [artwork, setArtwork] = useState<Artwork>({});
  const {setArtworkStorage, removeArtworkStorage} = useArtworkStorage();
  const [buttonColor, setButtonColor] = useState('#f0f0f0');
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 

  const fadeAnim = useState(new Animated.Value(0))[0]; 
  const textFadeAnimOrigin = useState(new Animated.Value(0))[0]; 
  const textFadeAnimMaterials = useState(new Animated.Value(0))[0]; 
  const textFadeAnimHistory = useState(new Animated.Value(0))[0]; 
  const buttonColorAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const delay = 500; 
    Animated.timing(textFadeAnimOrigin, {
      toValue: 1,
      duration: 1000,
      delay,
      useNativeDriver: true,
    }).start();

    Animated.timing(textFadeAnimMaterials, {
      toValue: 1,
      duration: 1000,
      delay: delay * 2,
      useNativeDriver: true,
    }).start();

    Animated.timing(textFadeAnimHistory, {
      toValue: 1,
      duration: 1000,
      delay: delay * 3,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const getLatestArtwork = async () => {
          try {
            const response = await fetchApi(`/artworks/${params.id}`);
            const {date_display,place_of_origin,dimensions,publication_history,exhibition_history,artwork_type_title,artist_title,department_title,material_titles, color} = response.data;
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
                                if (color) {
              const hexColor = hslToHex(color.h, color.s, color.l);
              setButtonColor(hexColor); 
            }
            setArtwork(artworkData);
          } catch (error) {
            console.log(error);
        }
      };
      getLatestArtwork().catch(console.error);
    }, []);
    
  useEffect(() => {
  if (params.image_id) {
    setIsLoading(true);
    fadeAnim.setValue(0); 

    const imageUrl = `${BASE_IMAGE_URL}${params.image_id}${DEFAULT_RES}`;
    Image.getSize(imageUrl, (width, height) => {
      const aspectRatio = height / width;
      setImageWidth(screenWidth);
      setImageHeight(screenWidth * aspectRatio);
      setIsLoading(false);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, (error) => {
      console.error(`No se pudo determinar el tamaño de la imagen: ${error}`);
      setIsLoading(false);
    });
  }
}, [params.image_id]);

    const handleSave = async () => {
      try {
        const response = await setArtworkStorage(params.id);
        Animated.timing(buttonColorAnim, {
        toValue: 150, 
        duration: 500,
        useNativeDriver: false,
        }).start(() => {
          setButtonColor('#f0f0f0'); 
        });
         if (response.isAlreadySaved) {
          Alert.alert(
            "Artwork Already Saved",
            response.message,
            [{ text: "OK" }]
          );
        } else {
          Alert.alert(
            "Artwork Saved",
            response.message,
            [{ text: "OK" }]
          );
        }
 
      } catch (error) {
        console.log(error)
      }
    }
  
    const handleDelete = async () => {
      try {
        const response = await removeArtworkStorage(params.id);
                 
          Alert.alert(
            "Artwork Deleted",
            "The artwork has been deleted from your saved artworks",
            [{ text: "OK" }]
          );
        
 
      } catch (error) {
        console.log(error)
      }
    }

    const buttonBackgroundColor = buttonColorAnim.interpolate({
      inputRange: [0, 150],
      outputRange: ['#f0f0f0' , buttonColor ] 
    });

  function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

  

  return (
    <ScrollView>
        <View style={styles.container}>
          
         {params.image_id && (
  <View style={{ width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
    {isLoading ? (
          <ActivityIndicator size="large" color="#ccc" />
        ) : (
          <Animated.Image
            style={[styles.image, { opacity: fadeAnim, width: imageWidth, height: imageHeight }]}
            source={{ uri: `${BASE_IMAGE_URL}${params.image_id}${DEFAULT_RES}` }}
            onLoadEnd={() => setIsLoading(false)}
          />
        )}
  </View>
)}

            <View style={styles.top}>
            <Text style={styles.title} >{params.title}</Text>
            <View>
            <AnimatedTouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: buttonBackgroundColor }]}>
              <Text style={styles.buttonText}>Save</Text>
            </AnimatedTouchableOpacity>
            
            <AnimatedTouchableOpacity onPress={handleDelete} style={styles.button}>
              <Text style={styles.buttonText}>Delete</Text>
            </AnimatedTouchableOpacity>
            </View>
          </View>
            <View style={styles.description}>
            {(artwork.artist_title || artwork.date_display || artwork.place_of_origin) && (
              <Animated.View style={[styles.divider, { opacity: textFadeAnimOrigin }]}>
                <Text style={styles.subtitle}>Origin</Text>
                {artwork.artist_title && (
                  <Text style={styles.headings}>Artist: <Text style={styles.value}> {artwork.artist_title} </Text></Text>
                )}
                {artwork.date_display && (
                  <Text style={styles.headings}>Date: <Text style={styles.value}> {artwork.date_display} </Text></Text>
                )}
                {artwork.place_of_origin && (
                  <Text style={styles.headings}>Place of origin: <Text style={styles.value}> {artwork.place_of_origin} </Text></Text>
                )}
              </Animated.View>
            )}

            {(artwork.dimensions || artwork.artwork_type_title || artwork.department_title || artwork.material_titles) && (
              <Animated.View style={[styles.divider, { opacity: textFadeAnimMaterials }]}>
                <Text style={styles.subtitle}>Materials</Text>
                {artwork.dimensions && (
                  <Text style={styles.headings}>Dimensions: <Text style={styles.value}> {artwork.dimensions} </Text></Text>
                )}
                {artwork.artwork_type_title && (
                  <Text style={styles.headings}>Type: <Text style={styles.value}> {artwork.artwork_type_title} </Text></Text>
                )}
                {artwork.department_title && (
                  <Text style={styles.headings}>Department: <Text style={styles.value}> {artwork.department_title} </Text></Text>
                )}
                {artwork.material_titles && artwork.material_titles.length > 0 ? (
                  <Text style={styles.headings}>Material: <Text style={styles.value}> {artwork.material_titles} </Text></Text>
                ) : null}
              </Animated.View>
            )}

            {(artwork.publication_history || artwork.exhibition_history) && (
              <Animated.View style={[styles.divider, { opacity: textFadeAnimHistory }]}>
                <Text style={styles.subtitle}>History</Text>
                {artwork.publication_history && (
                  <Text style={styles.headings}>Publication history: <Text style={styles.value}> {artwork.publication_history} </Text></Text>
                )}
                {artwork.exhibition_history && (
                  <Text style={styles.headings}>Exhibition history: <Text style={styles.value}> {artwork.exhibition_history} </Text></Text>
                )}
              </Animated.View>
            )}
          </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  title:{
    fontSize: 28,
    fontWeight: 'bold',
    maxWidth: '70%',
  },image: {
  width: '100%', 
  height: 350, 
  resizeMode: 'contain', 
  
},

  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#777',

  },
  description: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 20,
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
    marginVertical: 5,

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
    maxWidth: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  }
})

export default ArtworkDetail
import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Artwork, RootStackParams } from '../../types/index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ArtworkNavigationProp = NativeStackNavigationProp<RootStackParams, 'ArtworkDetail'>;

const ThumbnailArtwork: FC<Artwork> = ({ id, image_id, title, artist_display }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const textFadeAnim = useState(new Animated.Value(0))[0];

  const BASE_IMAGE_URL = `https://www.artic.edu/iiif/2/`;
  const DEFAULT_RES = `/full/843,/0/default.jpg`;

  const { navigate } = useNavigation<ArtworkNavigationProp>();

  const handleView = () => {
    navigate('ArtworkDetail', { id, title, artist_display, image_id });
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const handleImageError = () => {
    setIsLoading(false);
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeInTextStyle = {
    opacity: textFadeAnim,
  };

  return (
    <View style={styles.container} key={id}>
      {image_id && isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ccc" />
        </View>
      )}
      {image_id !== null && (
        <Animated.Image
          style={[styles.image, { opacity: fadeAnim }]}
          source={{ uri: `${BASE_IMAGE_URL}${image_id}${DEFAULT_RES}` }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      <Animated.View style={[styles.description, fadeInTextStyle]}>
        <View style={styles.detail}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{artist_display}</Text>
        </View>
        <TouchableOpacity onPress={handleView} style={styles.button}>
          <Text>See more</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fefefe',
    justifyContent: 'space-around',
    width: '90%',
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 10,
    elevation: 8,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  detail: {
    alignSelf: 'stretch',
    marginTop: 10,
    width: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#CCC',
    textAlign: 'left',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default ThumbnailArtwork;

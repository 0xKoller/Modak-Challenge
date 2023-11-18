import React from 'react'
import { View, Text } from 'react-native'
import useArtworkStorage from '../../hooks/useArtworkStorage';

const Saved = () => {
    const {getArtworkStorage} = useArtworkStorage();
    
    const getArtwork = async () => {
        try {
            const response = await getArtworkStorage();
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    getArtwork().catch(console.error);
    return (
        <View>
            <Text>Saved</Text>
        </View>
    )
}
export default Saved

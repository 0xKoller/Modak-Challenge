import AsyncStorage from '@react-native-async-storage/async-storage'

const ARTWORK_KEY = '@MyArtwork:key'

const useArtworkStorage = () => {

    const handleSetArtwork = async (artwork: string) => {
        try {
            const artworks = await AsyncStorage.getItem(ARTWORK_KEY)
                if (artworks !== null) {
                    const parsedArtworks = JSON.parse(artworks)
                    if(parsedArtworks.includes(artwork)) return Promise.reject("Artwork already saved.")
                    const newArtworks = [...parsedArtworks, artwork]
                    await AsyncStorage.setItem(ARTWORK_KEY, JSON.stringify(newArtworks))
                } else {
                    await AsyncStorage.setItem(ARTWORK_KEY, JSON.stringify([artwork]))
                }
                return Promise.resolve("Artwork saved succesfully.")
            } catch (e) {
                return Promise.reject(e)
            }
    }

    const handleGetArtwork = async () => {
            try {
                const artwork = await AsyncStorage.getItem(ARTWORK_KEY)
                if (artwork == null) {
                    return Promise.resolve("There is no artwork saved.")
                }
                console.log(artwork)
                return Promise.resolve(artwork)
            } catch (e) {
                return Promise.reject(e)
            }
    }
    
    const handleRemoveArtwork = async (id: String) => {
    try {
        const artwork = await AsyncStorage.getItem(ARTWORK_KEY);
        if (artwork == null || artwork.length < 1) {
            return Promise.resolve([]); 
        }
        const parsedArtwork = JSON.parse(artwork);
        const newArtworks = parsedArtwork.filter((artworks: String) => String(artworks) !== String(id));
        await AsyncStorage.setItem(ARTWORK_KEY, JSON.stringify(newArtworks));
        return Promise.resolve(newArtworks);
    } catch (e) {
        console.log('Error removing artwork:', e);
        return Promise.reject(e);
    }
}

    return {
        setArtworkStorage: handleSetArtwork,
        getArtworkStorage: handleGetArtwork,
        removeArtworkStorage: handleRemoveArtwork,
    }
}

export default useArtworkStorage
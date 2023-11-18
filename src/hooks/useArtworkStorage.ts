import AsyncStorage from '@react-native-async-storage/async-storage'

const ARTWORK_KEY = '@MyArtwork:key'

const useArtworkStorage = () => {

    const handleSetArtwork = async (artwork: string) => {
        try {
                console.log(artwork)    
            const artworks = await AsyncStorage.getItem(ARTWORK_KEY)
                if (artworks !== null) {
                    const parsedArtworks = JSON.parse(artworks)
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
                return Promise.resolve(artwork)
            } catch (e) {
                return Promise.reject(e)
            }
    }
    
    const handleRemoveArtwork = async (id: string) => {
        try {
                const artwork = await AsyncStorage.getItem(ARTWORK_KEY)
                if (artwork == null) {
                    return null
                }
                const parsedArtwork = JSON.parse(artwork)
                const newArtworks = parsedArtwork.filter((artwork: string) => artwork !== id)
                await AsyncStorage.setItem(ARTWORK_KEY, JSON.stringify(newArtworks))
                return Promise.resolve("Artwork removed succesfully.")
            } catch (e) {
                return Promise.reject(e)
            }
    }

    return {
        setArtworkStorage: handleSetArtwork,
        getArtworkStorage: handleGetArtwork,
        removeArtworkStorage: handleRemoveArtwork,
    }
}

export default useArtworkStorage
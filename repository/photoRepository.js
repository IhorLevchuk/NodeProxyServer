import axios from 'axios';
import config from '../config/config.js';

async function getMarsPhotos(apiKey, data) {
    const response = await axios.get(config.nasaPhotoUrl, {
        params: {
            api_key: apiKey,
            earth_date: data
        }
    });
    return response.data.photos;
}

export default getMarsPhotos;
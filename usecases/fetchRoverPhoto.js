import getMarsPhotos from "../repository/photoRepository.js";
import Exception from '../exception/Exception.js';

import config from '../config/config.js';

async function getLatestRoverPhoto(userApiKey) {
    const photos = await getMarsPhotos(userApiKey, config.lastDayOfPhotosFromMars);
    if (photos.length === 0) {
        throw new Exception(500, 'Incorrect server configuration')
    }
    return photos[photos.length - 1].img_src;
}

export default getLatestRoverPhoto;
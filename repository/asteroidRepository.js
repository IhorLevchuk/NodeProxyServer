import axios from 'axios';
import config from '../config/config.js';

async function fetchAsteroids(startDate, endDate) {
    const response = await axios.get(config.nasaAsteroidsUrl, {
        params: {
            start_date: startDate,
            end_date: endDate,
        }
    });
    return await response.data;
}

export default fetchAsteroids;


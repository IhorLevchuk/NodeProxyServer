
import dotenv from 'dotenv';

dotenv.config();

const config = {
    serverPort: process.env.SERVER_PORT || 4000,
    
    nasaAsteroidsBaseUrl: `${process.env.NASA_BASE_URL}/neo/rest/v1/feed?api_key=${process.env.NASA_API_KEY}`,
    startDate: process.env.START_DATE,
    endDate: process.env.END_DATE,
};

export default  config;

require('dotenv').config();

const config = {
    SERVER_PORT: process.env.SERVER_PORT || 4000,
    
    NASA_ASTEROIDS_BASE_URL: `${process.env.NASA_BASE_URL}/neo/rest/v1/feed`,
    NASA_API_KEY: process.env.NASA_API_KEY
};

module.exports = config;
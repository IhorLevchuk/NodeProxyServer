const fetch = require("node-fetch");
const config = require('../config/config');

async function fetchAsteroids(date) {
    const url = await buildUrl(date);
    const response = await fetch(url);
    return await response.json();
}

async function buildUrl(date) {
    const url = new URL(config.NASA_ASTEROIDS_BASE_URL);
    
    if(date) {
        url.searchParams.append("start_date", date);
        url.searchParams.append("end_date", date);
    }

    url.searchParams.append("api_key", config.NASA_API_KEY);
    
    return url.href;
}

module.exports = fetchAsteroids;


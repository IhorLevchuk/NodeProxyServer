import fetchAsteroids from '../repository/nasaRepository.js';
import {config} from "dotenv";

async function fetchAsteroid(date, showDangerous, showCount) {
    const {startDate, endDate} = getStartAndEndDates(date);
    
    const jsonBody = await fetchAsteroids(startDate, endDate);    
    return transformBody(jsonBody, showCount,showDangerous);
}

function transformBody(jsonBody, showCount, showDangerous) {
    const result = {};
    let wereDangerousMeteors = false;
    const asteroids = [];

    Object.values(jsonBody.near_earth_objects).flatMap(d => d)
        .forEach(asteroid => {
            if (!wereDangerousMeteors && asteroid.is_potentially_hazardous_asteroid) {
                wereDangerousMeteors = true;
            }
            asteroids.push({
                "id" : asteroid.id,
                "name" : asteroid.name,
                "diameter" : asteroid.estimated_diameter.meters,
                "is_potentially_hazardous_asteroid" : asteroid.is_potentially_hazardous_asteroid,
                "close_approach_date_full" : asteroid.close_approach_data[0].close_approach_date_full,
                "relative_velocity" : asteroid.close_approach_data[0].relative_velocity.kilometers_per_second
            });
        });
    
    if (showCount) {
        result.count = asteroids.length;
    }

    if (showDangerous) {
        result.wereDangerousMeteors = wereDangerousMeteors;
    }
    
    result.asteroids = asteroids;
    
    return result;
}

const getStartAndEndDates = (date) => {
    if (date) {
        return {startDate: date, endDate: date};
    }

    return {startDate: config.startDate, endDate: config.endDate};
}

export default fetchAsteroid;
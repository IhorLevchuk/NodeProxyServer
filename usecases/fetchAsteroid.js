const fetchAsteroids = require('../repository/nasaRepository');

async function fetchAsteroid(queryParam) {
    const { date, count, wereDangerousMeteors } = queryParam;
    const isDangerous = wereDangerousMeteors === 'true';
    const hasCount = count === 'true';
    
    const jsonBody = await fetchAsteroids(date);    
    return transformBody(jsonBody, hasCount,isDangerous);
}

function transformBody(jsonBody, countParam, wereDangerousMeteorsParam) {
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
    
    if (countParam) {
        result.count = asteroids.length;
    }

    if (wereDangerousMeteorsParam) {
        result.wereDangerousMeteors = wereDangerousMeteors;
    }
    
    result.asteroids = asteroids;
    
    return result;
}

module.exports = fetchAsteroid;

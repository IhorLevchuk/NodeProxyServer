import NasaAsteroidResponse from './nasa.asteroid.response'

export default interface NasaNearEarthObjectsResponse {
    [date: string]: NasaAsteroidResponse
}

import AsteroidResponse from './asteroid.response'

export default interface AsteroidsResponse {
    count?: number
    wereDangerousMeteors?: boolean
    asteroids: AsteroidResponse[]
}

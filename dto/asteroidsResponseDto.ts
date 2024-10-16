import AsteroidResponseDto from './asteroidResponseDto'

export default interface AsteroidsResponseDto {
    count?: number
    wereDangerousMeteors?: boolean
    asteroids: AsteroidResponseDto[]
}

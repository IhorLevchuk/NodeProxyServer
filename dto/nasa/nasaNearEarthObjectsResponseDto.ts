import NasaAsteroidResponseDto from './nasaAsteroidResponseDto'

export default interface NasaNearEarthObjectsResponseDto {
    [date: string]: NasaAsteroidResponseDto
}

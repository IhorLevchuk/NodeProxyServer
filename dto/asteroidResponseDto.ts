export default interface AsteroidResponseDto {
    id: string
    name: string
    diameter: number
    is_potentially_hazardous_asteroid: boolean
    close_approach_date_full: string
    relative_velocity: string
}

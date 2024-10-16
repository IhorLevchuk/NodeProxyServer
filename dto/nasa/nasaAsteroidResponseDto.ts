import NasaEstimatedDiameterDto from './nasaEstimatedDiameterDto'
import NasaCloseApproachDataDto from './nasaCloseApproachDataDto'

export default interface NasaAsteroidResponseDto {
    id: string
    name: string
    estimated_diameter: NasaEstimatedDiameterDto
    is_potentially_hazardous_asteroid: boolean
    close_approach_data: Array<NasaCloseApproachDataDto>
}

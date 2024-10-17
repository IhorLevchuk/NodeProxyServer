import NasaEstimatedDiameter from './nasa.estimated.diameter'
import NasaCloseApproachData from './nasa.close.approach.data'

export default interface NasaAsteroidResponse {
    id: string
    name: string
    estimated_diameter: NasaEstimatedDiameter
    is_potentially_hazardous_asteroid: boolean
    close_approach_data: Array<NasaCloseApproachData>
}

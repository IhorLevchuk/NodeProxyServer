import NasaRelativeVelocityDto from './nasaRelativeVelocityDto'

export default interface NasaCloseApproachDataDto {
  close_approach_date_full: string
  relative_velocity: NasaRelativeVelocityDto
}

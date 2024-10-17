import NasaRelativeVelocity from './nasa.relative.velocity'

export default interface NasaCloseApproachData {
  close_approach_date_full: string
  relative_velocity: NasaRelativeVelocity
}

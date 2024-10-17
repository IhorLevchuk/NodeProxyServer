import NasaNearEarthObjectsResponse from '../dto/nasa/nasa.near.earth.objects.response'

interface IAsteroidRepository {
    fetchAsteroids: (startDate: string, endDate: string) => Promise<NasaNearEarthObjectsResponse>
}

export { IAsteroidRepository }

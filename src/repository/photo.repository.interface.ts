import NasaPhotosResponse from '../dto/nasa/nasa.photos.response'

interface IPhotoRepository {
    fetchMarsPhotos: (apiKey: string, date: string) => Promise<NasaPhotosResponse>
}

export { IPhotoRepository }

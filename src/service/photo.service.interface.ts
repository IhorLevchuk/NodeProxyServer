import PhotoResponse from '../dto/photo.response'
import PhotoRequest from '../dto/photo.request'

interface IPhotoService {
    getLatestRoverPhoto: (request: PhotoRequest) => Promise<PhotoResponse>;
}

export { IPhotoService }

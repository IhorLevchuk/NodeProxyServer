import { Request, Response, NextFunction, Router } from 'express'

interface IPhotoController {
    router: Router
    getPhoto: (req: Request, res: Response, next: NextFunction) => void
    getPhotoForm: (req: Request, res: Response) => void
}

export { IPhotoController }

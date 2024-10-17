import { Request, Response, NextFunction, Router } from 'express'

interface IAsteroidApiController {
    router: Router
    getByParam: (req: Request, res: Response, next: NextFunction) => void
}

export { IAsteroidApiController }

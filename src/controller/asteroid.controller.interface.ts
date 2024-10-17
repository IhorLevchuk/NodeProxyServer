import { Request, Response, NextFunction, Router } from 'express'

interface IAsteroidController {
    router: Router
    getByParam: (req: Request, res: Response, next: NextFunction) => void
}

export { IAsteroidController }

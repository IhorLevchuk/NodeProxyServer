import { NextFunction, Request, Response } from 'express'

interface IErrorHandler {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

export { IErrorHandler }

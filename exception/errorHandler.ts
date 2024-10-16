import { Request, Response, NextFunction } from 'express'
import Exception from './Exception'

function errorHandler (err: Exception, req: Request, res: Response, next: NextFunction) {
  const body = {
    error: {
      message: err.message,
      details: err.details
    }
  }

  next(res.status(err.code || 501).json(body))
}

export default errorHandler

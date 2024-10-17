import { NextFunction, Request, Response } from 'express'
import Exception from './exception'
import { IErrorHandler } from './error.handler.interface'
import { injectable } from 'inversify'
import { StatusCodes } from 'http-status-codes'

@injectable()
class ErrorHandler implements IErrorHandler {
  catch (error: Error, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof Exception) {
      console.error(`[${error.code}]: ${error.message}`)

      const body = {
        error: {
          code: error.code,
          message: error.message,
          details: error.details
        }
      }

      next(res.status(error.code).json(body))
    } else {
      console.error(`[${StatusCodes.INTERNAL_SERVER_ERROR}]: ${error.message}`)

      next(res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Server Error'
      }))
    }
  }
}

export { ErrorHandler }

import { Request, Response, NextFunction } from 'express'

import { IMiddleware } from './middleware.interface'
import { ObjectSchema, ValidationErrorItem } from 'joi'
import Exception from './exception'

export class ValidateMiddleware implements IMiddleware {
  constructor (private readonly schema: ObjectSchema,
               private readonly source: 'body' | 'query' | 'params' | 'headers') {
    this.schema = schema
    this.source = source
  }

  execute (req: Request, res: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req[this.source], { abortEarly: false })

    if (error) {
      throw new Exception(
        400,
        'Validation Error',
        error.details.map((detail: ValidationErrorItem) => ({
          field: detail.context ? detail.context.label : null,
          message: detail.message
        }))
      )
    }

    return next()
  }
}

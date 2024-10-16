import Exception from '../exception/Exception'
import { Request, Response, NextFunction } from 'express'
import { ObjectSchema, ValidationErrorItem, ValidationResult } from 'joi'
import { RequestHandler } from 'express-serve-static-core'

interface ValidatedBody {
  (a: Request): unknown;
}

export function validateBody (schema: ObjectSchema): RequestHandler {
  return validate(schema, req => req.body)
}

export function validateQuery (schema: ObjectSchema): RequestHandler {
  return validate(schema, req => req.query)
}

function validate (schema: ObjectSchema, getData: ValidatedBody): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result: ValidationResult = schema.validate(getData(req), { abortEarly: false })

    if (result.error) {
      throw new Exception(
        400,
        'Validation Error',
        result.error.details.map((detail: ValidationErrorItem) => ({
          field: detail.context ? detail.context.label : null,
          message: detail.message
        }))
      )
    }

    next()
  }
}

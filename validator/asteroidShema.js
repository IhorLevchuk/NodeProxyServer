import Joi from 'joi';
import JoiDate from '@joi/date';

export const asteroidQuerySchema = Joi.object({
    date: Joi.extend(JoiDate).date().format('YYYY-MM-DD').optional().messages({
        'date.format': 'date must be in the YYYY-MM-DD format'
    }),
    count: Joi.boolean().optional().messages({
        'boolean.base': 'count must be a boolean'
    }),
    wereDangerousMeteors: Joi.boolean().optional().messages({
        'boolean.base': 'wereDangerousMeteors must be a boolean'
    })
});
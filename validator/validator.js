
export function validateBody(schema) {
    return validate(schema, req => req.body);
}

export function validateQuery(schema) {
    return validate(schema, req => req.query);
}

function validate(schema, getData) {
    return (req, res, next) => {
        
        const { error } = schema.validate(getData(req), { abortEarly: false });
        
        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }
       
        next();
    };
}
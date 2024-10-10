function errorHandler(err, req, res, next) {
    res.status(err.code || 500).json({ error: err.massage });
}

export default errorHandler;
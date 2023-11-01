// Not found middleware, needs to be before the errorHandler middleware
// so it can forward
// This is hit if a request doesnt match any route we mounted
function notFound(req, res, next) {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    // Forward the error to the errorHandler middleware
    next(error);
}

// Generic errorHandler middleware
// It has 4 args so it is recognised as an error handler
function errorHandler(err, req, res, next) {
    // If the status code hasn't been set it defaults to 200
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    let { message } = err;
    console.log(err);
    if (
        err.message.includes('duplicate key value violates unique constraint')
    ) {
        message = 'The entityy that you are trying to create already exists';
        res.status(409);
    }

    // We want to show the stack only in development
    res.json({
        status: res.statusCode,
        message,
        stack: process.env.NODE_ENV === 'production' ? 'nope' : err.stack,
        errors: err.errors || undefined
    });
}

//
module.exports = {
    notFound,
    errorHandler
};

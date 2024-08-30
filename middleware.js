const { validate } = require('jsonschema');
const bookSchema = require('./bookSchema.json'); 
const ExpressError = require('./expressError'); 

function validateBook(req, res, next) {
    const validationResult = validate(req.body, bookSchema);  // Corrected typo

    if (!validationResult.valid) {
        const errors = validationResult.errors.map(err => err.stack);
        return next(new ExpressError(errors, 400));
    }
    return next(); 
}

module.exports = { validateBook }

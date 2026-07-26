const Ajv = require('ajv');

// Initialize AJV instance
const ajv = new Ajv({ allErrors: true });

/**
 * Technical Name: Schema Validation Helper Function
 * What it does: Compares a JSON response body against a JSON schema contract.
 * Throws a descriptive error if validation fails.
 * 
 * @param {object} schema - The JSON Schema object (Draft-07 compliant)
 * @param {object} data - The API response payload body to validate
 * @returns {boolean} true if validation succeeds
 */
function validateSchema(schema, data) {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        const errorDetails = JSON.stringify(validate.errors, null, 2);
        throw new Error(`❌ JSON Schema Validation Failed:\n${errorDetails}`);
    }

    return true;
}

module.exports = validateSchema;
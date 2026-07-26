/**
 * Technical Name: User JSON Schema Contract
 * What it does: Defines required keys and data types for a User response object
 */
const userSchema = {
    type: 'object',
    required: ['id', 'name', 'username', 'email'],
    properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        website: { type: 'string' },
        address: { type: 'object' },
        company: { type: 'object' }
    },
    additionalProperties: true
};

module.exports = userSchema;
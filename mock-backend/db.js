const validator = new (require('jsonschema').Validator)()
const jsf = require('json-schema-faker')

const cognitoAuthToken = require('./schemas/cognito-auth-token.schema.json')
const uuidSchema = require('./schemas/uuid.schema')

validator.addSchema(uuidSchema, '/uuidSchema')

function ValidationError (message, err, index) {
  this.message = message
  this.originalStack = err.stack
  this.index = index
  this.atIndex = (this.index || this.index === 0) ? ` at index ${this.index}` : ''
  this.stack = this.toString()
}
ValidationError.prototype.toString = function () {
  return `${this.message}${this.atIndex}: ${this.originalStack}`
}
/*
TODO Implement this method when an array response is required
function validateArray (array, schema, message) {
  array.forEach((item, index) => {
    try {
      validator.validate(item, schema, { throwError: true })
    } catch (err) {
      throw new ValidationError(message, err, index)
    }
  })
}
*/

const auth = jsf(cognitoAuthToken, [ uuidSchema ])
validator.validate(auth, cognitoAuthToken, { throwError: true })
module.exports = {
  auth
}

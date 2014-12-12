### ###
# handleHttpErrors - middleware for handling HttpErrors
handleHttpErrors = (err, req, res, next) ->
  return next() unless err?
  return next(err) unless err instanceof HttpError
  res.status(err.httpStatus).json err.json

exports.handleHttpErrors = handleHttpErrors


### ###
# HttpError - errors with http status
class HttpError

  constructor: (@httpStatus, @json) ->
    throw new Error('You must specify http status code') unless @httpStatus?

exports.HttpError = HttpError


### ###
# SError - universal error's with wrapping
class SError extends Error

  name: 'SError'

  constructor: (@message, cause, @json) ->
    super

    #Error.captureStackTrace this or @constructor
    @cause cause if cause

    return

  toString: () ->
    str = (@hasOwnProperty('name') and @name or @constructor.name or @constructor::name)
    str += " - #{@message}" if @message
    str += " :: #{JSON.stringify(@json)}" if @json
    str += " => Caused by: #{@se_cause.toString()}" if @se_cause and @se_cause.message
    str

  cause: (err) ->
    @se_cause = err if err instanceof Error
    @se_cause

exports.SError = SError

### ###
# DbError - generic database error's
class DbError extends SError

  name: 'DbError'

exports.DbError = DbError

### ###
# UnauthorizedError - generic unauthorized error's
class UnauthorizedError extends SError

  name: 'UnauthorizedError'

exports.UnauthorizedError = UnauthorizedError

### ###
# PrivilagesError - generic privilages/access error's
class PrivilagesError extends SError

  name: 'PrivilagesError'

exports.PrivilagesError = PrivilagesError

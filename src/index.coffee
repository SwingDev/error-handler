### ###
# handleHttpErrors - middleware for handling HttpErrors
handleHttpErrors = (err, req, res, next) ->
  return next() unless err?
  return next(err) unless err instanceof HttpError
  res.status(err.httpStatus).json err.json


### ###
# HttpError - errors with http status
class HttpError

  constructor: (@httpStatus, @json) ->
    throw new Error('You must specify http status code') unless @httpStatus?


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


### ###
# DbError - generic database error's
class DbError extends SError

  name: 'DbError'

  toStringPublic: () ->
    @message


### ###
# UnauthorizedError - generic unauthorized error's
class UnauthorizedError extends SError

  name: 'UnauthorizedError'

  toStringPublic: () ->
    @message


### ###
# PrivilagesError - generic privilages/access error's
class PrivilagesError extends SError

  name: 'PrivilagesError'

  toStringPublic: () ->
    @message


### ###
# NotFoundError - generic not found/no reousece error's
class NotFoundError extends SError

  name: 'NotFoundError'

  toStringPublic: () ->
    @message


### ###
# EXPORTS
exports.NotFoundError = NotFoundError
exports.PrivilagesError = PrivilagesError
exports.UnauthorizedError = UnauthorizedError
exports.DbError = DbError
exports.SError = SError

exports.HttpError = HttpError
exports.handleHttpErrors = handleHttpErrors

### ###
# Class SError based on https://github.com/davepacheco/node-verror by David Pacheco
### ###

mod_extsprintf = require('extsprintf')


### ###
# ErrorHandler - error handler with logger
class ErrorHandler

  constructor: (@logger) ->
    return

  handleErrors: (err, req, res, next) ->
    switch err.name
      when 'SError'
        @logger.error(err)
        #log, res
      when 'DbError'
        @logger.error(err)
        #log, res
      when 'RedisError'
        @logger.error(err)
        #log, res
      when 'RedisConnError'
        @logger.error(err)
        #log, res
      when 'UnauthorizedError'
        @logger.info('Invalid token')
        res.status(401).json non_field_errors: 'Invalid token'
      else
        @logger.error('Unhandled error')
        throw new SError(err, 'Unhandled error')

exports.ErrorHandler = ErrorHandler


### ###
# SError - universal error's
class SError extends Error

  name: () ->
    'SError'

  constructor: (options) ->
    super
    #Error.call this

    args = cause = ctor = undefined
    
    if typeof(options) is 'object'
      args = Array::slice.call(arguments, 1)
    else
      args = Array::slice.call(arguments, 0)
      options = undefined

    if args.length > 0
      @message = mod_extsprintf.sprintf.apply(null, args)
    else
      @message = ''

    if options
      if options instanceof Error
        cause = options
      else
        cause = options.cause
        ctor = options.constructorOpt

    Error.captureStackTrace this, ctor or @constructor
    @cause cause if cause

    return
  
  toString: () ->
    str = (@hasOwnProperty('name') and @name or @constructor.name or @constructor::name)
    str += ': ' + @message if @message
    str += ';caused by ' + @se_cause.toString() if @se_cause and @se_cause.message
    str

  cause: (err) ->
    @se_cause = err if err instanceof Error
    @se_cause

exports.SError = SError


### ###
# DbError - universal database error's
class DbError extends SError

  name: () ->
    'DbError'

exports.DbError = DbError


### ###
# RedisError - universal Redis error's
class RedisError extends SError

  name: () ->
    'RedisError'

exports.RedisError = RedisError


### ###
# RedisConnError - Redis connection error's
class RedisConnError extends SError

  name: () ->
    'RedisConnError'

exports.RedisConnError = RedisConnError



/* */

/* */
var DbError, ErrorHandler, RedisConnError, RedisError, SError, mod_extsprintf,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

mod_extsprintf = require('extsprintf');


/* */

ErrorHandler = (function() {
  function ErrorHandler(logger) {
    this.logger = logger;
    return;
  }

  ErrorHandler.prototype.handleErrors = function(err, req, res, next) {
    switch (err.name) {
      case 'SError':
        return this.logger.error(err);
      case 'DbError':
        return this.logger.error(err);
      case 'RedisError':
        return this.logger.error(err);
      case 'RedisConnError':
        return this.logger.error(err);
      case 'UnauthorizedError':
        this.logger.info('Invalid token');
        return res.status(401).json({
          non_field_errors: 'Invalid token'
        });
      default:
        this.logger.error('Unhandled error');
        throw new SError(err, 'Unhandled error');
    }
  };

  return ErrorHandler;

})();

exports.ErrorHandler = ErrorHandler;


/* */

SError = (function(_super) {
  __extends(SError, _super);

  SError.prototype.name = function() {
    return 'SError';
  };

  function SError(options) {
    var args, cause, ctor;
    SError.__super__.constructor.apply(this, arguments);
    args = cause = ctor = void 0;
    if (typeof options === 'object') {
      args = Array.prototype.slice.call(arguments, 1);
    } else {
      args = Array.prototype.slice.call(arguments, 0);
      options = void 0;
    }
    if (args.length > 0) {
      this.message = mod_extsprintf.sprintf.apply(null, args);
    } else {
      this.message = '';
    }
    if (options) {
      if (options instanceof Error) {
        cause = options;
      } else {
        cause = options.cause;
        ctor = options.constructorOpt;
      }
    }
    Error.captureStackTrace(this, ctor || this.constructor);
    if (cause) {
      this.cause(cause);
    }
    return;
  }

  SError.prototype.toString = function() {
    var str;
    str = this.hasOwnProperty('name') && this.name || this.constructor.name || this.constructor.prototype.name;
    if (this.message) {
      str += ': ' + this.message;
    }
    if (this.se_cause && this.se_cause.message) {
      str += ';caused by ' + this.se_cause.toString();
    }
    return str;
  };

  SError.prototype.cause = function(err) {
    if (err instanceof Error) {
      this.se_cause = err;
    }
    return this.se_cause;
  };

  return SError;

})(Error);

exports.SError = SError;


/* */

DbError = (function(_super) {
  __extends(DbError, _super);

  function DbError() {
    return DbError.__super__.constructor.apply(this, arguments);
  }

  DbError.prototype.name = function() {
    return 'DbError';
  };

  return DbError;

})(SError);

exports.DbError = DbError;


/* */

RedisError = (function(_super) {
  __extends(RedisError, _super);

  function RedisError() {
    return RedisError.__super__.constructor.apply(this, arguments);
  }

  RedisError.prototype.name = function() {
    return 'RedisError';
  };

  return RedisError;

})(SError);

exports.RedisError = RedisError;


/* */

RedisConnError = (function(_super) {
  __extends(RedisConnError, _super);

  function RedisConnError() {
    return RedisConnError.__super__.constructor.apply(this, arguments);
  }

  RedisConnError.prototype.name = function() {
    return 'RedisConnError';
  };

  return RedisConnError;

})(SError);

exports.RedisConnError = RedisConnError;

//# sourceMappingURL=data:application/json;base64,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O0FBMkZFLDRCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxvQkFBQSxJQUFBLEdBQU0sU0FBQSxHQUFBO1dBQ0osVUFESTtFQUFBLENBQU4sQ0FBQTs7aUJBQUE7O0dBRm9CLE9BekZ0QixDQUFBOztBQUFBLE9BOEZPLENBQUMsT0FBUixHQUFrQixPQTlGbEIsQ0FBQTs7QUFpR0E7QUFBQSxLQWpHQTs7QUFBQTtBQXFHRSwrQkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsdUJBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtXQUNKLGFBREk7RUFBQSxDQUFOLENBQUE7O29CQUFBOztHQUZ1QixPQW5HekIsQ0FBQTs7QUFBQSxPQXdHTyxDQUFDLFVBQVIsR0FBcUIsVUF4R3JCLENBQUE7O0FBMkdBO0FBQUEsS0EzR0E7O0FBQUE7QUErR0UsbUNBQUEsQ0FBQTs7OztHQUFBOztBQUFBLDJCQUFBLElBQUEsR0FBTSxTQUFBLEdBQUE7V0FDSixpQkFESTtFQUFBLENBQU4sQ0FBQTs7d0JBQUE7O0dBRjJCLE9BN0c3QixDQUFBOztBQUFBLE9Ba0hPLENBQUMsY0FBUixHQUF5QixjQWxIekIsQ0FBQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIiMjIyAjIyNcbiMgQ2xhc3MgU0Vycm9yIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZlcGFjaGVjby9ub2RlLXZlcnJvciBieSBEYXZpZCBQYWNoZWNvXG4jIyMgIyMjXG5cbm1vZF9leHRzcHJpbnRmID0gcmVxdWlyZSgnZXh0c3ByaW50ZicpXG5cblxuIyMjICMjI1xuIyBFcnJvckhhbmRsZXIgLSBlcnJvciBoYW5kbGVyIHdpdGggbG9nZ2VyXG5jbGFzcyBFcnJvckhhbmRsZXJcblxuICBjb25zdHJ1Y3RvcjogKEBsb2dnZXIpIC0+XG4gICAgcmV0dXJuXG5cbiAgaGFuZGxlRXJyb3JzOiAoZXJyLCByZXEsIHJlcywgbmV4dCkgLT5cbiAgICBzd2l0Y2ggZXJyLm5hbWVcbiAgICAgIHdoZW4gJ1NFcnJvcidcbiAgICAgICAgQGxvZ2dlci5lcnJvcihlcnIpXG4gICAgICAgICNsb2csIHJlc1xuICAgICAgd2hlbiAnRGJFcnJvcidcbiAgICAgICAgQGxvZ2dlci5lcnJvcihlcnIpXG4gICAgICAgICNsb2csIHJlc1xuICAgICAgd2hlbiAnUmVkaXNFcnJvcidcbiAgICAgICAgQGxvZ2dlci5lcnJvcihlcnIpXG4gICAgICAgICNsb2csIHJlc1xuICAgICAgd2hlbiAnUmVkaXNDb25uRXJyb3InXG4gICAgICAgIEBsb2dnZXIuZXJyb3IoZXJyKVxuICAgICAgICAjbG9nLCByZXNcbiAgICAgIHdoZW4gJ1VuYXV0aG9yaXplZEVycm9yJ1xuICAgICAgICBAbG9nZ2VyLmluZm8oJ0ludmFsaWQgdG9rZW4nKVxuICAgICAgICByZXMuc3RhdHVzKDQwMSkuanNvbiBub25fZmllbGRfZXJyb3JzOiAnSW52YWxpZCB0b2tlbidcbiAgICAgIGVsc2VcbiAgICAgICAgQGxvZ2dlci5lcnJvcignVW5oYW5kbGVkIGVycm9yJylcbiAgICAgICAgdGhyb3cgbmV3IFNFcnJvcihlcnIsICdVbmhhbmRsZWQgZXJyb3InKVxuXG5leHBvcnRzLkVycm9ySGFuZGxlciA9IEVycm9ySGFuZGxlclxuXG5cbiMjIyAjIyNcbiMgU0Vycm9yIC0gdW5pdmVyc2FsIGVycm9yJ3NcbmNsYXNzIFNFcnJvciBleHRlbmRzIEVycm9yXG5cbiAgbmFtZTogKCkgLT5cbiAgICAnU0Vycm9yJ1xuXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cbiAgICBzdXBlclxuICAgICNFcnJvci5jYWxsIHRoaXNcblxuICAgIGFyZ3MgPSBjYXVzZSA9IGN0b3IgPSB1bmRlZmluZWRcbiAgICBcbiAgICBpZiB0eXBlb2Yob3B0aW9ucykgaXMgJ29iamVjdCdcbiAgICAgIGFyZ3MgPSBBcnJheTo6c2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgZWxzZVxuICAgICAgYXJncyA9IEFycmF5OjpzbGljZS5jYWxsKGFyZ3VtZW50cywgMClcbiAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWRcblxuICAgIGlmIGFyZ3MubGVuZ3RoID4gMFxuICAgICAgQG1lc3NhZ2UgPSBtb2RfZXh0c3ByaW50Zi5zcHJpbnRmLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgZWxzZVxuICAgICAgQG1lc3NhZ2UgPSAnJ1xuXG4gICAgaWYgb3B0aW9uc1xuICAgICAgaWYgb3B0aW9ucyBpbnN0YW5jZW9mIEVycm9yXG4gICAgICAgIGNhdXNlID0gb3B0aW9uc1xuICAgICAgZWxzZVxuICAgICAgICBjYXVzZSA9IG9wdGlvbnMuY2F1c2VcbiAgICAgICAgY3RvciA9IG9wdGlvbnMuY29uc3RydWN0b3JPcHRcblxuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlIHRoaXMsIGN0b3Igb3IgQGNvbnN0cnVjdG9yXG4gICAgQGNhdXNlIGNhdXNlIGlmIGNhdXNlXG5cbiAgICByZXR1cm5cbiAgXG4gIHRvU3RyaW5nOiAoKSAtPlxuICAgIHN0ciA9IChAaGFzT3duUHJvcGVydHkoJ25hbWUnKSBhbmQgQG5hbWUgb3IgQGNvbnN0cnVjdG9yLm5hbWUgb3IgQGNvbnN0cnVjdG9yOjpuYW1lKVxuICAgIHN0ciArPSAnOiAnICsgQG1lc3NhZ2UgaWYgQG1lc3NhZ2VcbiAgICBzdHIgKz0gJztjYXVzZWQgYnkgJyArIEBzZV9jYXVzZS50b1N0cmluZygpIGlmIEBzZV9jYXVzZSBhbmQgQHNlX2NhdXNlLm1lc3NhZ2VcbiAgICBzdHJcblxuICBjYXVzZTogKGVycikgLT5cbiAgICBAc2VfY2F1c2UgPSBlcnIgaWYgZXJyIGluc3RhbmNlb2YgRXJyb3JcbiAgICBAc2VfY2F1c2VcblxuZXhwb3J0cy5TRXJyb3IgPSBTRXJyb3JcblxuXG4jIyMgIyMjXG4jIERiRXJyb3IgLSB1bml2ZXJzYWwgZGF0YWJhc2UgZXJyb3Inc1xuY2xhc3MgRGJFcnJvciBleHRlbmRzIFNFcnJvclxuXG4gIG5hbWU6ICgpIC0+XG4gICAgJ0RiRXJyb3InXG5cbmV4cG9ydHMuRGJFcnJvciA9IERiRXJyb3JcblxuXG4jIyMgIyMjXG4jIFJlZGlzRXJyb3IgLSB1bml2ZXJzYWwgUmVkaXMgZXJyb3Inc1xuY2xhc3MgUmVkaXNFcnJvciBleHRlbmRzIFNFcnJvclxuXG4gIG5hbWU6ICgpIC0+XG4gICAgJ1JlZGlzRXJyb3InXG5cbmV4cG9ydHMuUmVkaXNFcnJvciA9IFJlZGlzRXJyb3JcblxuXG4jIyMgIyMjXG4jIFJlZGlzQ29ubkVycm9yIC0gUmVkaXMgY29ubmVjdGlvbiBlcnJvcidzXG5jbGFzcyBSZWRpc0Nvbm5FcnJvciBleHRlbmRzIFNFcnJvclxuXG4gIG5hbWU6ICgpIC0+XG4gICAgJ1JlZGlzQ29ubkVycm9yJ1xuXG5leHBvcnRzLlJlZGlzQ29ubkVycm9yID0gUmVkaXNDb25uRXJyb3JcblxuIl19
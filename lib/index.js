
/* */
var DbError, HttpError, NotFoundError, PrivilagesError, SError, UnauthorizedError, handleHttpErrors,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

handleHttpErrors = function(err, req, res, next) {
  if (err == null) {
    return next();
  }
  if (!(err instanceof HttpError)) {
    return next(err);
  }
  return res.status(err.httpStatus).json(err.json);
};


/* */

HttpError = (function() {
  function HttpError(httpStatus, json) {
    this.httpStatus = httpStatus;
    this.json = json;
    if (this.httpStatus == null) {
      throw new Error('You must specify http status code');
    }
  }

  return HttpError;

})();


/* */

SError = (function(_super) {
  __extends(SError, _super);

  SError.prototype.name = 'SError';

  function SError(message, cause, json) {
    this.message = message;
    this.json = json;
    SError.__super__.constructor.apply(this, arguments);
    Error.captureStackTrace(this || this.constructor);
    if (cause) {
      this.cause(cause);
    }
    return;
  }

  SError.prototype.toDebug = function() {
    var str;
    str = this.hasOwnProperty('name') && this.name || this.constructor.name || this.constructor.prototype.name;
    if (this.message) {
      str += " - " + this.message;
    }
    if (this.json) {
      str += " :: " + (JSON.stringify(this.json));
    }
    if (this.se_cause && this.se_cause.message) {
      str += " => Caused by: " + (this.se_cause.toDebug());
    }
    return str;
  };

  SError.prototype.toString = function() {
    return this.message;
  };

  SError.prototype.toJSON = function() {
    return this.message;
  };

  SError.prototype.cause = function(err) {
    if (err instanceof Error) {
      this.se_cause = err;
    }
    return this.se_cause;
  };

  return SError;

})(Error);


/* */

DbError = (function(_super) {
  __extends(DbError, _super);

  function DbError() {
    return DbError.__super__.constructor.apply(this, arguments);
  }

  DbError.prototype.name = 'DbError';

  return DbError;

})(SError);


/* */

UnauthorizedError = (function(_super) {
  __extends(UnauthorizedError, _super);

  function UnauthorizedError() {
    return UnauthorizedError.__super__.constructor.apply(this, arguments);
  }

  UnauthorizedError.prototype.name = 'UnauthorizedError';

  return UnauthorizedError;

})(SError);


/* */

PrivilagesError = (function(_super) {
  __extends(PrivilagesError, _super);

  function PrivilagesError() {
    return PrivilagesError.__super__.constructor.apply(this, arguments);
  }

  PrivilagesError.prototype.name = 'PrivilagesError';

  return PrivilagesError;

})(SError);


/* */

NotFoundError = (function(_super) {
  __extends(NotFoundError, _super);

  function NotFoundError() {
    return NotFoundError.__super__.constructor.apply(this, arguments);
  }

  NotFoundError.prototype.name = 'NotFoundError';

  return NotFoundError;

})(SError);


/* */

exports.NotFoundError = NotFoundError;

exports.PrivilagesError = PrivilagesError;

exports.UnauthorizedError = UnauthorizedError;

exports.DbError = DbError;

exports.SError = SError;

exports.HttpError = HttpError;

exports.handleHttpErrors = handleHttpErrors;

//# sourceMappingURL=data:application/json;base64,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b3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiIyMjICMjI1xuIyBoYW5kbGVIdHRwRXJyb3JzIC0gbWlkZGxld2FyZSBmb3IgaGFuZGxpbmcgSHR0cEVycm9yc1xuaGFuZGxlSHR0cEVycm9ycyA9IChlcnIsIHJlcSwgcmVzLCBuZXh0KSAtPlxuICByZXR1cm4gbmV4dCgpIHVubGVzcyBlcnI/XG4gIHJldHVybiBuZXh0KGVycikgdW5sZXNzIGVyciBpbnN0YW5jZW9mIEh0dHBFcnJvclxuICByZXMuc3RhdHVzKGVyci5odHRwU3RhdHVzKS5qc29uIGVyci5qc29uXG5cblxuIyMjICMjI1xuIyBIdHRwRXJyb3IgLSBlcnJvcnMgd2l0aCBodHRwIHN0YXR1c1xuY2xhc3MgSHR0cEVycm9yXG5cbiAgY29uc3RydWN0b3I6IChAaHR0cFN0YXR1cywgQGpzb24pIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGh0dHAgc3RhdHVzIGNvZGUnKSB1bmxlc3MgQGh0dHBTdGF0dXM/XG5cblxuIyMjICMjI1xuIyBTRXJyb3IgLSB1bml2ZXJzYWwgZXJyb3IncyB3aXRoIHdyYXBwaW5nXG5jbGFzcyBTRXJyb3IgZXh0ZW5kcyBFcnJvclxuXG4gIG5hbWU6ICdTRXJyb3InXG5cbiAgY29uc3RydWN0b3I6IChAbWVzc2FnZSwgY2F1c2UsIEBqc29uKSAtPlxuICAgIHN1cGVyXG5cbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSB0aGlzIG9yIEBjb25zdHJ1Y3RvclxuICAgIEBjYXVzZSBjYXVzZSBpZiBjYXVzZVxuXG4gICAgcmV0dXJuXG5cbiAgdG9EZWJ1ZzogKCkgLT5cbiAgICBzdHIgPSAoQGhhc093blByb3BlcnR5KCduYW1lJykgYW5kIEBuYW1lIG9yIEBjb25zdHJ1Y3Rvci5uYW1lIG9yIEBjb25zdHJ1Y3Rvcjo6bmFtZSlcbiAgICBzdHIgKz0gXCIgLSAje0BtZXNzYWdlfVwiIGlmIEBtZXNzYWdlXG4gICAgc3RyICs9IFwiIDo6ICN7SlNPTi5zdHJpbmdpZnkoQGpzb24pfVwiIGlmIEBqc29uXG4gICAgc3RyICs9IFwiID0+IENhdXNlZCBieTogI3tAc2VfY2F1c2UudG9EZWJ1ZygpfVwiIGlmIEBzZV9jYXVzZSBhbmQgQHNlX2NhdXNlLm1lc3NhZ2VcbiAgICBzdHJcblxuICB0b1N0cmluZzogKCkgLT5cbiAgICBAbWVzc2FnZVxuXG4gIHRvSlNPTjogKCkgLT5cbiAgICBAbWVzc2FnZVxuXG4gIGNhdXNlOiAoZXJyKSAtPlxuICAgIEBzZV9jYXVzZSA9IGVyciBpZiBlcnIgaW5zdGFuY2VvZiBFcnJvclxuICAgIEBzZV9jYXVzZVxuXG5cbiMjIyAjIyNcbiMgRGJFcnJvciAtIGdlbmVyaWMgZGF0YWJhc2UgZXJyb3Inc1xuY2xhc3MgRGJFcnJvciBleHRlbmRzIFNFcnJvclxuXG4gIG5hbWU6ICdEYkVycm9yJ1xuXG5cbiMjIyAjIyNcbiMgVW5hdXRob3JpemVkRXJyb3IgLSBnZW5lcmljIHVuYXV0aG9yaXplZCBlcnJvcidzXG5jbGFzcyBVbmF1dGhvcml6ZWRFcnJvciBleHRlbmRzIFNFcnJvclxuXG4gIG5hbWU6ICdVbmF1dGhvcml6ZWRFcnJvcidcblxuXG4jIyMgIyMjXG4jIFByaXZpbGFnZXNFcnJvciAtIGdlbmVyaWMgcHJpdmlsYWdlcy9hY2Nlc3MgZXJyb3Inc1xuY2xhc3MgUHJpdmlsYWdlc0Vycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ1ByaXZpbGFnZXNFcnJvcidcblxuXG4jIyMgIyMjXG4jIE5vdEZvdW5kRXJyb3IgLSBnZW5lcmljIG5vdCBmb3VuZC9ubyByZW91c2VjZSBlcnJvcidzXG5jbGFzcyBOb3RGb3VuZEVycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ05vdEZvdW5kRXJyb3InXG5cblxuIyMjICMjI1xuIyBFWFBPUlRTXG5leHBvcnRzLk5vdEZvdW5kRXJyb3IgPSBOb3RGb3VuZEVycm9yXG5leHBvcnRzLlByaXZpbGFnZXNFcnJvciA9IFByaXZpbGFnZXNFcnJvclxuZXhwb3J0cy5VbmF1dGhvcml6ZWRFcnJvciA9IFVuYXV0aG9yaXplZEVycm9yXG5leHBvcnRzLkRiRXJyb3IgPSBEYkVycm9yXG5leHBvcnRzLlNFcnJvciA9IFNFcnJvclxuXG5leHBvcnRzLkh0dHBFcnJvciA9IEh0dHBFcnJvclxuZXhwb3J0cy5oYW5kbGVIdHRwRXJyb3JzID0gaGFuZGxlSHR0cEVycm9yc1xuIl19

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
    if (cause) {
      this.cause(cause);
    }
    return;
  }

  SError.prototype.toString = function() {
    var str;
    str = this.hasOwnProperty('name') && this.name || this.constructor.name || this.constructor.prototype.name;
    if (this.message) {
      str += " - " + this.message;
    }
    if (this.json) {
      str += " :: " + (JSON.stringify(this.json));
    }
    if (this.se_cause && this.se_cause.message) {
      str += " => Caused by: " + (this.se_cause.toString());
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


/* */

DbError = (function(_super) {
  __extends(DbError, _super);

  function DbError() {
    return DbError.__super__.constructor.apply(this, arguments);
  }

  DbError.prototype.name = 'DbError';

  DbError.prototype.toStringPublic = function() {
    return this.message;
  };

  return DbError;

})(SError);


/* */

UnauthorizedError = (function(_super) {
  __extends(UnauthorizedError, _super);

  function UnauthorizedError() {
    return UnauthorizedError.__super__.constructor.apply(this, arguments);
  }

  UnauthorizedError.prototype.name = 'UnauthorizedError';

  UnauthorizedError.prototype.toStringPublic = function() {
    return this.message;
  };

  return UnauthorizedError;

})(SError);


/* */

PrivilagesError = (function(_super) {
  __extends(PrivilagesError, _super);

  function PrivilagesError() {
    return PrivilagesError.__super__.constructor.apply(this, arguments);
  }

  PrivilagesError.prototype.name = 'PrivilagesError';

  PrivilagesError.prototype.toStringPublic = function() {
    return this.message;
  };

  return PrivilagesError;

})(SError);


/* */

NotFoundError = (function(_super) {
  __extends(NotFoundError, _super);

  function NotFoundError() {
    return NotFoundError.__super__.constructor.apply(this, arguments);
  }

  NotFoundError.prototype.name = 'NotFoundError';

  NotFoundError.prototype.toStringPublic = function() {
    return this.message;
  };

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

//# sourceMappingURL=data:application/json;base64,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QTJGTyxDQUFDLGdCQUFSLEdBQTJCLGdCQTNGM0IsQ0FBQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIiMjIyAjIyNcbiMgaGFuZGxlSHR0cEVycm9ycyAtIG1pZGRsZXdhcmUgZm9yIGhhbmRsaW5nIEh0dHBFcnJvcnNcbmhhbmRsZUh0dHBFcnJvcnMgPSAoZXJyLCByZXEsIHJlcywgbmV4dCkgLT5cbiAgcmV0dXJuIG5leHQoKSB1bmxlc3MgZXJyP1xuICByZXR1cm4gbmV4dChlcnIpIHVubGVzcyBlcnIgaW5zdGFuY2VvZiBIdHRwRXJyb3JcbiAgcmVzLnN0YXR1cyhlcnIuaHR0cFN0YXR1cykuanNvbiBlcnIuanNvblxuXG5cbiMjIyAjIyNcbiMgSHR0cEVycm9yIC0gZXJyb3JzIHdpdGggaHR0cCBzdGF0dXNcbmNsYXNzIEh0dHBFcnJvclxuXG4gIGNvbnN0cnVjdG9yOiAoQGh0dHBTdGF0dXMsIEBqc29uKSAtPlxuICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBodHRwIHN0YXR1cyBjb2RlJykgdW5sZXNzIEBodHRwU3RhdHVzP1xuXG5cbiMjIyAjIyNcbiMgU0Vycm9yIC0gdW5pdmVyc2FsIGVycm9yJ3Mgd2l0aCB3cmFwcGluZ1xuY2xhc3MgU0Vycm9yIGV4dGVuZHMgRXJyb3JcblxuICBuYW1lOiAnU0Vycm9yJ1xuXG4gIGNvbnN0cnVjdG9yOiAoQG1lc3NhZ2UsIGNhdXNlLCBAanNvbikgLT5cbiAgICBzdXBlclxuXG4gICAgI0Vycm9yLmNhcHR1cmVTdGFja1RyYWNlIHRoaXMgb3IgQGNvbnN0cnVjdG9yXG4gICAgQGNhdXNlIGNhdXNlIGlmIGNhdXNlXG5cbiAgICByZXR1cm5cblxuICB0b1N0cmluZzogKCkgLT5cbiAgICBzdHIgPSAoQGhhc093blByb3BlcnR5KCduYW1lJykgYW5kIEBuYW1lIG9yIEBjb25zdHJ1Y3Rvci5uYW1lIG9yIEBjb25zdHJ1Y3Rvcjo6bmFtZSlcbiAgICBzdHIgKz0gXCIgLSAje0BtZXNzYWdlfVwiIGlmIEBtZXNzYWdlXG4gICAgc3RyICs9IFwiIDo6ICN7SlNPTi5zdHJpbmdpZnkoQGpzb24pfVwiIGlmIEBqc29uXG4gICAgc3RyICs9IFwiID0+IENhdXNlZCBieTogI3tAc2VfY2F1c2UudG9TdHJpbmcoKX1cIiBpZiBAc2VfY2F1c2UgYW5kIEBzZV9jYXVzZS5tZXNzYWdlXG4gICAgc3RyXG5cbiAgY2F1c2U6IChlcnIpIC0+XG4gICAgQHNlX2NhdXNlID0gZXJyIGlmIGVyciBpbnN0YW5jZW9mIEVycm9yXG4gICAgQHNlX2NhdXNlXG5cblxuIyMjICMjI1xuIyBEYkVycm9yIC0gZ2VuZXJpYyBkYXRhYmFzZSBlcnJvcidzXG5jbGFzcyBEYkVycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ0RiRXJyb3InXG5cbiAgdG9TdHJpbmdQdWJsaWM6ICgpIC0+XG4gICAgQG1lc3NhZ2VcblxuXG4jIyMgIyMjXG4jIFVuYXV0aG9yaXplZEVycm9yIC0gZ2VuZXJpYyB1bmF1dGhvcml6ZWQgZXJyb3Inc1xuY2xhc3MgVW5hdXRob3JpemVkRXJyb3IgZXh0ZW5kcyBTRXJyb3JcblxuICBuYW1lOiAnVW5hdXRob3JpemVkRXJyb3InXG5cbiAgdG9TdHJpbmdQdWJsaWM6ICgpIC0+XG4gICAgQG1lc3NhZ2VcblxuXG4jIyMgIyMjXG4jIFByaXZpbGFnZXNFcnJvciAtIGdlbmVyaWMgcHJpdmlsYWdlcy9hY2Nlc3MgZXJyb3Inc1xuY2xhc3MgUHJpdmlsYWdlc0Vycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ1ByaXZpbGFnZXNFcnJvcidcblxuICB0b1N0cmluZ1B1YmxpYzogKCkgLT5cbiAgICBAbWVzc2FnZVxuXG5cbiMjIyAjIyNcbiMgTm90Rm91bmRFcnJvciAtIGdlbmVyaWMgbm90IGZvdW5kL25vIHJlb3VzZWNlIGVycm9yJ3NcbmNsYXNzIE5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBTRXJyb3JcblxuICBuYW1lOiAnTm90Rm91bmRFcnJvcidcblxuICB0b1N0cmluZ1B1YmxpYzogKCkgLT5cbiAgICBAbWVzc2FnZVxuXG5cbiMjIyAjIyNcbiMgRVhQT1JUU1xuZXhwb3J0cy5Ob3RGb3VuZEVycm9yID0gTm90Rm91bmRFcnJvclxuZXhwb3J0cy5Qcml2aWxhZ2VzRXJyb3IgPSBQcml2aWxhZ2VzRXJyb3JcbmV4cG9ydHMuVW5hdXRob3JpemVkRXJyb3IgPSBVbmF1dGhvcml6ZWRFcnJvclxuZXhwb3J0cy5EYkVycm9yID0gRGJFcnJvclxuZXhwb3J0cy5TRXJyb3IgPSBTRXJyb3JcblxuZXhwb3J0cy5IdHRwRXJyb3IgPSBIdHRwRXJyb3JcbmV4cG9ydHMuaGFuZGxlSHR0cEVycm9ycyA9IGhhbmRsZUh0dHBFcnJvcnNcbiJdfQ==
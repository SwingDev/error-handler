
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

exports.handleHttpErrors = handleHttpErrors;


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

exports.HttpError = HttpError;


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

exports.SError = SError;


/* */

DbError = (function(_super) {
  __extends(DbError, _super);

  function DbError() {
    return DbError.__super__.constructor.apply(this, arguments);
  }

  DbError.prototype.name = 'DbError';

  return DbError;

})(SError);

exports.DbError = DbError;


/* */

UnauthorizedError = (function(_super) {
  __extends(UnauthorizedError, _super);

  function UnauthorizedError() {
    return UnauthorizedError.__super__.constructor.apply(this, arguments);
  }

  UnauthorizedError.prototype.name = 'UnauthorizedError';

  return UnauthorizedError;

})(SError);

exports.UnauthorizedError = UnauthorizedError;


/* */

PrivilagesError = (function(_super) {
  __extends(PrivilagesError, _super);

  function PrivilagesError() {
    return PrivilagesError.__super__.constructor.apply(this, arguments);
  }

  PrivilagesError.prototype.name = 'PrivilagesError';

  return PrivilagesError;

})(SError);

exports.PrivilagesError = PrivilagesError;


/* */

NotFoundError = (function(_super) {
  __extends(NotFoundError, _super);

  function NotFoundError() {
    return NotFoundError.__super__.constructor.apply(this, arguments);
  }

  NotFoundError.prototype.name = 'NotFoundError';

  return NotFoundError;

})(SError);

exports.NotFoundError = NotFoundError;

//# sourceMappingURL=data:application/json;base64,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QixDQUFBOztBQUFBLE9BNkNPLENBQUMsTUFBUixHQUFpQixNQTdDakIsQ0FBQTs7QUFnREE7QUFBQSxLQWhEQTs7QUFBQTtBQW9ERSw0QkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsb0JBQUEsSUFBQSxHQUFNLFNBQU4sQ0FBQTs7aUJBQUE7O0dBRm9CLE9BbER0QixDQUFBOztBQUFBLE9Bc0RPLENBQUMsT0FBUixHQUFrQixPQXREbEIsQ0FBQTs7QUF5REE7QUFBQSxLQXpEQTs7QUFBQTtBQTZERSxzQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsOEJBQUEsSUFBQSxHQUFNLG1CQUFOLENBQUE7OzJCQUFBOztHQUY4QixPQTNEaEMsQ0FBQTs7QUFBQSxPQStETyxDQUFDLGlCQUFSLEdBQTRCLGlCQS9ENUIsQ0FBQTs7QUFrRUE7QUFBQSxLQWxFQTs7QUFBQTtBQXNFRSxvQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsNEJBQUEsSUFBQSxHQUFNLGlCQUFOLENBQUE7O3lCQUFBOztHQUY0QixPQXBFOUIsQ0FBQTs7QUFBQSxPQXdFTyxDQUFDLGVBQVIsR0FBMEIsZUF4RTFCLENBQUE7O0FBMkVBO0FBQUEsS0EzRUE7O0FBQUE7QUErRUUsa0NBQUEsQ0FBQTs7OztHQUFBOztBQUFBLDBCQUFBLElBQUEsR0FBTSxlQUFOLENBQUE7O3VCQUFBOztHQUYwQixPQTdFNUIsQ0FBQTs7QUFBQSxPQWlGTyxDQUFDLGFBQVIsR0FBd0IsYUFqRnhCLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIjIyMgIyMjXG4jIGhhbmRsZUh0dHBFcnJvcnMgLSBtaWRkbGV3YXJlIGZvciBoYW5kbGluZyBIdHRwRXJyb3JzXG5oYW5kbGVIdHRwRXJyb3JzID0gKGVyciwgcmVxLCByZXMsIG5leHQpIC0+XG4gIHJldHVybiBuZXh0KCkgdW5sZXNzIGVycj9cbiAgcmV0dXJuIG5leHQoZXJyKSB1bmxlc3MgZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yXG4gIHJlcy5zdGF0dXMoZXJyLmh0dHBTdGF0dXMpLmpzb24gZXJyLmpzb25cblxuZXhwb3J0cy5oYW5kbGVIdHRwRXJyb3JzID0gaGFuZGxlSHR0cEVycm9yc1xuXG5cbiMjIyAjIyNcbiMgSHR0cEVycm9yIC0gZXJyb3JzIHdpdGggaHR0cCBzdGF0dXNcbmNsYXNzIEh0dHBFcnJvclxuXG4gIGNvbnN0cnVjdG9yOiAoQGh0dHBTdGF0dXMsIEBqc29uKSAtPlxuICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBodHRwIHN0YXR1cyBjb2RlJykgdW5sZXNzIEBodHRwU3RhdHVzP1xuXG5leHBvcnRzLkh0dHBFcnJvciA9IEh0dHBFcnJvclxuXG5cbiMjIyAjIyNcbiMgU0Vycm9yIC0gdW5pdmVyc2FsIGVycm9yJ3Mgd2l0aCB3cmFwcGluZ1xuY2xhc3MgU0Vycm9yIGV4dGVuZHMgRXJyb3JcblxuICBuYW1lOiAnU0Vycm9yJ1xuXG4gIGNvbnN0cnVjdG9yOiAoQG1lc3NhZ2UsIGNhdXNlLCBAanNvbikgLT5cbiAgICBzdXBlclxuXG4gICAgI0Vycm9yLmNhcHR1cmVTdGFja1RyYWNlIHRoaXMgb3IgQGNvbnN0cnVjdG9yXG4gICAgQGNhdXNlIGNhdXNlIGlmIGNhdXNlXG5cbiAgICByZXR1cm5cblxuICB0b1N0cmluZzogKCkgLT5cbiAgICBzdHIgPSAoQGhhc093blByb3BlcnR5KCduYW1lJykgYW5kIEBuYW1lIG9yIEBjb25zdHJ1Y3Rvci5uYW1lIG9yIEBjb25zdHJ1Y3Rvcjo6bmFtZSlcbiAgICBzdHIgKz0gXCIgLSAje0BtZXNzYWdlfVwiIGlmIEBtZXNzYWdlXG4gICAgc3RyICs9IFwiIDo6ICN7SlNPTi5zdHJpbmdpZnkoQGpzb24pfVwiIGlmIEBqc29uXG4gICAgc3RyICs9IFwiID0+IENhdXNlZCBieTogI3tAc2VfY2F1c2UudG9TdHJpbmcoKX1cIiBpZiBAc2VfY2F1c2UgYW5kIEBzZV9jYXVzZS5tZXNzYWdlXG4gICAgc3RyXG5cbiAgY2F1c2U6IChlcnIpIC0+XG4gICAgQHNlX2NhdXNlID0gZXJyIGlmIGVyciBpbnN0YW5jZW9mIEVycm9yXG4gICAgQHNlX2NhdXNlXG5cbmV4cG9ydHMuU0Vycm9yID0gU0Vycm9yXG5cblxuIyMjICMjI1xuIyBEYkVycm9yIC0gZ2VuZXJpYyBkYXRhYmFzZSBlcnJvcidzXG5jbGFzcyBEYkVycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ0RiRXJyb3InXG5cbmV4cG9ydHMuRGJFcnJvciA9IERiRXJyb3JcblxuXG4jIyMgIyMjXG4jIFVuYXV0aG9yaXplZEVycm9yIC0gZ2VuZXJpYyB1bmF1dGhvcml6ZWQgZXJyb3Inc1xuY2xhc3MgVW5hdXRob3JpemVkRXJyb3IgZXh0ZW5kcyBTRXJyb3JcblxuICBuYW1lOiAnVW5hdXRob3JpemVkRXJyb3InXG5cbmV4cG9ydHMuVW5hdXRob3JpemVkRXJyb3IgPSBVbmF1dGhvcml6ZWRFcnJvclxuXG5cbiMjIyAjIyNcbiMgUHJpdmlsYWdlc0Vycm9yIC0gZ2VuZXJpYyBwcml2aWxhZ2VzL2FjY2VzcyBlcnJvcidzXG5jbGFzcyBQcml2aWxhZ2VzRXJyb3IgZXh0ZW5kcyBTRXJyb3JcblxuICBuYW1lOiAnUHJpdmlsYWdlc0Vycm9yJ1xuXG5leHBvcnRzLlByaXZpbGFnZXNFcnJvciA9IFByaXZpbGFnZXNFcnJvclxuXG5cbiMjIyAjIyNcbiMgTm90Rm91bmRFcnJvciAtIGdlbmVyaWMgbm90IGZvdW5kL25vIHJlb3VzZWNlIGVycm9yJ3NcbmNsYXNzIE5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBTRXJyb3JcblxuICBuYW1lOiAnTm90Rm91bmRFcnJvcidcblxuZXhwb3J0cy5Ob3RGb3VuZEVycm9yID0gTm90Rm91bmRFcnJvclxuIl19
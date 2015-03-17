
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
  if (err.json.message === "") {
    return res.status(err.httpStatus).end();
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

  SError.prototype.type = SError.name;

  function SError(message, cause, json) {
    this.json = json;
    SError.__super__.constructor.apply(this, arguments);
    Error.captureStackTrace(this || this.constructor);
    if (typeof message === "string") {
      this.message = message;
    } else if (message instanceof Error) {
      this.message = "";
      this.cause(message);
    }
    if (cause) {
      this.cause(cause);
    }
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

  DbError.prototype.type = DbError.name;

  return DbError;

})(SError);


/* */

UnauthorizedError = (function(_super) {
  __extends(UnauthorizedError, _super);

  function UnauthorizedError() {
    return UnauthorizedError.__super__.constructor.apply(this, arguments);
  }

  UnauthorizedError.prototype.name = 'UnauthorizedError';

  UnauthorizedError.prototype.type = UnauthorizedError.name;

  return UnauthorizedError;

})(SError);


/* */

PrivilagesError = (function(_super) {
  __extends(PrivilagesError, _super);

  function PrivilagesError() {
    return PrivilagesError.__super__.constructor.apply(this, arguments);
  }

  PrivilagesError.prototype.name = 'PrivilagesError';

  PrivilagesError.prototype.type = PrivilagesError.name;

  return PrivilagesError;

})(SError);


/* */

NotFoundError = (function(_super) {
  __extends(NotFoundError, _super);

  function NotFoundError() {
    return NotFoundError.__super__.constructor.apply(this, arguments);
  }

  NotFoundError.prototype.name = 'NotFoundError';

  NotFoundError.prototype.type = NotFoundError.name;

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

//# sourceMappingURL=data:application/json;base64,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T0ExRTlCLENBQUE7O0FBaUZBO0FBQUEsS0FqRkE7O0FBQUE7QUFxRkUsa0NBQUEsQ0FBQTs7OztHQUFBOztBQUFBLDBCQUFBLElBQUEsR0FBTSxlQUFOLENBQUE7O0FBQUEsMEJBRUEsSUFBQSxHQUFNLGFBQUMsQ0FBQSxJQUZQLENBQUE7O3VCQUFBOztHQUYwQixPQW5GNUIsQ0FBQTs7QUEwRkE7QUFBQSxLQTFGQTs7QUFBQSxPQTRGTyxDQUFDLGFBQVIsR0FBd0IsYUE1RnhCLENBQUE7O0FBQUEsT0E2Rk8sQ0FBQyxlQUFSLEdBQTBCLGVBN0YxQixDQUFBOztBQUFBLE9BOEZPLENBQUMsaUJBQVIsR0FBNEIsaUJBOUY1QixDQUFBOztBQUFBLE9BK0ZPLENBQUMsT0FBUixHQUFrQixPQS9GbEIsQ0FBQTs7QUFBQSxPQWdHTyxDQUFDLE1BQVIsR0FBaUIsTUFoR2pCLENBQUE7O0FBQUEsT0FrR08sQ0FBQyxTQUFSLEdBQW9CLFNBbEdwQixDQUFBOztBQUFBLE9BbUdPLENBQUMsZ0JBQVIsR0FBMkIsZ0JBbkczQixDQUFBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiIyMjICMjI1xuIyBoYW5kbGVIdHRwRXJyb3JzIC0gbWlkZGxld2FyZSBmb3IgaGFuZGxpbmcgSHR0cEVycm9yc1xuaGFuZGxlSHR0cEVycm9ycyA9IChlcnIsIHJlcSwgcmVzLCBuZXh0KSAtPlxuICByZXR1cm4gbmV4dCgpIHVubGVzcyBlcnI/XG4gIHJldHVybiBuZXh0KGVycikgdW5sZXNzIGVyciBpbnN0YW5jZW9mIEh0dHBFcnJvclxuICByZXR1cm4gcmVzLnN0YXR1cyhlcnIuaHR0cFN0YXR1cykuZW5kKCkgaWYgZXJyLmpzb24ubWVzc2FnZSBpcyBcIlwiXG4gIHJlcy5zdGF0dXMoZXJyLmh0dHBTdGF0dXMpLmpzb24gZXJyLmpzb25cblxuXG4jIyMgIyMjXG4jIEh0dHBFcnJvciAtIGVycm9ycyB3aXRoIGh0dHAgc3RhdHVzXG5jbGFzcyBIdHRwRXJyb3JcblxuICBjb25zdHJ1Y3RvcjogKEBodHRwU3RhdHVzLCBAanNvbikgLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgaHR0cCBzdGF0dXMgY29kZScpIHVubGVzcyBAaHR0cFN0YXR1cz9cblxuXG4jIyMgIyMjXG4jIFNFcnJvciAtIHVuaXZlcnNhbCBlcnJvcidzIHdpdGggd3JhcHBpbmdcbmNsYXNzIFNFcnJvciBleHRlbmRzIEVycm9yXG5cbiAgbmFtZTogJ1NFcnJvcidcblxuICB0eXBlOiBAbmFtZVxuXG4gIGNvbnN0cnVjdG9yOiAobWVzc2FnZSwgY2F1c2UsIEBqc29uKSAtPlxuICAgIHN1cGVyXG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgdGhpcyBvciBAY29uc3RydWN0b3JcbiAgICBpZiB0eXBlb2YobWVzc2FnZSkgaXMgXCJzdHJpbmdcIlxuICAgICAgQG1lc3NhZ2UgPSBtZXNzYWdlXG4gICAgZWxzZSBpZiBtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3JcbiAgICAgIEBtZXNzYWdlID0gXCJcIlxuICAgICAgQGNhdXNlIG1lc3NhZ2VcbiAgICBpZiBjYXVzZVxuICAgICAgQGNhdXNlIGNhdXNlXG5cbiAgdG9EZWJ1ZzogKCkgLT5cbiAgICBzdHIgPSAoQGhhc093blByb3BlcnR5KCduYW1lJykgYW5kIEBuYW1lIG9yIEBjb25zdHJ1Y3Rvci5uYW1lIG9yIEBjb25zdHJ1Y3Rvcjo6bmFtZSlcbiAgICBzdHIgKz0gXCIgLSAje0BtZXNzYWdlfVwiIGlmIEBtZXNzYWdlXG4gICAgc3RyICs9IFwiIDo6ICN7SlNPTi5zdHJpbmdpZnkoQGpzb24pfVwiIGlmIEBqc29uXG4gICAgc3RyICs9IFwiID0+IENhdXNlZCBieTogI3tAc2VfY2F1c2UudG9EZWJ1ZygpfVwiIGlmIEBzZV9jYXVzZSBhbmQgQHNlX2NhdXNlLm1lc3NhZ2VcbiAgICBzdHJcblxuICB0b1N0cmluZzogKCkgLT5cbiAgICBAbWVzc2FnZVxuXG4gIHRvSlNPTjogKCkgLT5cbiAgICBAbWVzc2FnZVxuXG4gIGNhdXNlOiAoZXJyKSAtPlxuICAgIEBzZV9jYXVzZSA9IGVyciBpZiBlcnIgaW5zdGFuY2VvZiBFcnJvclxuICAgIEBzZV9jYXVzZVxuXG5cbiMjIyAjIyNcbiMgRGJFcnJvciAtIGdlbmVyaWMgZGF0YWJhc2UgZXJyb3Inc1xuY2xhc3MgRGJFcnJvciBleHRlbmRzIFNFcnJvclxuXG4gIG5hbWU6ICdEYkVycm9yJ1xuXG4gIHR5cGU6IEBuYW1lXG5cblxuIyMjICMjI1xuIyBVbmF1dGhvcml6ZWRFcnJvciAtIGdlbmVyaWMgdW5hdXRob3JpemVkIGVycm9yJ3NcbmNsYXNzIFVuYXV0aG9yaXplZEVycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ1VuYXV0aG9yaXplZEVycm9yJ1xuXG4gIHR5cGU6IEBuYW1lXG5cblxuIyMjICMjI1xuIyBQcml2aWxhZ2VzRXJyb3IgLSBnZW5lcmljIHByaXZpbGFnZXMvYWNjZXNzIGVycm9yJ3NcbmNsYXNzIFByaXZpbGFnZXNFcnJvciBleHRlbmRzIFNFcnJvclxuXG4gIG5hbWU6ICdQcml2aWxhZ2VzRXJyb3InXG5cbiAgdHlwZTogQG5hbWVcblxuXG4jIyMgIyMjXG4jIE5vdEZvdW5kRXJyb3IgLSBnZW5lcmljIG5vdCBmb3VuZC9ubyByZW91c2VjZSBlcnJvcidzXG5jbGFzcyBOb3RGb3VuZEVycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ05vdEZvdW5kRXJyb3InXG5cbiAgdHlwZTogQG5hbWVcblxuXG4jIyMgIyMjXG4jIEVYUE9SVFNcbmV4cG9ydHMuTm90Rm91bmRFcnJvciA9IE5vdEZvdW5kRXJyb3JcbmV4cG9ydHMuUHJpdmlsYWdlc0Vycm9yID0gUHJpdmlsYWdlc0Vycm9yXG5leHBvcnRzLlVuYXV0aG9yaXplZEVycm9yID0gVW5hdXRob3JpemVkRXJyb3JcbmV4cG9ydHMuRGJFcnJvciA9IERiRXJyb3JcbmV4cG9ydHMuU0Vycm9yID0gU0Vycm9yXG5cbmV4cG9ydHMuSHR0cEVycm9yID0gSHR0cEVycm9yXG5leHBvcnRzLmhhbmRsZUh0dHBFcnJvcnMgPSBoYW5kbGVIdHRwRXJyb3JzXG4iXX0=
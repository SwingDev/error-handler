
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

//# sourceMappingURL=data:application/json;base64,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eEIsQ0FBQTs7QUFBQSxPQW9GTyxDQUFDLGVBQVIsR0FBMEIsZUFwRjFCLENBQUE7O0FBQUEsT0FxRk8sQ0FBQyxpQkFBUixHQUE0QixpQkFyRjVCLENBQUE7O0FBQUEsT0FzRk8sQ0FBQyxPQUFSLEdBQWtCLE9BdEZsQixDQUFBOztBQUFBLE9BdUZPLENBQUMsTUFBUixHQUFpQixNQXZGakIsQ0FBQTs7QUFBQSxPQXlGTyxDQUFDLFNBQVIsR0FBb0IsU0F6RnBCLENBQUE7O0FBQUEsT0EwRk8sQ0FBQyxnQkFBUixHQUEyQixnQkExRjNCLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIjIyMgIyMjXG4jIGhhbmRsZUh0dHBFcnJvcnMgLSBtaWRkbGV3YXJlIGZvciBoYW5kbGluZyBIdHRwRXJyb3JzXG5oYW5kbGVIdHRwRXJyb3JzID0gKGVyciwgcmVxLCByZXMsIG5leHQpIC0+XG4gIHJldHVybiBuZXh0KCkgdW5sZXNzIGVycj9cbiAgcmV0dXJuIG5leHQoZXJyKSB1bmxlc3MgZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yXG4gIHJldHVybiByZXMuc3RhdHVzKGVyci5odHRwU3RhdHVzKS5lbmQoKSBpZiBlcnIuanNvbi5tZXNzYWdlIGlzIFwiXCJcbiAgcmVzLnN0YXR1cyhlcnIuaHR0cFN0YXR1cykuanNvbiBlcnIuanNvblxuXG5cbiMjIyAjIyNcbiMgSHR0cEVycm9yIC0gZXJyb3JzIHdpdGggaHR0cCBzdGF0dXNcbmNsYXNzIEh0dHBFcnJvclxuXG4gIGNvbnN0cnVjdG9yOiAoQGh0dHBTdGF0dXMsIEBqc29uKSAtPlxuICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBodHRwIHN0YXR1cyBjb2RlJykgdW5sZXNzIEBodHRwU3RhdHVzP1xuXG5cbiMjIyAjIyNcbiMgU0Vycm9yIC0gdW5pdmVyc2FsIGVycm9yJ3Mgd2l0aCB3cmFwcGluZ1xuY2xhc3MgU0Vycm9yIGV4dGVuZHMgRXJyb3JcblxuICBuYW1lOiAnU0Vycm9yJ1xuXG4gIGNvbnN0cnVjdG9yOiAobWVzc2FnZSwgY2F1c2UsIEBqc29uKSAtPlxuICAgIHN1cGVyXG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgdGhpcyBvciBAY29uc3RydWN0b3JcbiAgICBpZiB0eXBlb2YobWVzc2FnZSkgaXMgXCJzdHJpbmdcIlxuICAgICAgQG1lc3NhZ2UgPSBtZXNzYWdlXG4gICAgZWxzZSBpZiBtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3JcbiAgICAgIEBtZXNzYWdlID0gXCJcIlxuICAgICAgQGNhdXNlIG1lc3NhZ2VcbiAgICBpZiBjYXVzZVxuICAgICAgQGNhdXNlIGNhdXNlXG5cbiBcbiAgdG9EZWJ1ZzogKCkgLT5cbiAgICBzdHIgPSAoQGhhc093blByb3BlcnR5KCduYW1lJykgYW5kIEBuYW1lIG9yIEBjb25zdHJ1Y3Rvci5uYW1lIG9yIEBjb25zdHJ1Y3Rvcjo6bmFtZSlcbiAgICBzdHIgKz0gXCIgLSAje0BtZXNzYWdlfVwiIGlmIEBtZXNzYWdlXG4gICAgc3RyICs9IFwiIDo6ICN7SlNPTi5zdHJpbmdpZnkoQGpzb24pfVwiIGlmIEBqc29uXG4gICAgc3RyICs9IFwiID0+IENhdXNlZCBieTogI3tAc2VfY2F1c2UudG9EZWJ1ZygpfVwiIGlmIEBzZV9jYXVzZSBhbmQgQHNlX2NhdXNlLm1lc3NhZ2VcbiAgICBzdHJcblxuICB0b1N0cmluZzogKCkgLT5cbiAgICBAbWVzc2FnZVxuXG4gIHRvSlNPTjogKCkgLT5cbiAgICBAbWVzc2FnZVxuXG4gIGNhdXNlOiAoZXJyKSAtPlxuICAgIEBzZV9jYXVzZSA9IGVyciBpZiBlcnIgaW5zdGFuY2VvZiBFcnJvclxuICAgIEBzZV9jYXVzZVxuXG5cbiMjIyAjIyNcbiMgRGJFcnJvciAtIGdlbmVyaWMgZGF0YWJhc2UgZXJyb3Inc1xuY2xhc3MgRGJFcnJvciBleHRlbmRzIFNFcnJvclxuXG4gIG5hbWU6ICdEYkVycm9yJ1xuXG5cbiMjIyAjIyNcbiMgVW5hdXRob3JpemVkRXJyb3IgLSBnZW5lcmljIHVuYXV0aG9yaXplZCBlcnJvcidzXG5jbGFzcyBVbmF1dGhvcml6ZWRFcnJvciBleHRlbmRzIFNFcnJvclxuXG4gIG5hbWU6ICdVbmF1dGhvcml6ZWRFcnJvcidcblxuXG4jIyMgIyMjXG4jIFByaXZpbGFnZXNFcnJvciAtIGdlbmVyaWMgcHJpdmlsYWdlcy9hY2Nlc3MgZXJyb3Inc1xuY2xhc3MgUHJpdmlsYWdlc0Vycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ1ByaXZpbGFnZXNFcnJvcidcblxuXG4jIyMgIyMjXG4jIE5vdEZvdW5kRXJyb3IgLSBnZW5lcmljIG5vdCBmb3VuZC9ubyByZW91c2VjZSBlcnJvcidzXG5jbGFzcyBOb3RGb3VuZEVycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ05vdEZvdW5kRXJyb3InXG5cblxuIyMjICMjI1xuIyBFWFBPUlRTXG5leHBvcnRzLk5vdEZvdW5kRXJyb3IgPSBOb3RGb3VuZEVycm9yXG5leHBvcnRzLlByaXZpbGFnZXNFcnJvciA9IFByaXZpbGFnZXNFcnJvclxuZXhwb3J0cy5VbmF1dGhvcml6ZWRFcnJvciA9IFVuYXV0aG9yaXplZEVycm9yXG5leHBvcnRzLkRiRXJyb3IgPSBEYkVycm9yXG5leHBvcnRzLlNFcnJvciA9IFNFcnJvclxuXG5leHBvcnRzLkh0dHBFcnJvciA9IEh0dHBFcnJvclxuZXhwb3J0cy5oYW5kbGVIdHRwRXJyb3JzID0gaGFuZGxlSHR0cEVycm9yc1xuIl19
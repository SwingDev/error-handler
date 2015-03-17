
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

//# sourceMappingURL=data:application/json;base64,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QUFBLEtBbEZBOztBQUFBLE9Bb0ZPLENBQUMsYUFBUixHQUF3QixhQXBGeEIsQ0FBQTs7QUFBQSxPQXFGTyxDQUFDLGVBQVIsR0FBMEIsZUFyRjFCLENBQUE7O0FBQUEsT0FzRk8sQ0FBQyxpQkFBUixHQUE0QixpQkF0RjVCLENBQUE7O0FBQUEsT0F1Rk8sQ0FBQyxPQUFSLEdBQWtCLE9BdkZsQixDQUFBOztBQUFBLE9Bd0ZPLENBQUMsTUFBUixHQUFpQixNQXhGakIsQ0FBQTs7QUFBQSxPQTBGTyxDQUFDLFNBQVIsR0FBb0IsU0ExRnBCLENBQUE7O0FBQUEsT0EyRk8sQ0FBQyxnQkFBUixHQUEyQixnQkEzRjNCLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIjIyMgIyMjXG4jIGhhbmRsZUh0dHBFcnJvcnMgLSBtaWRkbGV3YXJlIGZvciBoYW5kbGluZyBIdHRwRXJyb3JzXG5oYW5kbGVIdHRwRXJyb3JzID0gKGVyciwgcmVxLCByZXMsIG5leHQpIC0+XG4gIHJldHVybiBuZXh0KCkgdW5sZXNzIGVycj9cbiAgcmV0dXJuIG5leHQoZXJyKSB1bmxlc3MgZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yXG4gIHJldHVybiByZXMuc3RhdHVzKGVyci5odHRwU3RhdHVzKS5lbmQoKSBpZiBlcnIuanNvbi5tZXNzYWdlIGlzIFwiXCJcbiAgcmVzLnN0YXR1cyhlcnIuaHR0cFN0YXR1cykuanNvbiBlcnIuanNvblxuXG5cbiMjIyAjIyNcbiMgSHR0cEVycm9yIC0gZXJyb3JzIHdpdGggaHR0cCBzdGF0dXNcbmNsYXNzIEh0dHBFcnJvclxuXG4gIGNvbnN0cnVjdG9yOiAoQGh0dHBTdGF0dXMsIEBqc29uKSAtPlxuICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBodHRwIHN0YXR1cyBjb2RlJykgdW5sZXNzIEBodHRwU3RhdHVzP1xuXG5cbiMjIyAjIyNcbiMgU0Vycm9yIC0gdW5pdmVyc2FsIGVycm9yJ3Mgd2l0aCB3cmFwcGluZ1xuY2xhc3MgU0Vycm9yIGV4dGVuZHMgRXJyb3JcblxuICBuYW1lOiAnU0Vycm9yJ1xuXG4gIHR5cGU6IEBuYW1lXG5cbiAgY29uc3RydWN0b3I6IChtZXNzYWdlLCBjYXVzZSwgQGpzb24pIC0+XG4gICAgc3VwZXJcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSB0aGlzIG9yIEBjb25zdHJ1Y3RvclxuICAgIGlmIHR5cGVvZihtZXNzYWdlKSBpcyBcInN0cmluZ1wiXG4gICAgICBAbWVzc2FnZSA9IG1lc3NhZ2VcbiAgICBlbHNlIGlmIG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgQG1lc3NhZ2UgPSBcIlwiXG4gICAgICBAY2F1c2UgbWVzc2FnZVxuICAgIGlmIGNhdXNlXG4gICAgICBAY2F1c2UgY2F1c2VcblxuICB0b0RlYnVnOiAoKSAtPlxuICAgIHN0ciA9IChAaGFzT3duUHJvcGVydHkoJ25hbWUnKSBhbmQgQG5hbWUgb3IgQGNvbnN0cnVjdG9yLm5hbWUgb3IgQGNvbnN0cnVjdG9yOjpuYW1lKVxuICAgIHN0ciArPSBcIiAtICN7QG1lc3NhZ2V9XCIgaWYgQG1lc3NhZ2VcbiAgICBzdHIgKz0gXCIgOjogI3tKU09OLnN0cmluZ2lmeShAanNvbil9XCIgaWYgQGpzb25cbiAgICBzdHIgKz0gXCIgPT4gQ2F1c2VkIGJ5OiAje0BzZV9jYXVzZS50b0RlYnVnKCl9XCIgaWYgQHNlX2NhdXNlIGFuZCBAc2VfY2F1c2UubWVzc2FnZVxuICAgIHN0clxuXG4gIHRvU3RyaW5nOiAoKSAtPlxuICAgIEBtZXNzYWdlXG5cbiAgdG9KU09OOiAoKSAtPlxuICAgIEBtZXNzYWdlXG5cbiAgY2F1c2U6IChlcnIpIC0+XG4gICAgQHNlX2NhdXNlID0gZXJyIGlmIGVyciBpbnN0YW5jZW9mIEVycm9yXG4gICAgQHNlX2NhdXNlXG5cblxuIyMjICMjI1xuIyBEYkVycm9yIC0gZ2VuZXJpYyBkYXRhYmFzZSBlcnJvcidzXG5jbGFzcyBEYkVycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ0RiRXJyb3InXG5cblxuIyMjICMjI1xuIyBVbmF1dGhvcml6ZWRFcnJvciAtIGdlbmVyaWMgdW5hdXRob3JpemVkIGVycm9yJ3NcbmNsYXNzIFVuYXV0aG9yaXplZEVycm9yIGV4dGVuZHMgU0Vycm9yXG5cbiAgbmFtZTogJ1VuYXV0aG9yaXplZEVycm9yJ1xuXG5cbiMjIyAjIyNcbiMgUHJpdmlsYWdlc0Vycm9yIC0gZ2VuZXJpYyBwcml2aWxhZ2VzL2FjY2VzcyBlcnJvcidzXG5jbGFzcyBQcml2aWxhZ2VzRXJyb3IgZXh0ZW5kcyBTRXJyb3JcblxuICBuYW1lOiAnUHJpdmlsYWdlc0Vycm9yJ1xuXG5cbiMjIyAjIyNcbiMgTm90Rm91bmRFcnJvciAtIGdlbmVyaWMgbm90IGZvdW5kL25vIHJlb3VzZWNlIGVycm9yJ3NcbmNsYXNzIE5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBTRXJyb3JcblxuICBuYW1lOiAnTm90Rm91bmRFcnJvcidcblxuXG4jIyMgIyMjXG4jIEVYUE9SVFNcbmV4cG9ydHMuTm90Rm91bmRFcnJvciA9IE5vdEZvdW5kRXJyb3JcbmV4cG9ydHMuUHJpdmlsYWdlc0Vycm9yID0gUHJpdmlsYWdlc0Vycm9yXG5leHBvcnRzLlVuYXV0aG9yaXplZEVycm9yID0gVW5hdXRob3JpemVkRXJyb3JcbmV4cG9ydHMuRGJFcnJvciA9IERiRXJyb3JcbmV4cG9ydHMuU0Vycm9yID0gU0Vycm9yXG5cbmV4cG9ydHMuSHR0cEVycm9yID0gSHR0cEVycm9yXG5leHBvcnRzLmhhbmRsZUh0dHBFcnJvcnMgPSBoYW5kbGVIdHRwRXJyb3JzXG4iXX0=
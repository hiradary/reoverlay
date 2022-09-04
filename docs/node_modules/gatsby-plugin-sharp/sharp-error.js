"use strict";

exports.__esModule = true;
exports.SharpError = void 0;

// This custom error should help us debug sharp errors when occurring.
class SharpError extends Error {
  /**
   *
   * @param {string} message
   * @param {Error} err
   */
  constructor(message, err = null) {
    let fullErrorMessage = message;

    if (err) {
      fullErrorMessage += `

Original error:
${err.message}`;
    }

    super(fullErrorMessage);
    this.name = `SharpError`;
    Error.captureStackTrace(this, SharpError);
  }

}

exports.SharpError = SharpError;
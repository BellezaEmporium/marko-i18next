"use strict";

/**
 * Marko v6 renderer
 * Contract: out.global.t(key, options)
 */
module.exports = function i18nMessage(input, out) {
  const t = out.global && out.global.t;

  // Options bag comes from @* attributes
  const options = input["*"] || {};

  const value = t
    ? t(input.key, options)
    : input.key;

  const shouldEscape =
    input.escape === undefined ? true : Boolean(input.escape);

  if (shouldEscape) {
    out.write(out.escapeXml(String(value)));
  } else {
    out.write(String(value));
  }
};

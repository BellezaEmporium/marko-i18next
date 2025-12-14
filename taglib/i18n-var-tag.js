import { types as t } from "@marko/compiler";
"use strict";

/**
 * <i18n-var name="i18n" />
 *
 * Compiles to:
 * const i18n = (key, opts) =>
 *   out.global.t ? out.global.t(key, opts || {}) : key;
 */
export default function i18nVarTransform(tag) {
  const nameAttr = tag.node.attributes.find(
    (attr) =>
      t.isMarkoAttribute(attr) &&
      attr.name === "name" &&
      t.isStringLiteral(attr.value)
  );

  const identifier = nameAttr
    ? nameAttr.value.value
    : "i18n";

  tag.replaceWith(
    t.variableDeclaration("const", [
      t.variableDeclarator(
        t.identifier(identifier),
        t.arrowFunctionExpression(
          [t.identifier("key"), t.identifier("opts")],
          t.conditionalExpression(
            t.memberExpression(
              t.memberExpression(
                t.identifier("out"),
                t.identifier("global")
              ),
              t.identifier("t")
            ),
            t.callExpression(
              t.memberExpression(
                t.memberExpression(
                  t.identifier("out"),
                  t.identifier("global")
                ),
                t.identifier("t")
              ),
              [
                t.identifier("key"),
                t.logicalExpression(
                  "||",
                  t.identifier("opts"),
                  t.objectExpression([])
                )
              ]
            ),
            t.identifier("key")
          )
        )
      )
    ])
  );
}

// vite.config.ts
import path from "path";
import pluginReplace from "file:///home/misskey/misskey/node_modules/.pnpm/@rollup+plugin-replace@5.0.2_rollup@3.26.3/node_modules/@rollup/plugin-replace/dist/es/index.js";
import pluginVue from "file:///home/misskey/misskey/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.4_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///home/misskey/misskey/node_modules/.pnpm/vite@4.4.4_@types+node@20.4.2_sass@1.63.6/node_modules/vite/dist/node/index.js";
import ReactivityTransform from "file:///home/misskey/misskey/node_modules/.pnpm/@vue-macros+reactivity-transform@0.3.15_rollup@3.26.3_vue@3.3.4/node_modules/@vue-macros/reactivity-transform/dist/vite.mjs";

// ../../locales/index.js
import * as fs from "node:fs";
import * as yaml from "file:///home/misskey/misskey/node_modules/.pnpm/js-yaml@4.1.0/node_modules/js-yaml/dist/js-yaml.mjs";
var __vite_injected_original_import_meta_url = "file:///home/misskey/misskey/locales/index.js";
var merge = (...args) => args.reduce((a, c) => ({
  ...a,
  ...c,
  ...Object.entries(a).filter(([k]) => c && typeof c[k] === "object").reduce((a2, [k, v]) => (a2[k] = merge(v, c[k]), a2), {})
}), {});
var languages = [
  "ar-SA",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "en-US",
  "es-ES",
  "fr-FR",
  "id-ID",
  "it-IT",
  "ja-JP",
  "ja-KS",
  "kab-KAB",
  "kn-IN",
  "ko-KR",
  "nl-NL",
  "no-NO",
  "pl-PL",
  "pt-PT",
  "ru-RU",
  "sk-SK",
  "th-TH",
  "ug-CN",
  "uk-UA",
  "vi-VN",
  "zh-CN",
  "zh-TW"
];
var primaries = {
  "en": "US",
  "ja": "JP",
  "zh": "CN"
};
var clean = (text) => text.replace(new RegExp(String.fromCodePoint(8), "g"), "");
var locales = languages.reduce((a, c) => (a[c] = yaml.load(clean(fs.readFileSync(new URL(`${c}.yml`, __vite_injected_original_import_meta_url), "utf-8"))) || {}, a), {});
var locales_default = Object.entries(locales).reduce((a, [k, v]) => (a[k] = (() => {
  const [lang] = k.split("-");
  switch (k) {
    case "ja-JP":
      return v;
    case "ja-KS":
    case "en-US":
      return merge(locales["ja-JP"], v);
    default:
      return merge(
        locales["ja-JP"],
        locales["en-US"],
        locales[`${lang}-${primaries[lang]}`] || {},
        v
      );
  }
})(), a), {});

// ../../package.json
var package_default = {
  name: "misskey",
  version: "2023.9.1-9ine-4.0.0",
  codename: "KAGUYA",
  repository: {
    type: "git",
    url: "https://github.com/9ineverse-dev/Type-9ine.git"
  },
  packageManager: "pnpm@8.7.6",
  workspaces: [
    "packages/frontend",
    "packages/backend",
    "packages/sw"
  ],
  private: true,
  scripts: {
    "build-pre": "node ./scripts/build-pre.js",
    "build-assets": "node ./scripts/build-assets.mjs",
    build: "pnpm build-pre && pnpm -r build && pnpm build-assets",
    "build-storybook": "pnpm --filter frontend build-storybook",
    start: "pnpm check:connect && cd packages/backend && node ./built/boot/entry.js",
    "start:test": "cd packages/backend && cross-env NODE_ENV=test node ./built/boot/entry.js",
    init: "pnpm migrate",
    migrate: "cd packages/backend && pnpm migrate",
    "check:connect": "cd packages/backend && pnpm check:connect",
    migrateandstart: "pnpm migrate && pnpm start",
    watch: "pnpm dev",
    dev: "node ./scripts/dev.mjs",
    lint: "pnpm -r lint",
    "cy:open": "pnpm cypress open --browser --e2e --config-file=cypress.config.ts",
    "cy:run": "pnpm cypress run",
    e2e: "pnpm start-server-and-test start:test http://localhost:61812 cy:run",
    jest: "cd packages/backend && pnpm jest",
    "jest-and-coverage": "cd packages/backend && pnpm jest-and-coverage",
    test: "pnpm -r test",
    "test-and-coverage": "pnpm -r test-and-coverage",
    clean: "node ./scripts/clean.js",
    "clean-all": "node ./scripts/clean-all.js",
    cleanall: "pnpm clean-all"
  },
  resolutions: {
    chokidar: "3.5.3",
    lodash: "4.17.21"
  },
  dependencies: {
    execa: "8.0.1",
    cssnano: "6.0.1",
    "js-yaml": "4.1.0",
    postcss: "8.4.30",
    terser: "5.20.0",
    typescript: "5.2.2"
  },
  devDependencies: {
    "@typescript-eslint/eslint-plugin": "6.7.2",
    "@typescript-eslint/parser": "6.7.2",
    "cross-env": "7.0.3",
    cypress: "13.2.0",
    eslint: "8.50.0",
    "start-server-and-test": "2.0.1"
  },
  optionalDependencies: {
    "@tensorflow/tfjs-core": "4.4.0"
  }
};

// lib/rollup-plugin-unwind-css-module-class-name.ts
import { generate } from "file:///home/misskey/misskey/node_modules/.pnpm/astring@1.8.6/node_modules/astring/dist/astring.mjs";

// ../../node_modules/.pnpm/estree-walker@3.0.3/node_modules/estree-walker/src/walker.js
var WalkerBase = class {
  constructor() {
    this.should_skip = false;
    this.should_remove = false;
    this.replacement = null;
    this.context = {
      skip: () => this.should_skip = true,
      remove: () => this.should_remove = true,
      replace: (node) => this.replacement = node
    };
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   * @param {Node} node
   */
  replace(parent, prop, index, node) {
    if (parent && prop) {
      if (index != null) {
        parent[prop][index] = node;
      } else {
        parent[prop] = node;
      }
    }
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   */
  remove(parent, prop, index) {
    if (parent && prop) {
      if (index !== null && index !== void 0) {
        parent[prop].splice(index, 1);
      } else {
        delete parent[prop];
      }
    }
  }
};

// ../../node_modules/.pnpm/estree-walker@3.0.3/node_modules/estree-walker/src/sync.js
var SyncWalker = class extends WalkerBase {
  /**
   *
   * @param {SyncHandler} [enter]
   * @param {SyncHandler} [leave]
   */
  constructor(enter, leave) {
    super();
    this.should_skip = false;
    this.should_remove = false;
    this.replacement = null;
    this.context = {
      skip: () => this.should_skip = true,
      remove: () => this.should_remove = true,
      replace: (node) => this.replacement = node
    };
    this.enter = enter;
    this.leave = leave;
  }
  /**
   * @template {Node} Parent
   * @param {Node} node
   * @param {Parent | null} parent
   * @param {keyof Parent} [prop]
   * @param {number | null} [index]
   * @returns {Node | null}
   */
  visit(node, parent, prop, index) {
    if (node) {
      if (this.enter) {
        const _should_skip = this.should_skip;
        const _should_remove = this.should_remove;
        const _replacement = this.replacement;
        this.should_skip = false;
        this.should_remove = false;
        this.replacement = null;
        this.enter.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const skipped = this.should_skip;
        const removed = this.should_remove;
        this.should_skip = _should_skip;
        this.should_remove = _should_remove;
        this.replacement = _replacement;
        if (skipped)
          return node;
        if (removed)
          return null;
      }
      let key;
      for (key in node) {
        const value = node[key];
        if (value && typeof value === "object") {
          if (Array.isArray(value)) {
            const nodes = (
              /** @type {Array<unknown>} */
              value
            );
            for (let i = 0; i < nodes.length; i += 1) {
              const item = nodes[i];
              if (isNode(item)) {
                if (!this.visit(item, node, key, i)) {
                  i--;
                }
              }
            }
          } else if (isNode(value)) {
            this.visit(value, node, key, null);
          }
        }
      }
      if (this.leave) {
        const _replacement = this.replacement;
        const _should_remove = this.should_remove;
        this.replacement = null;
        this.should_remove = false;
        this.leave.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const removed = this.should_remove;
        this.replacement = _replacement;
        this.should_remove = _should_remove;
        if (removed)
          return null;
      }
    }
    return node;
  }
};
function isNode(value) {
  return value !== null && typeof value === "object" && "type" in value && typeof value.type === "string";
}

// ../../node_modules/.pnpm/estree-walker@3.0.3/node_modules/estree-walker/src/index.js
function walk(ast, { enter, leave }) {
  const instance = new SyncWalker(enter, leave);
  return instance.visit(ast, null);
}

// lib/rollup-plugin-unwind-css-module-class-name.ts
function isFalsyIdentifier(identifier) {
  return identifier.name === "undefined" || identifier.name === "NaN";
}
function normalizeClassWalker(tree) {
  if (tree.type === "Identifier")
    return isFalsyIdentifier(tree) ? "" : null;
  if (tree.type === "Literal")
    return typeof tree.value === "string" ? tree.value : "";
  if (tree.type === "BinaryExpression") {
    if (tree.operator !== "+")
      return null;
    const left = normalizeClassWalker(tree.left);
    const right = normalizeClassWalker(tree.right);
    if (left === null || right === null)
      return null;
    return `${left}${right}`;
  }
  if (tree.type === "TemplateLiteral") {
    if (tree.expressions.some((x) => x.type !== "Literal" && (x.type !== "Identifier" || !isFalsyIdentifier(x))))
      return null;
    return tree.quasis.reduce((a, c, i) => {
      const v = i === tree.quasis.length - 1 ? "" : tree.expressions[i].value;
      return a + c.value.raw + (typeof v === "string" ? v : "");
    }, "");
  }
  if (tree.type === "ArrayExpression") {
    const values = tree.elements.map((treeNode) => {
      if (treeNode === null)
        return "";
      if (treeNode.type === "SpreadElement")
        return normalizeClassWalker(treeNode.argument);
      return normalizeClassWalker(treeNode);
    });
    if (values.some((x) => x === null))
      return null;
    return values.join(" ");
  }
  if (tree.type === "ObjectExpression") {
    const values = tree.properties.map((treeNode) => {
      if (treeNode.type === "SpreadElement")
        return normalizeClassWalker(treeNode.argument);
      let x = treeNode.value;
      let inveted = false;
      while (x.type === "UnaryExpression" && x.operator === "!") {
        x = x.argument;
        inveted = !inveted;
      }
      if (x.type === "Literal") {
        if (inveted === !x.value) {
          return treeNode.key.type === "Identifier" ? treeNode.computed ? null : treeNode.key.name : treeNode.key.type === "Literal" ? treeNode.key.value : "";
        } else {
          return "";
        }
      }
      if (x.type === "Identifier") {
        if (inveted !== isFalsyIdentifier(x)) {
          return "";
        } else {
          return null;
        }
      }
      return null;
    });
    if (values.some((x) => x === null))
      return null;
    return values.join(" ");
  }
  console.error(`Unexpected node type: ${tree.type}`);
  return null;
}
function normalizeClass(tree) {
  const walked = normalizeClassWalker(tree);
  return walked && walked.replace(/^\s+|\s+(?=\s)|\s+$/g, "");
}
function unwindCssModuleClassName(ast) {
  walk(ast, {
    enter(node, parent) {
      var _a, _b, _c, _d;
      if ((parent == null ? void 0 : parent.type) !== "Program")
        return;
      if (node.type !== "VariableDeclaration")
        return;
      if (node.declarations.length !== 1)
        return;
      if (node.declarations[0].id.type !== "Identifier")
        return;
      const name = node.declarations[0].id.name;
      if (((_a = node.declarations[0].init) == null ? void 0 : _a.type) !== "CallExpression")
        return;
      if (node.declarations[0].init.callee.type !== "Identifier")
        return;
      if (node.declarations[0].init.callee.name !== "_export_sfc")
        return;
      if (node.declarations[0].init.arguments.length !== 2)
        return;
      if (node.declarations[0].init.arguments[0].type !== "Identifier")
        return;
      const ident = node.declarations[0].init.arguments[0].name;
      if (!ident.startsWith("_sfc_main"))
        return;
      if (node.declarations[0].init.arguments[1].type !== "ArrayExpression")
        return;
      if (node.declarations[0].init.arguments[1].elements.length === 0)
        return;
      const __cssModulesIndex = node.declarations[0].init.arguments[1].elements.findIndex((x) => {
        var _a2, _b2;
        if ((x == null ? void 0 : x.type) !== "ArrayExpression")
          return false;
        if (x.elements.length !== 2)
          return false;
        if (((_a2 = x.elements[0]) == null ? void 0 : _a2.type) !== "Literal")
          return false;
        if (x.elements[0].value !== "__cssModules")
          return false;
        if (((_b2 = x.elements[1]) == null ? void 0 : _b2.type) !== "Identifier")
          return false;
        return true;
      });
      if (!~__cssModulesIndex)
        return;
      const cssModuleForestName = node.declarations[0].init.arguments[1].elements[__cssModulesIndex].elements[1].name;
      const cssModuleForestNode = parent.body.find((x) => {
        var _a2;
        if (x.type !== "VariableDeclaration")
          return false;
        if (x.declarations.length !== 1)
          return false;
        if (x.declarations[0].id.type !== "Identifier")
          return false;
        if (x.declarations[0].id.name !== cssModuleForestName)
          return false;
        if (((_a2 = x.declarations[0].init) == null ? void 0 : _a2.type) !== "ObjectExpression")
          return false;
        return true;
      });
      const moduleForest = new Map(cssModuleForestNode.declarations[0].init.properties.flatMap((property) => {
        if (property.type !== "Property")
          return [];
        if (property.key.type !== "Literal")
          return [];
        if (property.value.type !== "Identifier")
          return [];
        return [[property.key.value, property.value.name]];
      }));
      const sfcMain = parent.body.find((x) => {
        if (x.type !== "VariableDeclaration")
          return false;
        if (x.declarations.length !== 1)
          return false;
        if (x.declarations[0].id.type !== "Identifier")
          return false;
        if (x.declarations[0].id.name !== ident)
          return false;
        return true;
      });
      if (((_b = sfcMain.declarations[0].init) == null ? void 0 : _b.type) !== "CallExpression")
        return;
      if (sfcMain.declarations[0].init.callee.type !== "Identifier")
        return;
      if (sfcMain.declarations[0].init.callee.name !== "defineComponent")
        return;
      if (sfcMain.declarations[0].init.arguments.length !== 1)
        return;
      if (sfcMain.declarations[0].init.arguments[0].type !== "ObjectExpression")
        return;
      const setup = sfcMain.declarations[0].init.arguments[0].properties.find((x) => {
        if (x.type !== "Property")
          return false;
        if (x.key.type !== "Identifier")
          return false;
        if (x.key.name !== "setup")
          return false;
        return true;
      });
      if (setup.value.type !== "FunctionExpression")
        return;
      const render = setup.value.body.body.find((x) => {
        if (x.type !== "ReturnStatement")
          return false;
        return true;
      });
      if (((_c = render.argument) == null ? void 0 : _c.type) !== "ArrowFunctionExpression")
        return;
      if (render.argument.params.length !== 2)
        return;
      const ctx = render.argument.params[0];
      if (ctx.type !== "Identifier")
        return;
      if (ctx.name !== "_ctx")
        return;
      if (render.argument.body.type !== "BlockStatement")
        return;
      for (const [key, value] of moduleForest) {
        const cssModuleTreeNode = parent.body.find((x) => {
          if (x.type !== "VariableDeclaration")
            return false;
          if (x.declarations.length !== 1)
            return false;
          if (x.declarations[0].id.type !== "Identifier")
            return false;
          if (x.declarations[0].id.name !== value)
            return false;
          return true;
        });
        if (((_d = cssModuleTreeNode.declarations[0].init) == null ? void 0 : _d.type) !== "ObjectExpression")
          return;
        const moduleTree = new Map(cssModuleTreeNode.declarations[0].init.properties.flatMap((property) => {
          var _a2;
          if (property.type !== "Property")
            return [];
          const actualKey = property.key.type === "Identifier" ? property.key.name : property.key.type === "Literal" ? property.key.value : null;
          if (typeof actualKey !== "string")
            return [];
          if (property.value.type === "Literal")
            return [[actualKey, property.value.value]];
          if (property.value.type !== "Identifier")
            return [];
          const labelledValue = property.value.name;
          const actualValue = parent.body.find((x) => {
            if (x.type !== "VariableDeclaration")
              return false;
            if (x.declarations.length !== 1)
              return false;
            if (x.declarations[0].id.type !== "Identifier")
              return false;
            if (x.declarations[0].id.name !== labelledValue)
              return false;
            return true;
          });
          if (((_a2 = actualValue.declarations[0].init) == null ? void 0 : _a2.type) !== "Literal")
            return [];
          return [[actualKey, actualValue.declarations[0].init.value]];
        }));
        walk(render.argument.body, {
          enter(childNode) {
            if (childNode.type !== "MemberExpression")
              return;
            if (childNode.object.type !== "MemberExpression")
              return;
            if (childNode.object.object.type !== "Identifier")
              return;
            if (childNode.object.object.name !== ctx.name)
              return;
            if (childNode.object.property.type !== "Identifier")
              return;
            if (childNode.object.property.name !== key)
              return;
            if (childNode.property.type !== "Identifier")
              return;
            const actualValue = moduleTree.get(childNode.property.name);
            if (actualValue === void 0)
              return;
            this.replace({
              type: "Literal",
              value: actualValue
            });
          }
        });
        walk(render.argument.body, {
          enter(childNode) {
            if (childNode.type !== "MemberExpression")
              return;
            if (childNode.object.type !== "MemberExpression")
              return;
            if (childNode.object.object.type !== "Identifier")
              return;
            if (childNode.object.object.name !== ctx.name)
              return;
            if (childNode.object.property.type !== "Identifier")
              return;
            if (childNode.object.property.name !== key)
              return;
            if (childNode.property.type !== "Identifier")
              return;
            console.error(`Undefined style detected: ${key}.${childNode.property.name} (in ${name})`);
            this.replace({
              type: "Identifier",
              name: "undefined"
            });
          }
        });
        walk(render.argument.body, {
          enter(childNode) {
            if (childNode.type !== "CallExpression")
              return;
            if (childNode.callee.type !== "Identifier")
              return;
            if (childNode.callee.name !== "normalizeClass")
              return;
            if (childNode.arguments.length !== 1)
              return;
            const normalized = normalizeClass(childNode.arguments[0]);
            if (normalized === null)
              return;
            this.replace({
              type: "Literal",
              value: normalized
            });
          }
        });
      }
      if (node.declarations[0].init.arguments[1].elements.length === 1) {
        this.replace({
          type: "VariableDeclaration",
          declarations: [{
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: node.declarations[0].id.name
            },
            init: {
              type: "Identifier",
              name: ident
            }
          }],
          kind: "const"
        });
      } else {
        this.replace({
          type: "VariableDeclaration",
          declarations: [{
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: node.declarations[0].id.name
            },
            init: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "_export_sfc"
              },
              arguments: [{
                type: "Identifier",
                name: ident
              }, {
                type: "ArrayExpression",
                elements: node.declarations[0].init.arguments[1].elements.slice(0, __cssModulesIndex).concat(node.declarations[0].init.arguments[1].elements.slice(__cssModulesIndex + 1))
              }]
            }
          }],
          kind: "const"
        });
      }
    }
  });
}
function pluginUnwindCssModuleClassName() {
  return {
    name: "UnwindCssModuleClassName",
    renderChunk(code) {
      const ast = this.parse(code);
      unwindCssModuleClassName(ast);
      return { code: generate(ast) };
    }
  };
}

// vite.json5.ts
import JSON5 from "file:///home/misskey/misskey/node_modules/.pnpm/json5@2.2.3/node_modules/json5/lib/index.js";
import { createFilter, dataToEsm } from "file:///home/misskey/misskey/node_modules/.pnpm/@rollup+pluginutils@5.0.2_rollup@3.26.3/node_modules/@rollup/pluginutils/dist/es/index.js";
function json5(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const indent = "indent" in options ? options.indent : "	";
  return {
    name: "json5",
    // eslint-disable-next-line no-shadow
    transform(json, id) {
      if (id.slice(-6) !== ".json5" || !filter(id))
        return null;
      try {
        const parsed = JSON5.parse(json);
        return {
          code: dataToEsm(parsed, {
            preferConst: options.preferConst,
            compact: options.compact,
            namedExports: options.namedExports,
            indent
          }),
          map: { mappings: "" }
        };
      } catch (err) {
        if (!(err instanceof SyntaxError)) {
          throw err;
        }
        const message = "Could not parse JSON5 file";
        const { lineNumber, columnNumber } = err;
        this.warn({ message, id, loc: { line: lineNumber, column: columnNumber } });
        return null;
      }
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname = "/home/misskey/misskey/packages/frontend";
var extensions = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".json5", ".svg", ".sass", ".scss", ".css", ".vue"];
var hash = (str, seed = 0) => {
  let h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
var BASE62_DIGITS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function toBase62(n) {
  if (n === 0) {
    return "0";
  }
  let result = "";
  while (n > 0) {
    result = BASE62_DIGITS[n % BASE62_DIGITS.length] + result;
    n = Math.floor(n / BASE62_DIGITS.length);
  }
  return result;
}
function getConfig() {
  return {
    base: "/vite/",
    server: {
      port: 5173
    },
    plugins: [
      pluginVue({
        reactivityTransform: true
      }),
      ReactivityTransform(),
      pluginUnwindCssModuleClassName(),
      json5(),
      ...process.env.NODE_ENV === "production" ? [
        pluginReplace({
          preventAssignment: true,
          values: {
            "isChromatic()": JSON.stringify(false)
          }
        })
      ] : []
    ],
    resolve: {
      extensions,
      alias: {
        "@/": __vite_injected_original_dirname + "/src/",
        "/client-assets/": __vite_injected_original_dirname + "/assets/",
        "/static-assets/": __vite_injected_original_dirname + "/../backend/assets/",
        "/fluent-emojis/": __vite_injected_original_dirname + "/../../fluent-emojis/dist/",
        "/fluent-emoji/": __vite_injected_original_dirname + "/../../fluent-emojis/dist/"
      }
    },
    css: {
      modules: {
        generateScopedName(name, filename, _css) {
          const id = (path.relative(__vite_injected_original_dirname, filename.split("?")[0]) + "-" + name).replace(/[\\\/\.\?&=]/g, "-").replace(/(src-|vue-)/g, "");
          if (process.env.NODE_ENV === "production") {
            return "x" + toBase62(hash(id)).substring(0, 4);
          } else {
            return id;
          }
        }
      }
    },
    define: {
      _VERSION_: JSON.stringify(package_default.version),
      _LANGS_: JSON.stringify(Object.entries(locales_default).map(([k, v]) => [k, v._lang_])),
      _ENV_: JSON.stringify(process.env.NODE_ENV),
      _DEV_: process.env.NODE_ENV !== "production",
      _PERF_PREFIX_: JSON.stringify("Misskey:"),
      _DATA_TRANSFER_DRIVE_FILE_: JSON.stringify("mk_drive_file"),
      _DATA_TRANSFER_DRIVE_FOLDER_: JSON.stringify("mk_drive_folder"),
      _DATA_TRANSFER_DECK_COLUMN_: JSON.stringify("mk_deck_column"),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    },
    // https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
    optimizeDeps: {
      include: ["misskey-js"]
    },
    build: {
      target: [
        "chrome116",
        "firefox116",
        "safari16"
      ],
      manifest: "manifest.json",
      rollupOptions: {
        input: {
          app: "./src/_boot_.ts"
        },
        output: {
          manualChunks: {
            vue: ["vue"],
            photoswipe: ["photoswipe", "photoswipe/lightbox", "photoswipe/style.css"]
          },
          chunkFileNames: process.env.NODE_ENV === "production" ? "[hash:8].js" : "[name]-[hash:8].js",
          assetFileNames: process.env.NODE_ENV === "production" ? "[hash:8][extname]" : "[name]-[hash:8][extname]"
        }
      },
      cssCodeSplit: true,
      outDir: __vite_injected_original_dirname + "/../../built/_vite_",
      assetsDir: ".",
      emptyOutDir: false,
      sourcemap: process.env.NODE_ENV === "development",
      reportCompressedSize: false,
      // https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
      commonjsOptions: {
        include: [/misskey-js/, /node_modules/]
      }
    },
    worker: {
      format: "es"
    },
    test: {
      environment: "happy-dom",
      deps: {
        inline: [
          // XXX: misskey-dev/browser-image-resizer has no "type": "module"
          "browser-image-resizer"
        ]
      }
    }
  };
}
var config = defineConfig(({ command, mode }) => getConfig());
var vite_config_default = config;
export {
  vite_config_default as default,
  getConfig
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vLi4vbG9jYWxlcy9pbmRleC5qcyIsICIuLi8uLi9wYWNrYWdlLmpzb24iLCAibGliL3JvbGx1cC1wbHVnaW4tdW53aW5kLWNzcy1tb2R1bGUtY2xhc3MtbmFtZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvd2Fsa2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9zeW5jLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9pbmRleC5qcyIsICJ2aXRlLmpzb241LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvcGFja2FnZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcGx1Z2luUmVwbGFjZSBmcm9tICdAcm9sbHVwL3BsdWdpbi1yZXBsYWNlJztcbmltcG9ydCBwbHVnaW5WdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB7IHR5cGUgVXNlckNvbmZpZywgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG4vLyBAdHMtZXhwZWN0LWVycm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zeHp6L3VucGx1Z2luLXZ1ZS1tYWNyb3MvaXNzdWVzLzI1NyNpc3N1ZWNvbW1lbnQtMTQxMDc1Mjg5MFxuaW1wb3J0IFJlYWN0aXZpdHlUcmFuc2Zvcm0gZnJvbSAnQHZ1ZS1tYWNyb3MvcmVhY3Rpdml0eS10cmFuc2Zvcm0vdml0ZSc7XG5cbmltcG9ydCBsb2NhbGVzIGZyb20gJy4uLy4uL2xvY2FsZXMnO1xuaW1wb3J0IG1ldGEgZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBwbHVnaW5VbndpbmRDc3NNb2R1bGVDbGFzc05hbWUgZnJvbSAnLi9saWIvcm9sbHVwLXBsdWdpbi11bndpbmQtY3NzLW1vZHVsZS1jbGFzcy1uYW1lJztcbmltcG9ydCBwbHVnaW5Kc29uNSBmcm9tICcuL3ZpdGUuanNvbjUnO1xuXG5jb25zdCBleHRlbnNpb25zID0gWycudHMnLCAnLnRzeCcsICcuanMnLCAnLmpzeCcsICcubWpzJywgJy5qc29uJywgJy5qc29uNScsICcuc3ZnJywgJy5zYXNzJywgJy5zY3NzJywgJy5jc3MnLCAnLnZ1ZSddO1xuXG5jb25zdCBoYXNoID0gKHN0cjogc3RyaW5nLCBzZWVkID0gMCk6IG51bWJlciA9PiB7XG5cdGxldCBoMSA9IDB4ZGVhZGJlZWYgXiBzZWVkLFxuXHRcdGgyID0gMHg0MWM2Y2U1NyBeIHNlZWQ7XG5cdGZvciAobGV0IGkgPSAwLCBjaDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuXHRcdGNoID0gc3RyLmNoYXJDb2RlQXQoaSk7XG5cdFx0aDEgPSBNYXRoLmltdWwoaDEgXiBjaCwgMjY1NDQzNTc2MSk7XG5cdFx0aDIgPSBNYXRoLmltdWwoaDIgXiBjaCwgMTU5NzMzNDY3Nyk7XG5cdH1cblxuXHRoMSA9IE1hdGguaW11bChoMSBeIChoMSA+Pj4gMTYpLCAyMjQ2ODIyNTA3KSBeIE1hdGguaW11bChoMiBeIChoMiA+Pj4gMTMpLCAzMjY2NDg5OTA5KTtcblx0aDIgPSBNYXRoLmltdWwoaDIgXiAoaDIgPj4+IDE2KSwgMjI0NjgyMjUwNykgXiBNYXRoLmltdWwoaDEgXiAoaDEgPj4+IDEzKSwgMzI2NjQ4OTkwOSk7XG5cblx0cmV0dXJuIDQyOTQ5NjcyOTYgKiAoMjA5NzE1MSAmIGgyKSArIChoMSA+Pj4gMCk7XG59O1xuXG5jb25zdCBCQVNFNjJfRElHSVRTID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbmZ1bmN0aW9uIHRvQmFzZTYyKG46IG51bWJlcik6IHN0cmluZyB7XG5cdGlmIChuID09PSAwKSB7XG5cdFx0cmV0dXJuICcwJztcblx0fVxuXHRsZXQgcmVzdWx0ID0gJyc7XG5cdHdoaWxlIChuID4gMCkge1xuXHRcdHJlc3VsdCA9IEJBU0U2Ml9ESUdJVFNbbiAlIEJBU0U2Ml9ESUdJVFMubGVuZ3RoXSArIHJlc3VsdDtcblx0XHRuID0gTWF0aC5mbG9vcihuIC8gQkFTRTYyX0RJR0lUUy5sZW5ndGgpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZygpOiBVc2VyQ29uZmlnIHtcblx0cmV0dXJuIHtcblx0XHRiYXNlOiAnL3ZpdGUvJyxcblxuXHRcdHNlcnZlcjoge1xuXHRcdFx0cG9ydDogNTE3Myxcblx0XHR9LFxuXG5cdFx0cGx1Z2luczogW1xuXHRcdFx0cGx1Z2luVnVlKHtcblx0XHRcdFx0cmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcblx0XHRcdH0pLFxuXHRcdFx0UmVhY3Rpdml0eVRyYW5zZm9ybSgpLFxuXHRcdFx0cGx1Z2luVW53aW5kQ3NzTW9kdWxlQ2xhc3NOYW1lKCksXG5cdFx0XHRwbHVnaW5Kc29uNSgpLFxuXHRcdFx0Li4ucHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuXHRcdFx0XHQ/IFtcblx0XHRcdFx0XHRwbHVnaW5SZXBsYWNlKHtcblx0XHRcdFx0XHRcdHByZXZlbnRBc3NpZ25tZW50OiB0cnVlLFxuXHRcdFx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0XHRcdCdpc0Nocm9tYXRpYygpJzogSlNPTi5zdHJpbmdpZnkoZmFsc2UpLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XVxuXHRcdFx0XHQ6IFtdLFxuXHRcdF0sXG5cblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRleHRlbnNpb25zLFxuXHRcdFx0YWxpYXM6IHtcblx0XHRcdFx0J0AvJzogX19kaXJuYW1lICsgJy9zcmMvJyxcblx0XHRcdFx0Jy9jbGllbnQtYXNzZXRzLyc6IF9fZGlybmFtZSArICcvYXNzZXRzLycsXG5cdFx0XHRcdCcvc3RhdGljLWFzc2V0cy8nOiBfX2Rpcm5hbWUgKyAnLy4uL2JhY2tlbmQvYXNzZXRzLycsXG5cdFx0XHRcdCcvZmx1ZW50LWVtb2ppcy8nOiBfX2Rpcm5hbWUgKyAnLy4uLy4uL2ZsdWVudC1lbW9qaXMvZGlzdC8nLFxuXHRcdFx0XHQnL2ZsdWVudC1lbW9qaS8nOiBfX2Rpcm5hbWUgKyAnLy4uLy4uL2ZsdWVudC1lbW9qaXMvZGlzdC8nLFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0Y3NzOiB7XG5cdFx0XHRtb2R1bGVzOiB7XG5cdFx0XHRcdGdlbmVyYXRlU2NvcGVkTmFtZShuYW1lLCBmaWxlbmFtZSwgX2Nzcyk6IHN0cmluZyB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSAocGF0aC5yZWxhdGl2ZShfX2Rpcm5hbWUsIGZpbGVuYW1lLnNwbGl0KCc/JylbMF0pICsgJy0nICsgbmFtZSkucmVwbGFjZSgvW1xcXFxcXC9cXC5cXD8mPV0vZywgJy0nKS5yZXBsYWNlKC8oc3JjLXx2dWUtKS9nLCAnJyk7XG5cdFx0XHRcdFx0aWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAneCcgKyB0b0Jhc2U2MihoYXNoKGlkKSkuc3Vic3RyaW5nKDAsIDQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0ZGVmaW5lOiB7XG5cdFx0XHRfVkVSU0lPTl86IEpTT04uc3RyaW5naWZ5KG1ldGEudmVyc2lvbiksXG5cdFx0XHRfTEFOR1NfOiBKU09OLnN0cmluZ2lmeShPYmplY3QuZW50cmllcyhsb2NhbGVzKS5tYXAoKFtrLCB2XSkgPT4gW2ssIHYuX2xhbmdfXSkpLFxuXHRcdFx0X0VOVl86IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lk5PREVfRU5WKSxcblx0XHRcdF9ERVZfOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXHRcdFx0X1BFUkZfUFJFRklYXzogSlNPTi5zdHJpbmdpZnkoJ01pc3NrZXk6JyksXG5cdFx0XHRfREFUQV9UUkFOU0ZFUl9EUklWRV9GSUxFXzogSlNPTi5zdHJpbmdpZnkoJ21rX2RyaXZlX2ZpbGUnKSxcblx0XHRcdF9EQVRBX1RSQU5TRkVSX0RSSVZFX0ZPTERFUl86IEpTT04uc3RyaW5naWZ5KCdta19kcml2ZV9mb2xkZXInKSxcblx0XHRcdF9EQVRBX1RSQU5TRkVSX0RFQ0tfQ09MVU1OXzogSlNPTi5zdHJpbmdpZnkoJ21rX2RlY2tfY29sdW1uJyksXG5cdFx0XHRfX1ZVRV9PUFRJT05TX0FQSV9fOiB0cnVlLFxuXHRcdFx0X19WVUVfUFJPRF9ERVZUT09MU19fOiBmYWxzZSxcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2RlcC1wcmUtYnVuZGxpbmcuaHRtbCNtb25vcmVwb3MtYW5kLWxpbmtlZC1kZXBlbmRlbmNpZXNcblx0XHRvcHRpbWl6ZURlcHM6IHtcblx0XHRcdGluY2x1ZGU6IFsnbWlzc2tleS1qcyddLFxuXHRcdH0sXG5cblx0XHRidWlsZDoge1xuXHRcdFx0dGFyZ2V0OiBbXG5cdFx0XHRcdCdjaHJvbWUxMTYnLFxuXHRcdFx0XHQnZmlyZWZveDExNicsXG5cdFx0XHRcdCdzYWZhcmkxNicsXG5cdFx0XHRdLFxuXHRcdFx0bWFuaWZlc3Q6ICdtYW5pZmVzdC5qc29uJyxcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0aW5wdXQ6IHtcblx0XHRcdFx0XHRhcHA6ICcuL3NyYy9fYm9vdF8udHMnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvdXRwdXQ6IHtcblx0XHRcdFx0XHRtYW51YWxDaHVua3M6IHtcblx0XHRcdFx0XHRcdHZ1ZTogWyd2dWUnXSxcblx0XHRcdFx0XHRcdHBob3Rvc3dpcGU6IFsncGhvdG9zd2lwZScsICdwaG90b3N3aXBlL2xpZ2h0Ym94JywgJ3Bob3Rvc3dpcGUvc3R5bGUuY3NzJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRjaHVua0ZpbGVOYW1lczogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICdbaGFzaDo4XS5qcycgOiAnW25hbWVdLVtoYXNoOjhdLmpzJyxcblx0XHRcdFx0XHRhc3NldEZpbGVOYW1lczogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICdbaGFzaDo4XVtleHRuYW1lXScgOiAnW25hbWVdLVtoYXNoOjhdW2V4dG5hbWVdJyxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHRjc3NDb2RlU3BsaXQ6IHRydWUsXG5cdFx0XHRvdXREaXI6IF9fZGlybmFtZSArICcvLi4vLi4vYnVpbHQvX3ZpdGVfJyxcblx0XHRcdGFzc2V0c0RpcjogJy4nLFxuXHRcdFx0ZW1wdHlPdXREaXI6IGZhbHNlLFxuXHRcdFx0c291cmNlbWFwOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyxcblx0XHRcdHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcblxuXHRcdFx0Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2RlcC1wcmUtYnVuZGxpbmcuaHRtbCNtb25vcmVwb3MtYW5kLWxpbmtlZC1kZXBlbmRlbmNpZXNcblx0XHRcdGNvbW1vbmpzT3B0aW9uczoge1xuXHRcdFx0XHRpbmNsdWRlOiBbL21pc3NrZXktanMvLCAvbm9kZV9tb2R1bGVzL10sXG5cdFx0XHR9LFxuXHRcdH0sXG5cblx0XHR3b3JrZXI6IHtcblx0XHRcdGZvcm1hdDogJ2VzJyxcblx0XHR9LFxuXG5cdFx0dGVzdDoge1xuXHRcdFx0ZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxuXHRcdFx0ZGVwczoge1xuXHRcdFx0XHRpbmxpbmU6IFtcblx0XHRcdFx0XHQvLyBYWFg6IG1pc3NrZXktZGV2L2Jyb3dzZXItaW1hZ2UtcmVzaXplciBoYXMgbm8gXCJ0eXBlXCI6IFwibW9kdWxlXCJcblx0XHRcdFx0XHQnYnJvd3Nlci1pbWFnZS1yZXNpemVyJyxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgY29uZmlnID0gZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4gZ2V0Q29uZmlnKCkpO1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9sb2NhbGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvbG9jYWxlcy9pbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9taXNza2V5L21pc3NrZXkvbG9jYWxlcy9pbmRleC5qc1wiOy8qKlxuICogTGFuZ3VhZ2VzIExvYWRlclxuICovXG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0ICogYXMgeWFtbCBmcm9tICdqcy15YW1sJztcblxuY29uc3QgbWVyZ2UgPSAoLi4uYXJncykgPT4gYXJncy5yZWR1Y2UoKGEsIGMpID0+ICh7XG5cdC4uLmEsXG5cdC4uLmMsXG5cdC4uLk9iamVjdC5lbnRyaWVzKGEpXG5cdFx0LmZpbHRlcigoW2tdKSA9PiBjICYmIHR5cGVvZiBjW2tdID09PSAnb2JqZWN0Jylcblx0XHQucmVkdWNlKChhLCBbaywgdl0pID0+IChhW2tdID0gbWVyZ2UodiwgY1trXSksIGEpLCB7fSlcbn0pLCB7fSk7XG5cbmNvbnN0IGxhbmd1YWdlcyA9IFtcblx0J2FyLVNBJyxcblx0J2NzLUNaJyxcblx0J2RhLURLJyxcblx0J2RlLURFJyxcblx0J2VuLVVTJyxcblx0J2VzLUVTJyxcblx0J2ZyLUZSJyxcblx0J2lkLUlEJyxcblx0J2l0LUlUJyxcblx0J2phLUpQJyxcblx0J2phLUtTJyxcblx0J2thYi1LQUInLFxuXHQna24tSU4nLFxuXHQna28tS1InLFxuXHQnbmwtTkwnLFxuXHQnbm8tTk8nLFxuXHQncGwtUEwnLFxuXHQncHQtUFQnLFxuXHQncnUtUlUnLFxuXHQnc2stU0snLFxuXHQndGgtVEgnLFxuXHQndWctQ04nLFxuXHQndWstVUEnLFxuXHQndmktVk4nLFxuXHQnemgtQ04nLFxuXHQnemgtVFcnLFxuXTtcblxuY29uc3QgcHJpbWFyaWVzID0ge1xuXHQnZW4nOiAnVVMnLFxuXHQnamEnOiAnSlAnLFxuXHQnemgnOiAnQ04nLFxufTtcblxuLy8gXHU0RjU1XHU2NTQ1XHUzMDRCXHU2NTg3XHU1QjU3XHU1MjE3XHUzMDZCXHUzMEQwXHUzMEMzXHUzMEFGXHUzMEI5XHUzMERBXHUzMEZDXHUzMEI5XHU2NTg3XHU1QjU3XHUzMDRDXHU2REY3XHU1MTY1XHUzMDU5XHUzMDhCXHUzMDUzXHUzMDY4XHUzMDRDXHUzMDQyXHUzMDhBXHUzMDAxWUFNTFx1MzA0Q1x1NThDQVx1MzA4Q1x1MzA4Qlx1MzA2RVx1MzA2N1x1NTNENlx1MzA4QVx1OTY2NFx1MzA0RlxuY29uc3QgY2xlYW4gPSAodGV4dCkgPT4gdGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAoU3RyaW5nLmZyb21Db2RlUG9pbnQoMHgwOCksICdnJyksICcnKTtcblxuY29uc3QgbG9jYWxlcyA9IGxhbmd1YWdlcy5yZWR1Y2UoKGEsIGMpID0+IChhW2NdID0geWFtbC5sb2FkKGNsZWFuKGZzLnJlYWRGaWxlU3luYyhuZXcgVVJMKGAke2N9LnltbGAsIGltcG9ydC5tZXRhLnVybCksICd1dGYtOCcpKSkgfHwge30sIGEpLCB7fSk7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5lbnRyaWVzKGxvY2FsZXMpXG5cdC5yZWR1Y2UoKGEsIFtrICx2XSkgPT4gKGFba10gPSAoKCkgPT4ge1xuXHRcdGNvbnN0IFtsYW5nXSA9IGsuc3BsaXQoJy0nKTtcblx0XHRzd2l0Y2ggKGspIHtcblx0XHRcdGNhc2UgJ2phLUpQJzogcmV0dXJuIHY7XG5cdFx0XHRjYXNlICdqYS1LUyc6XG5cdFx0XHRjYXNlICdlbi1VUyc6IHJldHVybiBtZXJnZShsb2NhbGVzWydqYS1KUCddLCB2KTtcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBtZXJnZShcblx0XHRcdFx0bG9jYWxlc1snamEtSlAnXSxcblx0XHRcdFx0bG9jYWxlc1snZW4tVVMnXSxcblx0XHRcdFx0bG9jYWxlc1tgJHtsYW5nfS0ke3ByaW1hcmllc1tsYW5nXX1gXSB8fCB7fSxcblx0XHRcdFx0dlxuXHRcdFx0KTtcblx0XHR9XG5cdH0pKCksIGEpLCB7fSk7XG4iLCAie1xuXHRcIm5hbWVcIjogXCJtaXNza2V5XCIsXG5cdFwidmVyc2lvblwiOiBcIjIwMjMuOS4xLTlpbmUtNC4wLjBcIixcblx0XCJjb2RlbmFtZVwiOiBcIktBR1VZQVwiLFxuXHRcInJlcG9zaXRvcnlcIjoge1xuXHRcdFwidHlwZVwiOiBcImdpdFwiLFxuXHRcdFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tLzlpbmV2ZXJzZS1kZXYvVHlwZS05aW5lLmdpdFwiXG5cdH0sXG5cdFwicGFja2FnZU1hbmFnZXJcIjogXCJwbnBtQDguNy42XCIsXG5cdFwid29ya3NwYWNlc1wiOiBbXG5cdFx0XCJwYWNrYWdlcy9mcm9udGVuZFwiLFxuXHRcdFwicGFja2FnZXMvYmFja2VuZFwiLFxuXHRcdFwicGFja2FnZXMvc3dcIlxuXHRdLFxuXHRcInByaXZhdGVcIjogdHJ1ZSxcblx0XCJzY3JpcHRzXCI6IHtcblx0XHRcImJ1aWxkLXByZVwiOiBcIm5vZGUgLi9zY3JpcHRzL2J1aWxkLXByZS5qc1wiLFxuXHRcdFwiYnVpbGQtYXNzZXRzXCI6IFwibm9kZSAuL3NjcmlwdHMvYnVpbGQtYXNzZXRzLm1qc1wiLFxuXHRcdFwiYnVpbGRcIjogXCJwbnBtIGJ1aWxkLXByZSAmJiBwbnBtIC1yIGJ1aWxkICYmIHBucG0gYnVpbGQtYXNzZXRzXCIsXG5cdFx0XCJidWlsZC1zdG9yeWJvb2tcIjogXCJwbnBtIC0tZmlsdGVyIGZyb250ZW5kIGJ1aWxkLXN0b3J5Ym9va1wiLFxuXHRcdFwic3RhcnRcIjogXCJwbnBtIGNoZWNrOmNvbm5lY3QgJiYgY2QgcGFja2FnZXMvYmFja2VuZCAmJiBub2RlIC4vYnVpbHQvYm9vdC9lbnRyeS5qc1wiLFxuXHRcdFwic3RhcnQ6dGVzdFwiOiBcImNkIHBhY2thZ2VzL2JhY2tlbmQgJiYgY3Jvc3MtZW52IE5PREVfRU5WPXRlc3Qgbm9kZSAuL2J1aWx0L2Jvb3QvZW50cnkuanNcIixcblx0XHRcImluaXRcIjogXCJwbnBtIG1pZ3JhdGVcIixcblx0XHRcIm1pZ3JhdGVcIjogXCJjZCBwYWNrYWdlcy9iYWNrZW5kICYmIHBucG0gbWlncmF0ZVwiLFxuXHRcdFwiY2hlY2s6Y29ubmVjdFwiOiBcImNkIHBhY2thZ2VzL2JhY2tlbmQgJiYgcG5wbSBjaGVjazpjb25uZWN0XCIsXG5cdFx0XCJtaWdyYXRlYW5kc3RhcnRcIjogXCJwbnBtIG1pZ3JhdGUgJiYgcG5wbSBzdGFydFwiLFxuXHRcdFwid2F0Y2hcIjogXCJwbnBtIGRldlwiLFxuXHRcdFwiZGV2XCI6IFwibm9kZSAuL3NjcmlwdHMvZGV2Lm1qc1wiLFxuXHRcdFwibGludFwiOiBcInBucG0gLXIgbGludFwiLFxuXHRcdFwiY3k6b3BlblwiOiBcInBucG0gY3lwcmVzcyBvcGVuIC0tYnJvd3NlciAtLWUyZSAtLWNvbmZpZy1maWxlPWN5cHJlc3MuY29uZmlnLnRzXCIsXG5cdFx0XCJjeTpydW5cIjogXCJwbnBtIGN5cHJlc3MgcnVuXCIsXG5cdFx0XCJlMmVcIjogXCJwbnBtIHN0YXJ0LXNlcnZlci1hbmQtdGVzdCBzdGFydDp0ZXN0IGh0dHA6Ly9sb2NhbGhvc3Q6NjE4MTIgY3k6cnVuXCIsXG5cdFx0XCJqZXN0XCI6IFwiY2QgcGFja2FnZXMvYmFja2VuZCAmJiBwbnBtIGplc3RcIixcblx0XHRcImplc3QtYW5kLWNvdmVyYWdlXCI6IFwiY2QgcGFja2FnZXMvYmFja2VuZCAmJiBwbnBtIGplc3QtYW5kLWNvdmVyYWdlXCIsXG5cdFx0XCJ0ZXN0XCI6IFwicG5wbSAtciB0ZXN0XCIsXG5cdFx0XCJ0ZXN0LWFuZC1jb3ZlcmFnZVwiOiBcInBucG0gLXIgdGVzdC1hbmQtY292ZXJhZ2VcIixcblx0XHRcImNsZWFuXCI6IFwibm9kZSAuL3NjcmlwdHMvY2xlYW4uanNcIixcblx0XHRcImNsZWFuLWFsbFwiOiBcIm5vZGUgLi9zY3JpcHRzL2NsZWFuLWFsbC5qc1wiLFxuXHRcdFwiY2xlYW5hbGxcIjogXCJwbnBtIGNsZWFuLWFsbFwiXG5cdH0sXG5cdFwicmVzb2x1dGlvbnNcIjoge1xuXHRcdFwiY2hva2lkYXJcIjogXCIzLjUuM1wiLFxuXHRcdFwibG9kYXNoXCI6IFwiNC4xNy4yMVwiXG5cdH0sXG5cdFwiZGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcImV4ZWNhXCI6IFwiOC4wLjFcIixcblx0XHRcImNzc25hbm9cIjogXCI2LjAuMVwiLFxuXHRcdFwianMteWFtbFwiOiBcIjQuMS4wXCIsXG5cdFx0XCJwb3N0Y3NzXCI6IFwiOC40LjMwXCIsXG5cdFx0XCJ0ZXJzZXJcIjogXCI1LjIwLjBcIixcblx0XHRcInR5cGVzY3JpcHRcIjogXCI1LjIuMlwiXG5cdH0sXG5cdFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiNi43LjJcIixcblx0XHRcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCI2LjcuMlwiLFxuXHRcdFwiY3Jvc3MtZW52XCI6IFwiNy4wLjNcIixcblx0XHRcImN5cHJlc3NcIjogXCIxMy4yLjBcIixcblx0XHRcImVzbGludFwiOiBcIjguNTAuMFwiLFxuXHRcdFwic3RhcnQtc2VydmVyLWFuZC10ZXN0XCI6IFwiMi4wLjFcIlxuXHR9LFxuXHRcIm9wdGlvbmFsRGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcIkB0ZW5zb3JmbG93L3RmanMtY29yZVwiOiBcIjQuNC4wXCJcblx0fVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvcGFja2FnZXMvZnJvbnRlbmQvbGliXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvcGFja2FnZXMvZnJvbnRlbmQvbGliL3JvbGx1cC1wbHVnaW4tdW53aW5kLWNzcy1tb2R1bGUtY2xhc3MtbmFtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9taXNza2V5L21pc3NrZXkvcGFja2FnZXMvZnJvbnRlbmQvbGliL3JvbGx1cC1wbHVnaW4tdW53aW5kLWNzcy1tb2R1bGUtY2xhc3MtbmFtZS50c1wiOy8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiBzeXVpbG8gYW5kIG90aGVyIG1pc3NrZXkgY29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuICovXG5cbmltcG9ydCB7IGdlbmVyYXRlIH0gZnJvbSAnYXN0cmluZyc7XG5pbXBvcnQgKiBhcyBlc3RyZWUgZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IHdhbGsgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvaW5kZXguanMnO1xuaW1wb3J0IHR5cGUgKiBhcyBlc3RyZWVXYWxrZXIgZnJvbSAnZXN0cmVlLXdhbGtlcic7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuXG5mdW5jdGlvbiBpc0ZhbHN5SWRlbnRpZmllcihpZGVudGlmaWVyOiBlc3RyZWUuSWRlbnRpZmllcik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gaWRlbnRpZmllci5uYW1lID09PSAndW5kZWZpbmVkJyB8fCBpZGVudGlmaWVyLm5hbWUgPT09ICdOYU4nO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVDbGFzc1dhbGtlcih0cmVlOiBlc3RyZWUuTm9kZSk6IHN0cmluZyB8IG51bGwge1xuXHRpZiAodHJlZS50eXBlID09PSAnSWRlbnRpZmllcicpIHJldHVybiBpc0ZhbHN5SWRlbnRpZmllcih0cmVlKSA/ICcnIDogbnVsbDtcblx0aWYgKHRyZWUudHlwZSA9PT0gJ0xpdGVyYWwnKSByZXR1cm4gdHlwZW9mIHRyZWUudmFsdWUgPT09ICdzdHJpbmcnID8gdHJlZS52YWx1ZSA6ICcnO1xuXHRpZiAodHJlZS50eXBlID09PSAnQmluYXJ5RXhwcmVzc2lvbicpIHtcblx0XHRpZiAodHJlZS5vcGVyYXRvciAhPT0gJysnKSByZXR1cm4gbnVsbDtcblx0XHRjb25zdCBsZWZ0ID0gbm9ybWFsaXplQ2xhc3NXYWxrZXIodHJlZS5sZWZ0KTtcblx0XHRjb25zdCByaWdodCA9IG5vcm1hbGl6ZUNsYXNzV2Fsa2VyKHRyZWUucmlnaHQpO1xuXHRcdGlmIChsZWZ0ID09PSBudWxsIHx8IHJpZ2h0ID09PSBudWxsKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gYCR7bGVmdH0ke3JpZ2h0fWA7XG5cdH1cblx0aWYgKHRyZWUudHlwZSA9PT0gJ1RlbXBsYXRlTGl0ZXJhbCcpIHtcblx0XHRpZiAodHJlZS5leHByZXNzaW9ucy5zb21lKCh4KSA9PiB4LnR5cGUgIT09ICdMaXRlcmFsJyAmJiAoeC50eXBlICE9PSAnSWRlbnRpZmllcicgfHwgIWlzRmFsc3lJZGVudGlmaWVyKHgpKSkpIHJldHVybiBudWxsO1xuXHRcdHJldHVybiB0cmVlLnF1YXNpcy5yZWR1Y2UoKGEsIGMsIGkpID0+IHtcblx0XHRcdGNvbnN0IHYgPSBpID09PSB0cmVlLnF1YXNpcy5sZW5ndGggLSAxID8gJycgOiAodHJlZS5leHByZXNzaW9uc1tpXSBhcyBQYXJ0aWFsPGVzdHJlZS5MaXRlcmFsPikudmFsdWU7XG5cdFx0XHRyZXR1cm4gYSArIGMudmFsdWUucmF3ICsgKHR5cGVvZiB2ID09PSAnc3RyaW5nJyA/IHYgOiAnJyk7XG5cdFx0fSwgJycpO1xuXHR9XG5cdGlmICh0cmVlLnR5cGUgPT09ICdBcnJheUV4cHJlc3Npb24nKSB7XG5cdFx0Y29uc3QgdmFsdWVzID0gdHJlZS5lbGVtZW50cy5tYXAoKHRyZWVOb2RlKSA9PiB7XG5cdFx0XHRpZiAodHJlZU5vZGUgPT09IG51bGwpIHJldHVybiAnJztcblx0XHRcdGlmICh0cmVlTm9kZS50eXBlID09PSAnU3ByZWFkRWxlbWVudCcpIHJldHVybiBub3JtYWxpemVDbGFzc1dhbGtlcih0cmVlTm9kZS5hcmd1bWVudCk7XG5cdFx0XHRyZXR1cm4gbm9ybWFsaXplQ2xhc3NXYWxrZXIodHJlZU5vZGUpO1xuXHRcdH0pO1xuXHRcdGlmICh2YWx1ZXMuc29tZSgoeCkgPT4geCA9PT0gbnVsbCkpIHJldHVybiBudWxsO1xuXHRcdHJldHVybiB2YWx1ZXMuam9pbignICcpO1xuXHR9XG5cdGlmICh0cmVlLnR5cGUgPT09ICdPYmplY3RFeHByZXNzaW9uJykge1xuXHRcdGNvbnN0IHZhbHVlcyA9IHRyZWUucHJvcGVydGllcy5tYXAoKHRyZWVOb2RlKSA9PiB7XG5cdFx0XHRpZiAodHJlZU5vZGUudHlwZSA9PT0gJ1NwcmVhZEVsZW1lbnQnKSByZXR1cm4gbm9ybWFsaXplQ2xhc3NXYWxrZXIodHJlZU5vZGUuYXJndW1lbnQpO1xuXHRcdFx0bGV0IHggPSB0cmVlTm9kZS52YWx1ZTtcblx0XHRcdGxldCBpbnZldGVkID0gZmFsc2U7XG5cdFx0XHR3aGlsZSAoeC50eXBlID09PSAnVW5hcnlFeHByZXNzaW9uJyAmJiB4Lm9wZXJhdG9yID09PSAnIScpIHtcblx0XHRcdFx0eCA9IHguYXJndW1lbnQ7XG5cdFx0XHRcdGludmV0ZWQgPSAhaW52ZXRlZDtcblx0XHRcdH1cblx0XHRcdGlmICh4LnR5cGUgPT09ICdMaXRlcmFsJykge1xuXHRcdFx0XHRpZiAoaW52ZXRlZCA9PT0gIXgudmFsdWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJlZU5vZGUua2V5LnR5cGUgPT09ICdJZGVudGlmaWVyJyA/IHRyZWVOb2RlLmNvbXB1dGVkID8gbnVsbCA6IHRyZWVOb2RlLmtleS5uYW1lIDogdHJlZU5vZGUua2V5LnR5cGUgPT09ICdMaXRlcmFsJyA/IHRyZWVOb2RlLmtleS52YWx1ZSA6ICcnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAnJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHgudHlwZSA9PT0gJ0lkZW50aWZpZXInKSB7XG5cdFx0XHRcdGlmIChpbnZldGVkICE9PSBpc0ZhbHN5SWRlbnRpZmllcih4KSkge1xuXHRcdFx0XHRcdHJldHVybiAnJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSk7XG5cdFx0aWYgKHZhbHVlcy5zb21lKCh4KSA9PiB4ID09PSBudWxsKSkgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIHZhbHVlcy5qb2luKCcgJyk7XG5cdH1cblx0Y29uc29sZS5lcnJvcihgVW5leHBlY3RlZCBub2RlIHR5cGU6ICR7dHJlZS50eXBlfWApO1xuXHRyZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUNsYXNzKHRyZWU6IGVzdHJlZS5Ob2RlKTogc3RyaW5nIHwgbnVsbCB7XG5cdGNvbnN0IHdhbGtlZCA9IG5vcm1hbGl6ZUNsYXNzV2Fsa2VyKHRyZWUpO1xuXHRyZXR1cm4gd2Fsa2VkICYmIHdhbGtlZC5yZXBsYWNlKC9eXFxzK3xcXHMrKD89XFxzKXxcXHMrJC9nLCAnJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bndpbmRDc3NNb2R1bGVDbGFzc05hbWUoYXN0OiBlc3RyZWUuTm9kZSk6IHZvaWQge1xuXHQod2FsayBhcyB0eXBlb2YgZXN0cmVlV2Fsa2VyLndhbGspKGFzdCwge1xuXHRcdGVudGVyKG5vZGUsIHBhcmVudCk6IHZvaWQge1xuXHRcdFx0aWYgKHBhcmVudD8udHlwZSAhPT0gJ1Byb2dyYW0nKSByZXR1cm47XG5cdFx0XHRpZiAobm9kZS50eXBlICE9PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9ucy5sZW5ndGggIT09IDEpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pZC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdGNvbnN0IG5hbWUgPSBub2RlLmRlY2xhcmF0aW9uc1swXS5pZC5uYW1lO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQ/LnR5cGUgIT09ICdDYWxsRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmNhbGxlZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmNhbGxlZS5uYW1lICE9PSAnX2V4cG9ydF9zZmMnKSByZXR1cm47XG5cdFx0XHRpZiAobm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHMubGVuZ3RoICE9PSAyKSByZXR1cm47XG5cdFx0XHRpZiAobm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMF0udHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRjb25zdCBpZGVudCA9IG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQuYXJndW1lbnRzWzBdLm5hbWU7XG5cdFx0XHRpZiAoIWlkZW50LnN0YXJ0c1dpdGgoJ19zZmNfbWFpbicpKSByZXR1cm47XG5cdFx0XHRpZiAobm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMV0udHlwZSAhPT0gJ0FycmF5RXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1sxXS5lbGVtZW50cy5sZW5ndGggPT09IDApIHJldHVybjtcblx0XHRcdGNvbnN0IF9fY3NzTW9kdWxlc0luZGV4ID0gbm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMV0uZWxlbWVudHMuZmluZEluZGV4KCh4KSA9PiB7XG5cdFx0XHRcdGlmICh4Py50eXBlICE9PSAnQXJyYXlFeHByZXNzaW9uJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5lbGVtZW50cy5sZW5ndGggIT09IDIpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHguZWxlbWVudHNbMF0/LnR5cGUgIT09ICdMaXRlcmFsJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5lbGVtZW50c1swXS52YWx1ZSAhPT0gJ19fY3NzTW9kdWxlcycpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHguZWxlbWVudHNbMV0/LnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKCF+X19jc3NNb2R1bGVzSW5kZXgpIHJldHVybjtcblx0XHRcdGNvbnN0IGNzc01vZHVsZUZvcmVzdE5hbWUgPSAoKG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQuYXJndW1lbnRzWzFdLmVsZW1lbnRzW19fY3NzTW9kdWxlc0luZGV4XSBhcyBlc3RyZWUuQXJyYXlFeHByZXNzaW9uKS5lbGVtZW50c1sxXSBhcyBlc3RyZWUuSWRlbnRpZmllcikubmFtZTtcblx0XHRcdGNvbnN0IGNzc01vZHVsZUZvcmVzdE5vZGUgPSBwYXJlbnQuYm9keS5maW5kKCh4KSA9PiB7XG5cdFx0XHRcdGlmICh4LnR5cGUgIT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmRlY2xhcmF0aW9uc1swXS5pZC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLm5hbWUgIT09IGNzc01vZHVsZUZvcmVzdE5hbWUpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmluaXQ/LnR5cGUgIT09ICdPYmplY3RFeHByZXNzaW9uJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pIGFzIHVua25vd24gYXMgZXN0cmVlLlZhcmlhYmxlRGVjbGFyYXRpb247XG5cdFx0XHRjb25zdCBtb2R1bGVGb3Jlc3QgPSBuZXcgTWFwKChjc3NNb2R1bGVGb3Jlc3ROb2RlLmRlY2xhcmF0aW9uc1swXS5pbml0IGFzIGVzdHJlZS5PYmplY3RFeHByZXNzaW9uKS5wcm9wZXJ0aWVzLmZsYXRNYXAoKHByb3BlcnR5KSA9PiB7XG5cdFx0XHRcdGlmIChwcm9wZXJ0eS50eXBlICE9PSAnUHJvcGVydHknKSByZXR1cm4gW107XG5cdFx0XHRcdGlmIChwcm9wZXJ0eS5rZXkudHlwZSAhPT0gJ0xpdGVyYWwnKSByZXR1cm4gW107XG5cdFx0XHRcdGlmIChwcm9wZXJ0eS52YWx1ZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybiBbXTtcblx0XHRcdFx0cmV0dXJuIFtbcHJvcGVydHkua2V5LnZhbHVlIGFzIHN0cmluZywgcHJvcGVydHkudmFsdWUubmFtZSBhcyBzdHJpbmddXTtcblx0XHRcdH0pKTtcblx0XHRcdGNvbnN0IHNmY01haW4gPSBwYXJlbnQuYm9keS5maW5kKCh4KSA9PiB7XG5cdFx0XHRcdGlmICh4LnR5cGUgIT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmRlY2xhcmF0aW9uc1swXS5pZC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLm5hbWUgIT09IGlkZW50KSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSkgYXMgdW5rbm93biBhcyBlc3RyZWUuVmFyaWFibGVEZWNsYXJhdGlvbjtcblx0XHRcdGlmIChzZmNNYWluLmRlY2xhcmF0aW9uc1swXS5pbml0Py50eXBlICE9PSAnQ2FsbEV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRpZiAoc2ZjTWFpbi5kZWNsYXJhdGlvbnNbMF0uaW5pdC5jYWxsZWUudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRpZiAoc2ZjTWFpbi5kZWNsYXJhdGlvbnNbMF0uaW5pdC5jYWxsZWUubmFtZSAhPT0gJ2RlZmluZUNvbXBvbmVudCcpIHJldHVybjtcblx0XHRcdGlmIChzZmNNYWluLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHJldHVybjtcblx0XHRcdGlmIChzZmNNYWluLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1swXS50eXBlICE9PSAnT2JqZWN0RXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdGNvbnN0IHNldHVwID0gc2ZjTWFpbi5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMF0ucHJvcGVydGllcy5maW5kKCh4KSA9PiB7XG5cdFx0XHRcdGlmICh4LnR5cGUgIT09ICdQcm9wZXJ0eScpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHgua2V5LnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5rZXkubmFtZSAhPT0gJ3NldHVwJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pIGFzIHVua25vd24gYXMgZXN0cmVlLlByb3BlcnR5O1xuXHRcdFx0aWYgKHNldHVwLnZhbHVlLnR5cGUgIT09ICdGdW5jdGlvbkV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRjb25zdCByZW5kZXIgPSBzZXR1cC52YWx1ZS5ib2R5LmJvZHkuZmluZCgoeCkgPT4ge1xuXHRcdFx0XHRpZiAoeC50eXBlICE9PSAnUmV0dXJuU3RhdGVtZW50JykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pIGFzIHVua25vd24gYXMgZXN0cmVlLlJldHVyblN0YXRlbWVudDtcblx0XHRcdGlmIChyZW5kZXIuYXJndW1lbnQ/LnR5cGUgIT09ICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdGlmIChyZW5kZXIuYXJndW1lbnQucGFyYW1zLmxlbmd0aCAhPT0gMikgcmV0dXJuO1xuXHRcdFx0Y29uc3QgY3R4ID0gcmVuZGVyLmFyZ3VtZW50LnBhcmFtc1swXTtcblx0XHRcdGlmIChjdHgudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRpZiAoY3R4Lm5hbWUgIT09ICdfY3R4JykgcmV0dXJuO1xuXHRcdFx0aWYgKHJlbmRlci5hcmd1bWVudC5ib2R5LnR5cGUgIT09ICdCbG9ja1N0YXRlbWVudCcpIHJldHVybjtcblx0XHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIG1vZHVsZUZvcmVzdCkge1xuXHRcdFx0XHRjb25zdCBjc3NNb2R1bGVUcmVlTm9kZSA9IHBhcmVudC5ib2R5LmZpbmQoKHgpID0+IHtcblx0XHRcdFx0XHRpZiAoeC50eXBlICE9PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdGlmICh4LmRlY2xhcmF0aW9uc1swXS5pZC5uYW1lICE9PSB2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KSBhcyB1bmtub3duIGFzIGVzdHJlZS5WYXJpYWJsZURlY2xhcmF0aW9uO1xuXHRcdFx0XHRpZiAoY3NzTW9kdWxlVHJlZU5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQ/LnR5cGUgIT09ICdPYmplY3RFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0XHRjb25zdCBtb2R1bGVUcmVlID0gbmV3IE1hcChjc3NNb2R1bGVUcmVlTm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5wcm9wZXJ0aWVzLmZsYXRNYXAoKHByb3BlcnR5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHByb3BlcnR5LnR5cGUgIT09ICdQcm9wZXJ0eScpIHJldHVybiBbXTtcblx0XHRcdFx0XHRjb25zdCBhY3R1YWxLZXkgPSBwcm9wZXJ0eS5rZXkudHlwZSA9PT0gJ0lkZW50aWZpZXInID8gcHJvcGVydHkua2V5Lm5hbWUgOiBwcm9wZXJ0eS5rZXkudHlwZSA9PT0gJ0xpdGVyYWwnID8gcHJvcGVydHkua2V5LnZhbHVlIDogbnVsbDtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGFjdHVhbEtleSAhPT0gJ3N0cmluZycpIHJldHVybiBbXTtcblx0XHRcdFx0XHRpZiAocHJvcGVydHkudmFsdWUudHlwZSA9PT0gJ0xpdGVyYWwnKSByZXR1cm4gW1thY3R1YWxLZXksIHByb3BlcnR5LnZhbHVlLnZhbHVlIGFzIHN0cmluZ11dO1xuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eS52YWx1ZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybiBbXTtcblx0XHRcdFx0XHRjb25zdCBsYWJlbGxlZFZhbHVlID0gcHJvcGVydHkudmFsdWUubmFtZTtcblx0XHRcdFx0XHRjb25zdCBhY3R1YWxWYWx1ZSA9IHBhcmVudC5ib2R5LmZpbmQoKHgpID0+IHtcblx0XHRcdFx0XHRcdGlmICh4LnR5cGUgIT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zLmxlbmd0aCAhPT0gMSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLm5hbWUgIT09IGxhYmVsbGVkVmFsdWUpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH0pIGFzIHVua25vd24gYXMgZXN0cmVlLlZhcmlhYmxlRGVjbGFyYXRpb247XG5cdFx0XHRcdFx0aWYgKGFjdHVhbFZhbHVlLmRlY2xhcmF0aW9uc1swXS5pbml0Py50eXBlICE9PSAnTGl0ZXJhbCcpIHJldHVybiBbXTtcblx0XHRcdFx0XHRyZXR1cm4gW1thY3R1YWxLZXksIGFjdHVhbFZhbHVlLmRlY2xhcmF0aW9uc1swXS5pbml0LnZhbHVlIGFzIHN0cmluZ11dO1xuXHRcdFx0XHR9KSk7XG5cdFx0XHRcdCh3YWxrIGFzIHR5cGVvZiBlc3RyZWVXYWxrZXIud2FsaykocmVuZGVyLmFyZ3VtZW50LmJvZHksIHtcblx0XHRcdFx0XHRlbnRlcihjaGlsZE5vZGUpIHtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUudHlwZSAhPT0gJ01lbWJlckV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC50eXBlICE9PSAnTWVtYmVyRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0Lm9iamVjdC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0Lm9iamVjdC5uYW1lICE9PSBjdHgubmFtZSkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5vYmplY3QucHJvcGVydHkudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC5wcm9wZXJ0eS5uYW1lICE9PSBrZXkpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUucHJvcGVydHkudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRcdFx0XHRjb25zdCBhY3R1YWxWYWx1ZSA9IG1vZHVsZVRyZWUuZ2V0KGNoaWxkTm9kZS5wcm9wZXJ0eS5uYW1lKTtcblx0XHRcdFx0XHRcdGlmIChhY3R1YWxWYWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cdFx0XHRcdFx0XHR0aGlzLnJlcGxhY2Uoe1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnTGl0ZXJhbCcsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBhY3R1YWxWYWx1ZSxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQod2FsayBhcyB0eXBlb2YgZXN0cmVlV2Fsa2VyLndhbGspKHJlbmRlci5hcmd1bWVudC5ib2R5LCB7XG5cdFx0XHRcdFx0ZW50ZXIoY2hpbGROb2RlKSB7XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLnR5cGUgIT09ICdNZW1iZXJFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5vYmplY3QudHlwZSAhPT0gJ01lbWJlckV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC5vYmplY3QudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC5vYmplY3QubmFtZSAhPT0gY3R4Lm5hbWUpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0LnByb3BlcnR5LnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5vYmplY3QucHJvcGVydHkubmFtZSAhPT0ga2V5KSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLnByb3BlcnR5LnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgVW5kZWZpbmVkIHN0eWxlIGRldGVjdGVkOiAke2tleX0uJHtjaGlsZE5vZGUucHJvcGVydHkubmFtZX0gKGluICR7bmFtZX0pYCk7XG5cdFx0XHRcdFx0XHR0aGlzLnJlcGxhY2Uoe1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnSWRlbnRpZmllcicsXG5cdFx0XHRcdFx0XHRcdG5hbWU6ICd1bmRlZmluZWQnLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCh3YWxrIGFzIHR5cGVvZiBlc3RyZWVXYWxrZXIud2FsaykocmVuZGVyLmFyZ3VtZW50LmJvZHksIHtcblx0XHRcdFx0XHRlbnRlcihjaGlsZE5vZGUpIHtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUudHlwZSAhPT0gJ0NhbGxFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5jYWxsZWUudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLmNhbGxlZS5uYW1lICE9PSAnbm9ybWFsaXplQ2xhc3MnKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLmFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHJldHVybjtcblx0XHRcdFx0XHRcdGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVDbGFzcyhjaGlsZE5vZGUuYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHRcdGlmIChub3JtYWxpemVkID09PSBudWxsKSByZXR1cm47XG5cdFx0XHRcdFx0XHR0aGlzLnJlcGxhY2Uoe1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnTGl0ZXJhbCcsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBub3JtYWxpemVkLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMV0uZWxlbWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHRoaXMucmVwbGFjZSh7XG5cdFx0XHRcdFx0dHlwZTogJ1ZhcmlhYmxlRGVjbGFyYXRpb24nLFxuXHRcdFx0XHRcdGRlY2xhcmF0aW9uczogW3tcblx0XHRcdFx0XHRcdHR5cGU6ICdWYXJpYWJsZURlY2xhcmF0b3InLFxuXHRcdFx0XHRcdFx0aWQ6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ0lkZW50aWZpZXInLFxuXHRcdFx0XHRcdFx0XHRuYW1lOiBub2RlLmRlY2xhcmF0aW9uc1swXS5pZC5uYW1lLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGluaXQ6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ0lkZW50aWZpZXInLFxuXHRcdFx0XHRcdFx0XHRuYW1lOiBpZGVudCxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0a2luZDogJ2NvbnN0Jyxcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnJlcGxhY2Uoe1xuXHRcdFx0XHRcdHR5cGU6ICdWYXJpYWJsZURlY2xhcmF0aW9uJyxcblx0XHRcdFx0XHRkZWNsYXJhdGlvbnM6IFt7XG5cdFx0XHRcdFx0XHR0eXBlOiAnVmFyaWFibGVEZWNsYXJhdG9yJyxcblx0XHRcdFx0XHRcdGlkOiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdJZGVudGlmaWVyJyxcblx0XHRcdFx0XHRcdFx0bmFtZTogbm9kZS5kZWNsYXJhdGlvbnNbMF0uaWQubmFtZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRpbml0OiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdDYWxsRXhwcmVzc2lvbicsXG5cdFx0XHRcdFx0XHRcdGNhbGxlZToge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6ICdJZGVudGlmaWVyJyxcblx0XHRcdFx0XHRcdFx0XHRuYW1lOiAnX2V4cG9ydF9zZmMnLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRhcmd1bWVudHM6IFt7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ0lkZW50aWZpZXInLFxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6IGlkZW50LFxuXHRcdFx0XHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ0FycmF5RXhwcmVzc2lvbicsXG5cdFx0XHRcdFx0XHRcdFx0ZWxlbWVudHM6IG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQuYXJndW1lbnRzWzFdLmVsZW1lbnRzLnNsaWNlKDAsIF9fY3NzTW9kdWxlc0luZGV4KS5jb25jYXQobm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMV0uZWxlbWVudHMuc2xpY2UoX19jc3NNb2R1bGVzSW5kZXggKyAxKSksXG5cdFx0XHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRraW5kOiAnY29uc3QnLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LFxuXHR9KTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1kZWZhdWx0LWV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGx1Z2luVW53aW5kQ3NzTW9kdWxlQ2xhc3NOYW1lKCk6IFBsdWdpbiB7XG5cdHJldHVybiB7XG5cdFx0bmFtZTogJ1Vud2luZENzc01vZHVsZUNsYXNzTmFtZScsXG5cdFx0cmVuZGVyQ2h1bmsoY29kZSk6IHsgY29kZTogc3RyaW5nIH0ge1xuXHRcdFx0Y29uc3QgYXN0ID0gdGhpcy5wYXJzZShjb2RlKSBhcyB1bmtub3duIGFzIGVzdHJlZS5Ob2RlO1xuXHRcdFx0dW53aW5kQ3NzTW9kdWxlQ2xhc3NOYW1lKGFzdCk7XG5cdFx0XHRyZXR1cm4geyBjb2RlOiBnZW5lcmF0ZShhc3QpIH07XG5cdFx0fSxcblx0fTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy93YWxrZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWlzc2tleS9taXNza2V5L25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy93YWxrZXIuanNcIjsvKipcbiAqIEB0eXBlZGVmIHsgaW1wb3J0KCdlc3RyZWUnKS5Ob2RlfSBOb2RlXG4gKiBAdHlwZWRlZiB7e1xuICogICBza2lwOiAoKSA9PiB2b2lkO1xuICogICByZW1vdmU6ICgpID0+IHZvaWQ7XG4gKiAgIHJlcGxhY2U6IChub2RlOiBOb2RlKSA9PiB2b2lkO1xuICogfX0gV2Fsa2VyQ29udGV4dFxuICovXG5cbmV4cG9ydCBjbGFzcyBXYWxrZXJCYXNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdHRoaXMuc2hvdWxkX3NraXAgPSBmYWxzZTtcblxuXHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHR0aGlzLnNob3VsZF9yZW1vdmUgPSBmYWxzZTtcblxuXHRcdC8qKiBAdHlwZSB7Tm9kZSB8IG51bGx9ICovXG5cdFx0dGhpcy5yZXBsYWNlbWVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge1dhbGtlckNvbnRleHR9ICovXG5cdFx0dGhpcy5jb250ZXh0ID0ge1xuXHRcdFx0c2tpcDogKCkgPT4gKHRoaXMuc2hvdWxkX3NraXAgPSB0cnVlKSxcblx0XHRcdHJlbW92ZTogKCkgPT4gKHRoaXMuc2hvdWxkX3JlbW92ZSA9IHRydWUpLFxuXHRcdFx0cmVwbGFjZTogKG5vZGUpID0+ICh0aGlzLnJlcGxhY2VtZW50ID0gbm9kZSlcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEB0ZW1wbGF0ZSB7Tm9kZX0gUGFyZW50XG5cdCAqIEBwYXJhbSB7UGFyZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gcGFyZW50XG5cdCAqIEBwYXJhbSB7a2V5b2YgUGFyZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gcHJvcFxuXHQgKiBAcGFyYW0ge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IGluZGV4XG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHQgKi9cblx0cmVwbGFjZShwYXJlbnQsIHByb3AsIGluZGV4LCBub2RlKSB7XG5cdFx0aWYgKHBhcmVudCAmJiBwcm9wKSB7XG5cdFx0XHRpZiAoaW5kZXggIT0gbnVsbCkge1xuXHRcdFx0XHQvKiogQHR5cGUge0FycmF5PE5vZGU+fSAqLyAocGFyZW50W3Byb3BdKVtpbmRleF0gPSBub2RlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0LyoqIEB0eXBlIHtOb2RlfSAqLyAocGFyZW50W3Byb3BdKSA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEB0ZW1wbGF0ZSB7Tm9kZX0gUGFyZW50XG5cdCAqIEBwYXJhbSB7UGFyZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gcGFyZW50XG5cdCAqIEBwYXJhbSB7a2V5b2YgUGFyZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gcHJvcFxuXHQgKiBAcGFyYW0ge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IGluZGV4XG5cdCAqL1xuXHRyZW1vdmUocGFyZW50LCBwcm9wLCBpbmRleCkge1xuXHRcdGlmIChwYXJlbnQgJiYgcHJvcCkge1xuXHRcdFx0aWYgKGluZGV4ICE9PSBudWxsICYmIGluZGV4ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0LyoqIEB0eXBlIHtBcnJheTxOb2RlPn0gKi8gKHBhcmVudFtwcm9wXSkuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlbGV0ZSBwYXJlbnRbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvc3luYy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9taXNza2V5L21pc3NrZXkvbm9kZV9tb2R1bGVzLy5wbnBtL2VzdHJlZS13YWxrZXJAMy4wLjMvbm9kZV9tb2R1bGVzL2VzdHJlZS13YWxrZXIvc3JjL3N5bmMuanNcIjtpbXBvcnQgeyBXYWxrZXJCYXNlIH0gZnJvbSAnLi93YWxrZXIuanMnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHsgaW1wb3J0KCdlc3RyZWUnKS5Ob2RlfSBOb2RlXG4gKiBAdHlwZWRlZiB7IGltcG9ydCgnLi93YWxrZXIuanMnKS5XYWxrZXJDb250ZXh0fSBXYWxrZXJDb250ZXh0XG4gKiBAdHlwZWRlZiB7KFxuICogICAgdGhpczogV2Fsa2VyQ29udGV4dCxcbiAqICAgIG5vZGU6IE5vZGUsXG4gKiAgICBwYXJlbnQ6IE5vZGUgfCBudWxsLFxuICogICAga2V5OiBzdHJpbmcgfCBudW1iZXIgfCBzeW1ib2wgfCBudWxsIHwgdW5kZWZpbmVkLFxuICogICAgaW5kZXg6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWRcbiAqICkgPT4gdm9pZH0gU3luY0hhbmRsZXJcbiAqL1xuXG5leHBvcnQgY2xhc3MgU3luY1dhbGtlciBleHRlbmRzIFdhbGtlckJhc2Uge1xuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHtTeW5jSGFuZGxlcn0gW2VudGVyXVxuXHQgKiBAcGFyYW0ge1N5bmNIYW5kbGVyfSBbbGVhdmVdXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihlbnRlciwgbGVhdmUpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdHRoaXMuc2hvdWxkX3NraXAgPSBmYWxzZTtcblxuXHRcdC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cblx0XHR0aGlzLnNob3VsZF9yZW1vdmUgPSBmYWxzZTtcblxuXHRcdC8qKiBAdHlwZSB7Tm9kZSB8IG51bGx9ICovXG5cdFx0dGhpcy5yZXBsYWNlbWVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge1dhbGtlckNvbnRleHR9ICovXG5cdFx0dGhpcy5jb250ZXh0ID0ge1xuXHRcdFx0c2tpcDogKCkgPT4gKHRoaXMuc2hvdWxkX3NraXAgPSB0cnVlKSxcblx0XHRcdHJlbW92ZTogKCkgPT4gKHRoaXMuc2hvdWxkX3JlbW92ZSA9IHRydWUpLFxuXHRcdFx0cmVwbGFjZTogKG5vZGUpID0+ICh0aGlzLnJlcGxhY2VtZW50ID0gbm9kZSlcblx0XHR9O1xuXG5cdFx0LyoqIEB0eXBlIHtTeW5jSGFuZGxlciB8IHVuZGVmaW5lZH0gKi9cblx0XHR0aGlzLmVudGVyID0gZW50ZXI7XG5cblx0XHQvKiogQHR5cGUge1N5bmNIYW5kbGVyIHwgdW5kZWZpbmVkfSAqL1xuXHRcdHRoaXMubGVhdmUgPSBsZWF2ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAdGVtcGxhdGUge05vZGV9IFBhcmVudFxuXHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcblx0ICogQHBhcmFtIHtQYXJlbnQgfCBudWxsfSBwYXJlbnRcblx0ICogQHBhcmFtIHtrZXlvZiBQYXJlbnR9IFtwcm9wXVxuXHQgKiBAcGFyYW0ge251bWJlciB8IG51bGx9IFtpbmRleF1cblx0ICogQHJldHVybnMge05vZGUgfCBudWxsfVxuXHQgKi9cblx0dmlzaXQobm9kZSwgcGFyZW50LCBwcm9wLCBpbmRleCkge1xuXHRcdGlmIChub2RlKSB7XG5cdFx0XHRpZiAodGhpcy5lbnRlcikge1xuXHRcdFx0XHRjb25zdCBfc2hvdWxkX3NraXAgPSB0aGlzLnNob3VsZF9za2lwO1xuXHRcdFx0XHRjb25zdCBfc2hvdWxkX3JlbW92ZSA9IHRoaXMuc2hvdWxkX3JlbW92ZTtcblx0XHRcdFx0Y29uc3QgX3JlcGxhY2VtZW50ID0gdGhpcy5yZXBsYWNlbWVudDtcblx0XHRcdFx0dGhpcy5zaG91bGRfc2tpcCA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLnNob3VsZF9yZW1vdmUgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5yZXBsYWNlbWVudCA9IG51bGw7XG5cblx0XHRcdFx0dGhpcy5lbnRlci5jYWxsKHRoaXMuY29udGV4dCwgbm9kZSwgcGFyZW50LCBwcm9wLCBpbmRleCk7XG5cblx0XHRcdFx0aWYgKHRoaXMucmVwbGFjZW1lbnQpIHtcblx0XHRcdFx0XHRub2RlID0gdGhpcy5yZXBsYWNlbWVudDtcblx0XHRcdFx0XHR0aGlzLnJlcGxhY2UocGFyZW50LCBwcm9wLCBpbmRleCwgbm9kZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5zaG91bGRfcmVtb3ZlKSB7XG5cdFx0XHRcdFx0dGhpcy5yZW1vdmUocGFyZW50LCBwcm9wLCBpbmRleCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBza2lwcGVkID0gdGhpcy5zaG91bGRfc2tpcDtcblx0XHRcdFx0Y29uc3QgcmVtb3ZlZCA9IHRoaXMuc2hvdWxkX3JlbW92ZTtcblxuXHRcdFx0XHR0aGlzLnNob3VsZF9za2lwID0gX3Nob3VsZF9za2lwO1xuXHRcdFx0XHR0aGlzLnNob3VsZF9yZW1vdmUgPSBfc2hvdWxkX3JlbW92ZTtcblx0XHRcdFx0dGhpcy5yZXBsYWNlbWVudCA9IF9yZXBsYWNlbWVudDtcblxuXHRcdFx0XHRpZiAoc2tpcHBlZCkgcmV0dXJuIG5vZGU7XG5cdFx0XHRcdGlmIChyZW1vdmVkKSByZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0LyoqIEB0eXBlIHtrZXlvZiBOb2RlfSAqL1xuXHRcdFx0bGV0IGtleTtcblxuXHRcdFx0Zm9yIChrZXkgaW4gbm9kZSkge1xuXHRcdFx0XHQvKiogQHR5cGUge3Vua25vd259ICovXG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gbm9kZVtrZXldO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBub2RlcyA9IC8qKiBAdHlwZSB7QXJyYXk8dW5rbm93bj59ICovICh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBub2Rlc1tpXTtcblx0XHRcdFx0XHRcdFx0aWYgKGlzTm9kZShpdGVtKSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghdGhpcy52aXNpdChpdGVtLCBub2RlLCBrZXksIGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyByZW1vdmVkXG5cdFx0XHRcdFx0XHRcdFx0XHRpLS07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpc05vZGUodmFsdWUpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZpc2l0KHZhbHVlLCBub2RlLCBrZXksIG51bGwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5sZWF2ZSkge1xuXHRcdFx0XHRjb25zdCBfcmVwbGFjZW1lbnQgPSB0aGlzLnJlcGxhY2VtZW50O1xuXHRcdFx0XHRjb25zdCBfc2hvdWxkX3JlbW92ZSA9IHRoaXMuc2hvdWxkX3JlbW92ZTtcblx0XHRcdFx0dGhpcy5yZXBsYWNlbWVudCA9IG51bGw7XG5cdFx0XHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdHRoaXMubGVhdmUuY2FsbCh0aGlzLmNvbnRleHQsIG5vZGUsIHBhcmVudCwgcHJvcCwgaW5kZXgpO1xuXG5cdFx0XHRcdGlmICh0aGlzLnJlcGxhY2VtZW50KSB7XG5cdFx0XHRcdFx0bm9kZSA9IHRoaXMucmVwbGFjZW1lbnQ7XG5cdFx0XHRcdFx0dGhpcy5yZXBsYWNlKHBhcmVudCwgcHJvcCwgaW5kZXgsIG5vZGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuc2hvdWxkX3JlbW92ZSkge1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlKHBhcmVudCwgcHJvcCwgaW5kZXgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgcmVtb3ZlZCA9IHRoaXMuc2hvdWxkX3JlbW92ZTtcblxuXHRcdFx0XHR0aGlzLnJlcGxhY2VtZW50ID0gX3JlcGxhY2VtZW50O1xuXHRcdFx0XHR0aGlzLnNob3VsZF9yZW1vdmUgPSBfc2hvdWxkX3JlbW92ZTtcblxuXHRcdFx0XHRpZiAocmVtb3ZlZCkgcmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5vZGU7XG5cdH1cbn1cblxuLyoqXG4gKiBEdWNrdHlwZSBhIG5vZGUuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB2YWx1ZVxuICogQHJldHVybnMge3ZhbHVlIGlzIE5vZGV9XG4gKi9cbmZ1bmN0aW9uIGlzTm9kZSh2YWx1ZSkge1xuXHRyZXR1cm4gKFxuXHRcdHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgJ3R5cGUnIGluIHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50eXBlID09PSAnc3RyaW5nJ1xuXHQpO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvbm9kZV9tb2R1bGVzLy5wbnBtL2VzdHJlZS13YWxrZXJAMy4wLjMvbm9kZV9tb2R1bGVzL2VzdHJlZS13YWxrZXIvc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvbm9kZV9tb2R1bGVzLy5wbnBtL2VzdHJlZS13YWxrZXJAMy4wLjMvbm9kZV9tb2R1bGVzL2VzdHJlZS13YWxrZXIvc3JjL2luZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21pc3NrZXkvbWlzc2tleS9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvaW5kZXguanNcIjtpbXBvcnQgeyBTeW5jV2Fsa2VyIH0gZnJvbSAnLi9zeW5jLmpzJztcbmltcG9ydCB7IEFzeW5jV2Fsa2VyIH0gZnJvbSAnLi9hc3luYy5qcyc7XG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnZXN0cmVlJykuTm9kZX0gTm9kZVxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9zeW5jLmpzJykuU3luY0hhbmRsZXJ9IFN5bmNIYW5kbGVyXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2FzeW5jLmpzJykuQXN5bmNIYW5kbGVyfSBBc3luY0hhbmRsZXJcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gYXN0XG4gKiBAcGFyYW0ge3tcbiAqICAgZW50ZXI/OiBTeW5jSGFuZGxlclxuICogICBsZWF2ZT86IFN5bmNIYW5kbGVyXG4gKiB9fSB3YWxrZXJcbiAqIEByZXR1cm5zIHtOb2RlIHwgbnVsbH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdhbGsoYXN0LCB7IGVudGVyLCBsZWF2ZSB9KSB7XG5cdGNvbnN0IGluc3RhbmNlID0gbmV3IFN5bmNXYWxrZXIoZW50ZXIsIGxlYXZlKTtcblx0cmV0dXJuIGluc3RhbmNlLnZpc2l0KGFzdCwgbnVsbCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBhc3RcbiAqIEBwYXJhbSB7e1xuICogICBlbnRlcj86IEFzeW5jSGFuZGxlclxuICogICBsZWF2ZT86IEFzeW5jSGFuZGxlclxuICogfX0gd2Fsa2VyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxOb2RlIHwgbnVsbD59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhc3luY1dhbGsoYXN0LCB7IGVudGVyLCBsZWF2ZSB9KSB7XG5cdGNvbnN0IGluc3RhbmNlID0gbmV3IEFzeW5jV2Fsa2VyKGVudGVyLCBsZWF2ZSk7XG5cdHJldHVybiBhd2FpdCBpbnN0YW5jZS52aXNpdChhc3QsIG51bGwpO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvcGFja2FnZXMvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZC92aXRlLmpzb241LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZC92aXRlLmpzb241LnRzXCI7Ly8gT3JpZ2luYWw6IGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcGx1Z2lucy90cmVlLzg4MzVkZDJhZWQ5MmY0MDhkN2RjNzJkN2NjMjVhOTcyOGUxNmZhY2UvcGFja2FnZXMvanNvblxuXG5pbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAncm9sbHVwJztcbmltcG9ydCB7IGNyZWF0ZUZpbHRlciwgZGF0YVRvRXNtIH0gZnJvbSAnQHJvbGx1cC9wbHVnaW51dGlscyc7XG5pbXBvcnQgeyBSb2xsdXBKc29uT3B0aW9ucyB9IGZyb20gJ0Byb2xsdXAvcGx1Z2luLWpzb24nO1xuXG4vLyBqc29uNSBleHRlbmRzIFN5bnRheEVycm9yIHdpdGggYWRkaXRpb25hbCBmaWVsZHMgKHdpdGhvdXQgc3ViY2xhc3NpbmcpXG4vLyBodHRwczovL2dpdGh1Yi5jb20vanNvbjUvanNvbjUvYmxvYi9kZTM0NGYwNjE5YmRhMTQ2NWE2ZTI1Yzc2ZjFjMGMzZGRhODEwOGQ5L2xpYi9wYXJzZS5qcyNMMTExMS1MMTExMlxuaW50ZXJmYWNlIEpzb241U3ludGF4RXJyb3IgZXh0ZW5kcyBTeW50YXhFcnJvciB7XG5cdGxpbmVOdW1iZXI6IG51bWJlcjtcblx0Y29sdW1uTnVtYmVyOiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGpzb241KG9wdGlvbnM6IFJvbGx1cEpzb25PcHRpb25zID0ge30pOiBQbHVnaW4ge1xuXHRjb25zdCBmaWx0ZXIgPSBjcmVhdGVGaWx0ZXIob3B0aW9ucy5pbmNsdWRlLCBvcHRpb25zLmV4Y2x1ZGUpO1xuXHRjb25zdCBpbmRlbnQgPSAnaW5kZW50JyBpbiBvcHRpb25zID8gb3B0aW9ucy5pbmRlbnQgOiAnXFx0JztcblxuXHRyZXR1cm4ge1xuXHRcdG5hbWU6ICdqc29uNScsXG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2hhZG93XG5cdFx0dHJhbnNmb3JtKGpzb24sIGlkKSB7XG5cdFx0XHRpZiAoaWQuc2xpY2UoLTYpICE9PSAnLmpzb241JyB8fCAhZmlsdGVyKGlkKSkgcmV0dXJuIG51bGw7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHBhcnNlZCA9IEpTT041LnBhcnNlKGpzb24pO1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGNvZGU6IGRhdGFUb0VzbShwYXJzZWQsIHtcblx0XHRcdFx0XHRcdHByZWZlckNvbnN0OiBvcHRpb25zLnByZWZlckNvbnN0LFxuXHRcdFx0XHRcdFx0Y29tcGFjdDogb3B0aW9ucy5jb21wYWN0LFxuXHRcdFx0XHRcdFx0bmFtZWRFeHBvcnRzOiBvcHRpb25zLm5hbWVkRXhwb3J0cyxcblx0XHRcdFx0XHRcdGluZGVudCxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRtYXA6IHsgbWFwcGluZ3M6ICcnIH0sXG5cdFx0XHRcdH07XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0aWYgKCEoZXJyIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnN0IG1lc3NhZ2UgPSAnQ291bGQgbm90IHBhcnNlIEpTT041IGZpbGUnO1xuXHRcdFx0XHRjb25zdCB7IGxpbmVOdW1iZXIsIGNvbHVtbk51bWJlciB9ID0gZXJyIGFzIEpzb241U3ludGF4RXJyb3I7XG5cdFx0XHRcdHRoaXMud2Fybih7IG1lc3NhZ2UsIGlkLCBsb2M6IHsgbGluZTogbGluZU51bWJlciwgY29sdW1uOiBjb2x1bW5OdW1iZXIgfSB9KTtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsT0FBTyxVQUFVO0FBQ3hULE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sZUFBZTtB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

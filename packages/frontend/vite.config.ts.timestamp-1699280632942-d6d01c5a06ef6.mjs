// vite.config.ts
import path from "path";
import pluginReplace from "file:///home/misskey/misskey/node_modules/.pnpm/@rollup+plugin-replace@5.0.5_rollup@4.2.0/node_modules/@rollup/plugin-replace/dist/es/index.js";
import pluginVue from "file:///home/misskey/misskey/node_modules/.pnpm/@vitejs+plugin-vue@4.4.0_vite@4.5.0_vue@3.3.7/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///home/misskey/misskey/node_modules/.pnpm/vite@4.5.0_@types+node@20.8.10_sass@1.69.5_terser@5.24.0/node_modules/vite/dist/node/index.js";
import ReactivityTransform from "file:///home/misskey/misskey/node_modules/.pnpm/@vue-macros+reactivity-transform@0.3.23_rollup@4.2.0_vue@3.3.7/node_modules/@vue-macros/reactivity-transform/dist/vite.mjs";

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
var removeEmpty = (obj) => {
  for (const [k, v] of Object.entries(obj)) {
    if (v === "") {
      delete obj[k];
    } else if (typeof v === "object") {
      removeEmpty(v);
    }
  }
  return obj;
};
removeEmpty(locales);
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
        locales[`${lang}-${primaries[lang]}`] ?? {},
        v
      );
  }
})(), a), {});

// ../../package.json
var package_default = {
  name: "misskey",
  version: "2023.11.0-9ine-4.1.2",
  codename: "TOARU",
  repository: {
    type: "git",
    url: "https://github.com/9ineverse-dev/Type-9ine.git"
  },
  packageManager: "pnpm@8.10.0",
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
    revert: "cd packages/backend && pnpm revert",
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
    postcss: "8.4.31",
    terser: "5.24.0",
    typescript: "5.2.2"
  },
  devDependencies: {
    "@typescript-eslint/eslint-plugin": "6.9.1",
    "@typescript-eslint/parser": "6.9.1",
    "cross-env": "7.0.3",
    cypress: "13.4.0",
    eslint: "8.52.0",
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
import { createFilter, dataToEsm } from "file:///home/misskey/misskey/node_modules/.pnpm/@rollup+pluginutils@5.0.5_rollup@4.2.0/node_modules/@rollup/pluginutils/dist/es/index.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vLi4vbG9jYWxlcy9pbmRleC5qcyIsICIuLi8uLi9wYWNrYWdlLmpzb24iLCAibGliL3JvbGx1cC1wbHVnaW4tdW53aW5kLWNzcy1tb2R1bGUtY2xhc3MtbmFtZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvd2Fsa2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9zeW5jLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9pbmRleC5qcyIsICJ2aXRlLmpzb241LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvcGFja2FnZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcGx1Z2luUmVwbGFjZSBmcm9tICdAcm9sbHVwL3BsdWdpbi1yZXBsYWNlJztcbmltcG9ydCBwbHVnaW5WdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB7IHR5cGUgVXNlckNvbmZpZywgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG4vLyBAdHMtZXhwZWN0LWVycm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zeHp6L3VucGx1Z2luLXZ1ZS1tYWNyb3MvaXNzdWVzLzI1NyNpc3N1ZWNvbW1lbnQtMTQxMDc1Mjg5MFxuaW1wb3J0IFJlYWN0aXZpdHlUcmFuc2Zvcm0gZnJvbSAnQHZ1ZS1tYWNyb3MvcmVhY3Rpdml0eS10cmFuc2Zvcm0vdml0ZSc7XG5cbmltcG9ydCBsb2NhbGVzIGZyb20gJy4uLy4uL2xvY2FsZXMnO1xuaW1wb3J0IG1ldGEgZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBwbHVnaW5VbndpbmRDc3NNb2R1bGVDbGFzc05hbWUgZnJvbSAnLi9saWIvcm9sbHVwLXBsdWdpbi11bndpbmQtY3NzLW1vZHVsZS1jbGFzcy1uYW1lJztcbmltcG9ydCBwbHVnaW5Kc29uNSBmcm9tICcuL3ZpdGUuanNvbjUnO1xuXG5jb25zdCBleHRlbnNpb25zID0gWycudHMnLCAnLnRzeCcsICcuanMnLCAnLmpzeCcsICcubWpzJywgJy5qc29uJywgJy5qc29uNScsICcuc3ZnJywgJy5zYXNzJywgJy5zY3NzJywgJy5jc3MnLCAnLnZ1ZSddO1xuXG5jb25zdCBoYXNoID0gKHN0cjogc3RyaW5nLCBzZWVkID0gMCk6IG51bWJlciA9PiB7XG5cdGxldCBoMSA9IDB4ZGVhZGJlZWYgXiBzZWVkLFxuXHRcdGgyID0gMHg0MWM2Y2U1NyBeIHNlZWQ7XG5cdGZvciAobGV0IGkgPSAwLCBjaDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuXHRcdGNoID0gc3RyLmNoYXJDb2RlQXQoaSk7XG5cdFx0aDEgPSBNYXRoLmltdWwoaDEgXiBjaCwgMjY1NDQzNTc2MSk7XG5cdFx0aDIgPSBNYXRoLmltdWwoaDIgXiBjaCwgMTU5NzMzNDY3Nyk7XG5cdH1cblxuXHRoMSA9IE1hdGguaW11bChoMSBeIChoMSA+Pj4gMTYpLCAyMjQ2ODIyNTA3KSBeIE1hdGguaW11bChoMiBeIChoMiA+Pj4gMTMpLCAzMjY2NDg5OTA5KTtcblx0aDIgPSBNYXRoLmltdWwoaDIgXiAoaDIgPj4+IDE2KSwgMjI0NjgyMjUwNykgXiBNYXRoLmltdWwoaDEgXiAoaDEgPj4+IDEzKSwgMzI2NjQ4OTkwOSk7XG5cblx0cmV0dXJuIDQyOTQ5NjcyOTYgKiAoMjA5NzE1MSAmIGgyKSArIChoMSA+Pj4gMCk7XG59O1xuXG5jb25zdCBCQVNFNjJfRElHSVRTID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbmZ1bmN0aW9uIHRvQmFzZTYyKG46IG51bWJlcik6IHN0cmluZyB7XG5cdGlmIChuID09PSAwKSB7XG5cdFx0cmV0dXJuICcwJztcblx0fVxuXHRsZXQgcmVzdWx0ID0gJyc7XG5cdHdoaWxlIChuID4gMCkge1xuXHRcdHJlc3VsdCA9IEJBU0U2Ml9ESUdJVFNbbiAlIEJBU0U2Ml9ESUdJVFMubGVuZ3RoXSArIHJlc3VsdDtcblx0XHRuID0gTWF0aC5mbG9vcihuIC8gQkFTRTYyX0RJR0lUUy5sZW5ndGgpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZygpOiBVc2VyQ29uZmlnIHtcblx0cmV0dXJuIHtcblx0XHRiYXNlOiAnL3ZpdGUvJyxcblxuXHRcdHNlcnZlcjoge1xuXHRcdFx0cG9ydDogNTE3Myxcblx0XHR9LFxuXG5cdFx0cGx1Z2luczogW1xuXHRcdFx0cGx1Z2luVnVlKHtcblx0XHRcdFx0cmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcblx0XHRcdH0pLFxuXHRcdFx0UmVhY3Rpdml0eVRyYW5zZm9ybSgpLFxuXHRcdFx0cGx1Z2luVW53aW5kQ3NzTW9kdWxlQ2xhc3NOYW1lKCksXG5cdFx0XHRwbHVnaW5Kc29uNSgpLFxuXHRcdFx0Li4ucHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuXHRcdFx0XHQ/IFtcblx0XHRcdFx0XHRwbHVnaW5SZXBsYWNlKHtcblx0XHRcdFx0XHRcdHByZXZlbnRBc3NpZ25tZW50OiB0cnVlLFxuXHRcdFx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0XHRcdCdpc0Nocm9tYXRpYygpJzogSlNPTi5zdHJpbmdpZnkoZmFsc2UpLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XVxuXHRcdFx0XHQ6IFtdLFxuXHRcdF0sXG5cblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRleHRlbnNpb25zLFxuXHRcdFx0YWxpYXM6IHtcblx0XHRcdFx0J0AvJzogX19kaXJuYW1lICsgJy9zcmMvJyxcblx0XHRcdFx0Jy9jbGllbnQtYXNzZXRzLyc6IF9fZGlybmFtZSArICcvYXNzZXRzLycsXG5cdFx0XHRcdCcvc3RhdGljLWFzc2V0cy8nOiBfX2Rpcm5hbWUgKyAnLy4uL2JhY2tlbmQvYXNzZXRzLycsXG5cdFx0XHRcdCcvZmx1ZW50LWVtb2ppcy8nOiBfX2Rpcm5hbWUgKyAnLy4uLy4uL2ZsdWVudC1lbW9qaXMvZGlzdC8nLFxuXHRcdFx0XHQnL2ZsdWVudC1lbW9qaS8nOiBfX2Rpcm5hbWUgKyAnLy4uLy4uL2ZsdWVudC1lbW9qaXMvZGlzdC8nLFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0Y3NzOiB7XG5cdFx0XHRtb2R1bGVzOiB7XG5cdFx0XHRcdGdlbmVyYXRlU2NvcGVkTmFtZShuYW1lLCBmaWxlbmFtZSwgX2Nzcyk6IHN0cmluZyB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSAocGF0aC5yZWxhdGl2ZShfX2Rpcm5hbWUsIGZpbGVuYW1lLnNwbGl0KCc/JylbMF0pICsgJy0nICsgbmFtZSkucmVwbGFjZSgvW1xcXFxcXC9cXC5cXD8mPV0vZywgJy0nKS5yZXBsYWNlKC8oc3JjLXx2dWUtKS9nLCAnJyk7XG5cdFx0XHRcdFx0aWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAneCcgKyB0b0Jhc2U2MihoYXNoKGlkKSkuc3Vic3RyaW5nKDAsIDQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0ZGVmaW5lOiB7XG5cdFx0XHRfVkVSU0lPTl86IEpTT04uc3RyaW5naWZ5KG1ldGEudmVyc2lvbiksXG5cdFx0XHRfTEFOR1NfOiBKU09OLnN0cmluZ2lmeShPYmplY3QuZW50cmllcyhsb2NhbGVzKS5tYXAoKFtrLCB2XSkgPT4gW2ssIHYuX2xhbmdfXSkpLFxuXHRcdFx0X0VOVl86IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lk5PREVfRU5WKSxcblx0XHRcdF9ERVZfOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXHRcdFx0X1BFUkZfUFJFRklYXzogSlNPTi5zdHJpbmdpZnkoJ01pc3NrZXk6JyksXG5cdFx0XHRfREFUQV9UUkFOU0ZFUl9EUklWRV9GSUxFXzogSlNPTi5zdHJpbmdpZnkoJ21rX2RyaXZlX2ZpbGUnKSxcblx0XHRcdF9EQVRBX1RSQU5TRkVSX0RSSVZFX0ZPTERFUl86IEpTT04uc3RyaW5naWZ5KCdta19kcml2ZV9mb2xkZXInKSxcblx0XHRcdF9EQVRBX1RSQU5TRkVSX0RFQ0tfQ09MVU1OXzogSlNPTi5zdHJpbmdpZnkoJ21rX2RlY2tfY29sdW1uJyksXG5cdFx0XHRfX1ZVRV9PUFRJT05TX0FQSV9fOiB0cnVlLFxuXHRcdFx0X19WVUVfUFJPRF9ERVZUT09MU19fOiBmYWxzZSxcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2RlcC1wcmUtYnVuZGxpbmcuaHRtbCNtb25vcmVwb3MtYW5kLWxpbmtlZC1kZXBlbmRlbmNpZXNcblx0XHRvcHRpbWl6ZURlcHM6IHtcblx0XHRcdGluY2x1ZGU6IFsnbWlzc2tleS1qcyddLFxuXHRcdH0sXG5cblx0XHRidWlsZDoge1xuXHRcdFx0dGFyZ2V0OiBbXG5cdFx0XHRcdCdjaHJvbWUxMTYnLFxuXHRcdFx0XHQnZmlyZWZveDExNicsXG5cdFx0XHRcdCdzYWZhcmkxNicsXG5cdFx0XHRdLFxuXHRcdFx0bWFuaWZlc3Q6ICdtYW5pZmVzdC5qc29uJyxcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0aW5wdXQ6IHtcblx0XHRcdFx0XHRhcHA6ICcuL3NyYy9fYm9vdF8udHMnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvdXRwdXQ6IHtcblx0XHRcdFx0XHRtYW51YWxDaHVua3M6IHtcblx0XHRcdFx0XHRcdHZ1ZTogWyd2dWUnXSxcblx0XHRcdFx0XHRcdHBob3Rvc3dpcGU6IFsncGhvdG9zd2lwZScsICdwaG90b3N3aXBlL2xpZ2h0Ym94JywgJ3Bob3Rvc3dpcGUvc3R5bGUuY3NzJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRjaHVua0ZpbGVOYW1lczogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICdbaGFzaDo4XS5qcycgOiAnW25hbWVdLVtoYXNoOjhdLmpzJyxcblx0XHRcdFx0XHRhc3NldEZpbGVOYW1lczogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICdbaGFzaDo4XVtleHRuYW1lXScgOiAnW25hbWVdLVtoYXNoOjhdW2V4dG5hbWVdJyxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHRjc3NDb2RlU3BsaXQ6IHRydWUsXG5cdFx0XHRvdXREaXI6IF9fZGlybmFtZSArICcvLi4vLi4vYnVpbHQvX3ZpdGVfJyxcblx0XHRcdGFzc2V0c0RpcjogJy4nLFxuXHRcdFx0ZW1wdHlPdXREaXI6IGZhbHNlLFxuXHRcdFx0c291cmNlbWFwOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyxcblx0XHRcdHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcblxuXHRcdFx0Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2RlcC1wcmUtYnVuZGxpbmcuaHRtbCNtb25vcmVwb3MtYW5kLWxpbmtlZC1kZXBlbmRlbmNpZXNcblx0XHRcdGNvbW1vbmpzT3B0aW9uczoge1xuXHRcdFx0XHRpbmNsdWRlOiBbL21pc3NrZXktanMvLCAvbm9kZV9tb2R1bGVzL10sXG5cdFx0XHR9LFxuXHRcdH0sXG5cblx0XHR3b3JrZXI6IHtcblx0XHRcdGZvcm1hdDogJ2VzJyxcblx0XHR9LFxuXG5cdFx0dGVzdDoge1xuXHRcdFx0ZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxuXHRcdFx0ZGVwczoge1xuXHRcdFx0XHRpbmxpbmU6IFtcblx0XHRcdFx0XHQvLyBYWFg6IG1pc3NrZXktZGV2L2Jyb3dzZXItaW1hZ2UtcmVzaXplciBoYXMgbm8gXCJ0eXBlXCI6IFwibW9kdWxlXCJcblx0XHRcdFx0XHQnYnJvd3Nlci1pbWFnZS1yZXNpemVyJyxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgY29uZmlnID0gZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4gZ2V0Q29uZmlnKCkpO1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9sb2NhbGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvbG9jYWxlcy9pbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9taXNza2V5L21pc3NrZXkvbG9jYWxlcy9pbmRleC5qc1wiOy8qKlxuICogTGFuZ3VhZ2VzIExvYWRlclxuICovXG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0ICogYXMgeWFtbCBmcm9tICdqcy15YW1sJztcblxuY29uc3QgbWVyZ2UgPSAoLi4uYXJncykgPT4gYXJncy5yZWR1Y2UoKGEsIGMpID0+ICh7XG5cdC4uLmEsXG5cdC4uLmMsXG5cdC4uLk9iamVjdC5lbnRyaWVzKGEpXG5cdFx0LmZpbHRlcigoW2tdKSA9PiBjICYmIHR5cGVvZiBjW2tdID09PSAnb2JqZWN0Jylcblx0XHQucmVkdWNlKChhLCBbaywgdl0pID0+IChhW2tdID0gbWVyZ2UodiwgY1trXSksIGEpLCB7fSlcbn0pLCB7fSk7XG5cbmNvbnN0IGxhbmd1YWdlcyA9IFtcblx0J2FyLVNBJyxcblx0J2NzLUNaJyxcblx0J2RhLURLJyxcblx0J2RlLURFJyxcblx0J2VuLVVTJyxcblx0J2VzLUVTJyxcblx0J2ZyLUZSJyxcblx0J2lkLUlEJyxcblx0J2l0LUlUJyxcblx0J2phLUpQJyxcblx0J2phLUtTJyxcblx0J2thYi1LQUInLFxuXHQna24tSU4nLFxuXHQna28tS1InLFxuXHQnbmwtTkwnLFxuXHQnbm8tTk8nLFxuXHQncGwtUEwnLFxuXHQncHQtUFQnLFxuXHQncnUtUlUnLFxuXHQnc2stU0snLFxuXHQndGgtVEgnLFxuXHQndWctQ04nLFxuXHQndWstVUEnLFxuXHQndmktVk4nLFxuXHQnemgtQ04nLFxuXHQnemgtVFcnLFxuXTtcblxuY29uc3QgcHJpbWFyaWVzID0ge1xuXHQnZW4nOiAnVVMnLFxuXHQnamEnOiAnSlAnLFxuXHQnemgnOiAnQ04nLFxufTtcblxuLy8gXHU0RjU1XHU2NTQ1XHUzMDRCXHU2NTg3XHU1QjU3XHU1MjE3XHUzMDZCXHUzMEQwXHUzMEMzXHUzMEFGXHUzMEI5XHUzMERBXHUzMEZDXHUzMEI5XHU2NTg3XHU1QjU3XHUzMDRDXHU2REY3XHU1MTY1XHUzMDU5XHUzMDhCXHUzMDUzXHUzMDY4XHUzMDRDXHUzMDQyXHUzMDhBXHUzMDAxWUFNTFx1MzA0Q1x1NThDQVx1MzA4Q1x1MzA4Qlx1MzA2RVx1MzA2N1x1NTNENlx1MzA4QVx1OTY2NFx1MzA0RlxuY29uc3QgY2xlYW4gPSAodGV4dCkgPT4gdGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAoU3RyaW5nLmZyb21Db2RlUG9pbnQoMHgwOCksICdnJyksICcnKTtcblxuY29uc3QgbG9jYWxlcyA9IGxhbmd1YWdlcy5yZWR1Y2UoKGEsIGMpID0+IChhW2NdID0geWFtbC5sb2FkKGNsZWFuKGZzLnJlYWRGaWxlU3luYyhuZXcgVVJMKGAke2N9LnltbGAsIGltcG9ydC5tZXRhLnVybCksICd1dGYtOCcpKSkgfHwge30sIGEpLCB7fSk7XG5cbi8vIFx1N0E3QVx1NjU4N1x1NUI1N1x1NTIxN1x1MzA0Q1x1NTE2NVx1MzA4Qlx1MzA1M1x1MzA2OFx1MzA0Q1x1MzA0Mlx1MzA4QVx1MzAwMVx1MzBENVx1MzBBOVx1MzBGQ1x1MzBFQlx1MzBEMFx1MzBDM1x1MzBBRlx1MzA0Q1x1NTJENVx1NEY1Q1x1MzA1N1x1MzA2QVx1MzA0Rlx1MzA2QVx1MzA4Qlx1MzA2RVx1MzA2N1x1MzBEN1x1MzBFRFx1MzBEMVx1MzBDNlx1MzBBM1x1MzA1NFx1MzA2OFx1NkQ4OFx1MzA1OVxuY29uc3QgcmVtb3ZlRW1wdHkgPSAob2JqKSA9PiB7XG5cdGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcblx0XHRpZiAodiA9PT0gJycpIHtcblx0XHRcdGRlbGV0ZSBvYmpba107XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ29iamVjdCcpIHtcblx0XHRcdHJlbW92ZUVtcHR5KHYpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gb2JqO1xufTtcbnJlbW92ZUVtcHR5KGxvY2FsZXMpO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZW50cmllcyhsb2NhbGVzKVxuXHQucmVkdWNlKChhLCBbayAsdl0pID0+IChhW2tdID0gKCgpID0+IHtcblx0XHRjb25zdCBbbGFuZ10gPSBrLnNwbGl0KCctJyk7XG5cdFx0c3dpdGNoIChrKSB7XG5cdFx0XHRjYXNlICdqYS1KUCc6IHJldHVybiB2O1xuXHRcdFx0Y2FzZSAnamEtS1MnOlxuXHRcdFx0Y2FzZSAnZW4tVVMnOiByZXR1cm4gbWVyZ2UobG9jYWxlc1snamEtSlAnXSwgdik7XG5cdFx0XHRkZWZhdWx0OiByZXR1cm4gbWVyZ2UoXG5cdFx0XHRcdGxvY2FsZXNbJ2phLUpQJ10sXG5cdFx0XHRcdGxvY2FsZXNbJ2VuLVVTJ10sXG5cdFx0XHRcdGxvY2FsZXNbYCR7bGFuZ30tJHtwcmltYXJpZXNbbGFuZ119YF0gPz8ge30sXG5cdFx0XHRcdHZcblx0XHRcdCk7XG5cdFx0fVxuXHR9KSgpLCBhKSwge30pO1xuIiwgIntcblx0XCJuYW1lXCI6IFwibWlzc2tleVwiLFxuXHRcInZlcnNpb25cIjogXCIyMDIzLjExLjAtOWluZS00LjEuMlwiLFxuXHRcImNvZGVuYW1lXCI6IFwiVE9BUlVcIixcblx0XCJyZXBvc2l0b3J5XCI6IHtcblx0XHRcInR5cGVcIjogXCJnaXRcIixcblx0XHRcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS85aW5ldmVyc2UtZGV2L1R5cGUtOWluZS5naXRcIlxuXHR9LFxuXHRcInBhY2thZ2VNYW5hZ2VyXCI6IFwicG5wbUA4LjEwLjBcIixcblx0XCJ3b3Jrc3BhY2VzXCI6IFtcblx0XHRcInBhY2thZ2VzL2Zyb250ZW5kXCIsXG5cdFx0XCJwYWNrYWdlcy9iYWNrZW5kXCIsXG5cdFx0XCJwYWNrYWdlcy9zd1wiXG5cdF0sXG5cdFwicHJpdmF0ZVwiOiB0cnVlLFxuXHRcInNjcmlwdHNcIjoge1xuXHRcdFwiYnVpbGQtcHJlXCI6IFwibm9kZSAuL3NjcmlwdHMvYnVpbGQtcHJlLmpzXCIsXG5cdFx0XCJidWlsZC1hc3NldHNcIjogXCJub2RlIC4vc2NyaXB0cy9idWlsZC1hc3NldHMubWpzXCIsXG5cdFx0XCJidWlsZFwiOiBcInBucG0gYnVpbGQtcHJlICYmIHBucG0gLXIgYnVpbGQgJiYgcG5wbSBidWlsZC1hc3NldHNcIixcblx0XHRcImJ1aWxkLXN0b3J5Ym9va1wiOiBcInBucG0gLS1maWx0ZXIgZnJvbnRlbmQgYnVpbGQtc3Rvcnlib29rXCIsXG5cdFx0XCJzdGFydFwiOiBcInBucG0gY2hlY2s6Y29ubmVjdCAmJiBjZCBwYWNrYWdlcy9iYWNrZW5kICYmIG5vZGUgLi9idWlsdC9ib290L2VudHJ5LmpzXCIsXG5cdFx0XCJzdGFydDp0ZXN0XCI6IFwiY2QgcGFja2FnZXMvYmFja2VuZCAmJiBjcm9zcy1lbnYgTk9ERV9FTlY9dGVzdCBub2RlIC4vYnVpbHQvYm9vdC9lbnRyeS5qc1wiLFxuXHRcdFwiaW5pdFwiOiBcInBucG0gbWlncmF0ZVwiLFxuXHRcdFwibWlncmF0ZVwiOiBcImNkIHBhY2thZ2VzL2JhY2tlbmQgJiYgcG5wbSBtaWdyYXRlXCIsXG5cdFx0XCJyZXZlcnRcIjogXCJjZCBwYWNrYWdlcy9iYWNrZW5kICYmIHBucG0gcmV2ZXJ0XCIsXG5cdFx0XCJjaGVjazpjb25uZWN0XCI6IFwiY2QgcGFja2FnZXMvYmFja2VuZCAmJiBwbnBtIGNoZWNrOmNvbm5lY3RcIixcblx0XHRcIm1pZ3JhdGVhbmRzdGFydFwiOiBcInBucG0gbWlncmF0ZSAmJiBwbnBtIHN0YXJ0XCIsXG5cdFx0XCJ3YXRjaFwiOiBcInBucG0gZGV2XCIsXG5cdFx0XCJkZXZcIjogXCJub2RlIC4vc2NyaXB0cy9kZXYubWpzXCIsXG5cdFx0XCJsaW50XCI6IFwicG5wbSAtciBsaW50XCIsXG5cdFx0XCJjeTpvcGVuXCI6IFwicG5wbSBjeXByZXNzIG9wZW4gLS1icm93c2VyIC0tZTJlIC0tY29uZmlnLWZpbGU9Y3lwcmVzcy5jb25maWcudHNcIixcblx0XHRcImN5OnJ1blwiOiBcInBucG0gY3lwcmVzcyBydW5cIixcblx0XHRcImUyZVwiOiBcInBucG0gc3RhcnQtc2VydmVyLWFuZC10ZXN0IHN0YXJ0OnRlc3QgaHR0cDovL2xvY2FsaG9zdDo2MTgxMiBjeTpydW5cIixcblx0XHRcImplc3RcIjogXCJjZCBwYWNrYWdlcy9iYWNrZW5kICYmIHBucG0gamVzdFwiLFxuXHRcdFwiamVzdC1hbmQtY292ZXJhZ2VcIjogXCJjZCBwYWNrYWdlcy9iYWNrZW5kICYmIHBucG0gamVzdC1hbmQtY292ZXJhZ2VcIixcblx0XHRcInRlc3RcIjogXCJwbnBtIC1yIHRlc3RcIixcblx0XHRcInRlc3QtYW5kLWNvdmVyYWdlXCI6IFwicG5wbSAtciB0ZXN0LWFuZC1jb3ZlcmFnZVwiLFxuXHRcdFwiY2xlYW5cIjogXCJub2RlIC4vc2NyaXB0cy9jbGVhbi5qc1wiLFxuXHRcdFwiY2xlYW4tYWxsXCI6IFwibm9kZSAuL3NjcmlwdHMvY2xlYW4tYWxsLmpzXCIsXG5cdFx0XCJjbGVhbmFsbFwiOiBcInBucG0gY2xlYW4tYWxsXCJcblx0fSxcblx0XCJyZXNvbHV0aW9uc1wiOiB7XG5cdFx0XCJjaG9raWRhclwiOiBcIjMuNS4zXCIsXG5cdFx0XCJsb2Rhc2hcIjogXCI0LjE3LjIxXCJcblx0fSxcblx0XCJkZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiZXhlY2FcIjogXCI4LjAuMVwiLFxuXHRcdFwiY3NzbmFub1wiOiBcIjYuMC4xXCIsXG5cdFx0XCJqcy15YW1sXCI6IFwiNC4xLjBcIixcblx0XHRcInBvc3Rjc3NcIjogXCI4LjQuMzFcIixcblx0XHRcInRlcnNlclwiOiBcIjUuMjQuMFwiLFxuXHRcdFwidHlwZXNjcmlwdFwiOiBcIjUuMi4yXCJcblx0fSxcblx0XCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCI2LjkuMVwiLFxuXHRcdFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIjYuOS4xXCIsXG5cdFx0XCJjcm9zcy1lbnZcIjogXCI3LjAuM1wiLFxuXHRcdFwiY3lwcmVzc1wiOiBcIjEzLjQuMFwiLFxuXHRcdFwiZXNsaW50XCI6IFwiOC41Mi4wXCIsXG5cdFx0XCJzdGFydC1zZXJ2ZXItYW5kLXRlc3RcIjogXCIyLjAuMVwiXG5cdH0sXG5cdFwib3B0aW9uYWxEZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiQHRlbnNvcmZsb3cvdGZqcy1jb3JlXCI6IFwiNC40LjBcIlxuXHR9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZC9saWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZC9saWIvcm9sbHVwLXBsdWdpbi11bndpbmQtY3NzLW1vZHVsZS1jbGFzcy1uYW1lLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZC9saWIvcm9sbHVwLXBsdWdpbi11bndpbmQtY3NzLW1vZHVsZS1jbGFzcy1uYW1lLnRzXCI7LypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IHN5dWlsbyBhbmQgb3RoZXIgbWlzc2tleSBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG4gKi9cblxuaW1wb3J0IHsgZ2VuZXJhdGUgfSBmcm9tICdhc3RyaW5nJztcbmltcG9ydCAqIGFzIGVzdHJlZSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgd2FsayB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9pbmRleC5qcyc7XG5pbXBvcnQgdHlwZSAqIGFzIGVzdHJlZVdhbGtlciBmcm9tICdlc3RyZWUtd2Fsa2VyJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5cbmZ1bmN0aW9uIGlzRmFsc3lJZGVudGlmaWVyKGlkZW50aWZpZXI6IGVzdHJlZS5JZGVudGlmaWVyKTogYm9vbGVhbiB7XG5cdHJldHVybiBpZGVudGlmaWVyLm5hbWUgPT09ICd1bmRlZmluZWQnIHx8IGlkZW50aWZpZXIubmFtZSA9PT0gJ05hTic7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNsYXNzV2Fsa2VyKHRyZWU6IGVzdHJlZS5Ob2RlKTogc3RyaW5nIHwgbnVsbCB7XG5cdGlmICh0cmVlLnR5cGUgPT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGlzRmFsc3lJZGVudGlmaWVyKHRyZWUpID8gJycgOiBudWxsO1xuXHRpZiAodHJlZS50eXBlID09PSAnTGl0ZXJhbCcpIHJldHVybiB0eXBlb2YgdHJlZS52YWx1ZSA9PT0gJ3N0cmluZycgPyB0cmVlLnZhbHVlIDogJyc7XG5cdGlmICh0cmVlLnR5cGUgPT09ICdCaW5hcnlFeHByZXNzaW9uJykge1xuXHRcdGlmICh0cmVlLm9wZXJhdG9yICE9PSAnKycpIHJldHVybiBudWxsO1xuXHRcdGNvbnN0IGxlZnQgPSBub3JtYWxpemVDbGFzc1dhbGtlcih0cmVlLmxlZnQpO1xuXHRcdGNvbnN0IHJpZ2h0ID0gbm9ybWFsaXplQ2xhc3NXYWxrZXIodHJlZS5yaWdodCk7XG5cdFx0aWYgKGxlZnQgPT09IG51bGwgfHwgcmlnaHQgPT09IG51bGwpIHJldHVybiBudWxsO1xuXHRcdHJldHVybiBgJHtsZWZ0fSR7cmlnaHR9YDtcblx0fVxuXHRpZiAodHJlZS50eXBlID09PSAnVGVtcGxhdGVMaXRlcmFsJykge1xuXHRcdGlmICh0cmVlLmV4cHJlc3Npb25zLnNvbWUoKHgpID0+IHgudHlwZSAhPT0gJ0xpdGVyYWwnICYmICh4LnR5cGUgIT09ICdJZGVudGlmaWVyJyB8fCAhaXNGYWxzeUlkZW50aWZpZXIoeCkpKSkgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIHRyZWUucXVhc2lzLnJlZHVjZSgoYSwgYywgaSkgPT4ge1xuXHRcdFx0Y29uc3QgdiA9IGkgPT09IHRyZWUucXVhc2lzLmxlbmd0aCAtIDEgPyAnJyA6ICh0cmVlLmV4cHJlc3Npb25zW2ldIGFzIFBhcnRpYWw8ZXN0cmVlLkxpdGVyYWw+KS52YWx1ZTtcblx0XHRcdHJldHVybiBhICsgYy52YWx1ZS5yYXcgKyAodHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6ICcnKTtcblx0XHR9LCAnJyk7XG5cdH1cblx0aWYgKHRyZWUudHlwZSA9PT0gJ0FycmF5RXhwcmVzc2lvbicpIHtcblx0XHRjb25zdCB2YWx1ZXMgPSB0cmVlLmVsZW1lbnRzLm1hcCgodHJlZU5vZGUpID0+IHtcblx0XHRcdGlmICh0cmVlTm9kZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXHRcdFx0aWYgKHRyZWVOb2RlLnR5cGUgPT09ICdTcHJlYWRFbGVtZW50JykgcmV0dXJuIG5vcm1hbGl6ZUNsYXNzV2Fsa2VyKHRyZWVOb2RlLmFyZ3VtZW50KTtcblx0XHRcdHJldHVybiBub3JtYWxpemVDbGFzc1dhbGtlcih0cmVlTm9kZSk7XG5cdFx0fSk7XG5cdFx0aWYgKHZhbHVlcy5zb21lKCh4KSA9PiB4ID09PSBudWxsKSkgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIHZhbHVlcy5qb2luKCcgJyk7XG5cdH1cblx0aWYgKHRyZWUudHlwZSA9PT0gJ09iamVjdEV4cHJlc3Npb24nKSB7XG5cdFx0Y29uc3QgdmFsdWVzID0gdHJlZS5wcm9wZXJ0aWVzLm1hcCgodHJlZU5vZGUpID0+IHtcblx0XHRcdGlmICh0cmVlTm9kZS50eXBlID09PSAnU3ByZWFkRWxlbWVudCcpIHJldHVybiBub3JtYWxpemVDbGFzc1dhbGtlcih0cmVlTm9kZS5hcmd1bWVudCk7XG5cdFx0XHRsZXQgeCA9IHRyZWVOb2RlLnZhbHVlO1xuXHRcdFx0bGV0IGludmV0ZWQgPSBmYWxzZTtcblx0XHRcdHdoaWxlICh4LnR5cGUgPT09ICdVbmFyeUV4cHJlc3Npb24nICYmIHgub3BlcmF0b3IgPT09ICchJykge1xuXHRcdFx0XHR4ID0geC5hcmd1bWVudDtcblx0XHRcdFx0aW52ZXRlZCA9ICFpbnZldGVkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHgudHlwZSA9PT0gJ0xpdGVyYWwnKSB7XG5cdFx0XHRcdGlmIChpbnZldGVkID09PSAheC52YWx1ZSkge1xuXHRcdFx0XHRcdHJldHVybiB0cmVlTm9kZS5rZXkudHlwZSA9PT0gJ0lkZW50aWZpZXInID8gdHJlZU5vZGUuY29tcHV0ZWQgPyBudWxsIDogdHJlZU5vZGUua2V5Lm5hbWUgOiB0cmVlTm9kZS5rZXkudHlwZSA9PT0gJ0xpdGVyYWwnID8gdHJlZU5vZGUua2V5LnZhbHVlIDogJyc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoeC50eXBlID09PSAnSWRlbnRpZmllcicpIHtcblx0XHRcdFx0aWYgKGludmV0ZWQgIT09IGlzRmFsc3lJZGVudGlmaWVyKHgpKSB7XG5cdFx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9KTtcblx0XHRpZiAodmFsdWVzLnNvbWUoKHgpID0+IHggPT09IG51bGwpKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gdmFsdWVzLmpvaW4oJyAnKTtcblx0fVxuXHRjb25zb2xlLmVycm9yKGBVbmV4cGVjdGVkIG5vZGUgdHlwZTogJHt0cmVlLnR5cGV9YCk7XG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQ2xhc3ModHJlZTogZXN0cmVlLk5vZGUpOiBzdHJpbmcgfCBudWxsIHtcblx0Y29uc3Qgd2Fsa2VkID0gbm9ybWFsaXplQ2xhc3NXYWxrZXIodHJlZSk7XG5cdHJldHVybiB3YWxrZWQgJiYgd2Fsa2VkLnJlcGxhY2UoL15cXHMrfFxccysoPz1cXHMpfFxccyskL2csICcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVud2luZENzc01vZHVsZUNsYXNzTmFtZShhc3Q6IGVzdHJlZS5Ob2RlKTogdm9pZCB7XG5cdCh3YWxrIGFzIHR5cGVvZiBlc3RyZWVXYWxrZXIud2FsaykoYXN0LCB7XG5cdFx0ZW50ZXIobm9kZSwgcGFyZW50KTogdm9pZCB7XG5cdFx0XHRpZiAocGFyZW50Py50eXBlICE9PSAnUHJvZ3JhbScpIHJldHVybjtcblx0XHRcdGlmIChub2RlLnR5cGUgIT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zLmxlbmd0aCAhPT0gMSkgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zWzBdLmlkLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuO1xuXHRcdFx0Y29uc3QgbmFtZSA9IG5vZGUuZGVjbGFyYXRpb25zWzBdLmlkLm5hbWU7XG5cdFx0XHRpZiAobm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdD8udHlwZSAhPT0gJ0NhbGxFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQuY2FsbGVlLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQuY2FsbGVlLm5hbWUgIT09ICdfZXhwb3J0X3NmYycpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50cy5sZW5ndGggIT09IDIpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1swXS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdGNvbnN0IGlkZW50ID0gbm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMF0ubmFtZTtcblx0XHRcdGlmICghaWRlbnQuc3RhcnRzV2l0aCgnX3NmY19tYWluJykpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1sxXS50eXBlICE9PSAnQXJyYXlFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQuYXJndW1lbnRzWzFdLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXHRcdFx0Y29uc3QgX19jc3NNb2R1bGVzSW5kZXggPSBub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1sxXS5lbGVtZW50cy5maW5kSW5kZXgoKHgpID0+IHtcblx0XHRcdFx0aWYgKHg/LnR5cGUgIT09ICdBcnJheUV4cHJlc3Npb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmVsZW1lbnRzLmxlbmd0aCAhPT0gMikgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5lbGVtZW50c1swXT8udHlwZSAhPT0gJ0xpdGVyYWwnKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmVsZW1lbnRzWzBdLnZhbHVlICE9PSAnX19jc3NNb2R1bGVzJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5lbGVtZW50c1sxXT8udHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoIX5fX2Nzc01vZHVsZXNJbmRleCkgcmV0dXJuO1xuXHRcdFx0Y29uc3QgY3NzTW9kdWxlRm9yZXN0TmFtZSA9ICgobm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMV0uZWxlbWVudHNbX19jc3NNb2R1bGVzSW5kZXhdIGFzIGVzdHJlZS5BcnJheUV4cHJlc3Npb24pLmVsZW1lbnRzWzFdIGFzIGVzdHJlZS5JZGVudGlmaWVyKS5uYW1lO1xuXHRcdFx0Y29uc3QgY3NzTW9kdWxlRm9yZXN0Tm9kZSA9IHBhcmVudC5ib2R5LmZpbmQoKHgpID0+IHtcblx0XHRcdFx0aWYgKHgudHlwZSAhPT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmRlY2xhcmF0aW9ucy5sZW5ndGggIT09IDEpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQubmFtZSAhPT0gY3NzTW9kdWxlRm9yZXN0TmFtZSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaW5pdD8udHlwZSAhPT0gJ09iamVjdEV4cHJlc3Npb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSkgYXMgdW5rbm93biBhcyBlc3RyZWUuVmFyaWFibGVEZWNsYXJhdGlvbjtcblx0XHRcdGNvbnN0IG1vZHVsZUZvcmVzdCA9IG5ldyBNYXAoKGNzc01vZHVsZUZvcmVzdE5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQgYXMgZXN0cmVlLk9iamVjdEV4cHJlc3Npb24pLnByb3BlcnRpZXMuZmxhdE1hcCgocHJvcGVydHkpID0+IHtcblx0XHRcdFx0aWYgKHByb3BlcnR5LnR5cGUgIT09ICdQcm9wZXJ0eScpIHJldHVybiBbXTtcblx0XHRcdFx0aWYgKHByb3BlcnR5LmtleS50eXBlICE9PSAnTGl0ZXJhbCcpIHJldHVybiBbXTtcblx0XHRcdFx0aWYgKHByb3BlcnR5LnZhbHVlLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIFtdO1xuXHRcdFx0XHRyZXR1cm4gW1twcm9wZXJ0eS5rZXkudmFsdWUgYXMgc3RyaW5nLCBwcm9wZXJ0eS52YWx1ZS5uYW1lIGFzIHN0cmluZ11dO1xuXHRcdFx0fSkpO1xuXHRcdFx0Y29uc3Qgc2ZjTWFpbiA9IHBhcmVudC5ib2R5LmZpbmQoKHgpID0+IHtcblx0XHRcdFx0aWYgKHgudHlwZSAhPT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmRlY2xhcmF0aW9ucy5sZW5ndGggIT09IDEpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQubmFtZSAhPT0gaWRlbnQpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KSBhcyB1bmtub3duIGFzIGVzdHJlZS5WYXJpYWJsZURlY2xhcmF0aW9uO1xuXHRcdFx0aWYgKHNmY01haW4uZGVjbGFyYXRpb25zWzBdLmluaXQ/LnR5cGUgIT09ICdDYWxsRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdGlmIChzZmNNYWluLmRlY2xhcmF0aW9uc1swXS5pbml0LmNhbGxlZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdGlmIChzZmNNYWluLmRlY2xhcmF0aW9uc1swXS5pbml0LmNhbGxlZS5uYW1lICE9PSAnZGVmaW5lQ29tcG9uZW50JykgcmV0dXJuO1xuXHRcdFx0aWYgKHNmY01haW4uZGVjbGFyYXRpb25zWzBdLmluaXQuYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkgcmV0dXJuO1xuXHRcdFx0aWYgKHNmY01haW4uZGVjbGFyYXRpb25zWzBdLmluaXQuYXJndW1lbnRzWzBdLnR5cGUgIT09ICdPYmplY3RFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0Y29uc3Qgc2V0dXAgPSBzZmNNYWluLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1swXS5wcm9wZXJ0aWVzLmZpbmQoKHgpID0+IHtcblx0XHRcdFx0aWYgKHgudHlwZSAhPT0gJ1Byb3BlcnR5JykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5rZXkudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmtleS5uYW1lICE9PSAnc2V0dXAnKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSkgYXMgdW5rbm93biBhcyBlc3RyZWUuUHJvcGVydHk7XG5cdFx0XHRpZiAoc2V0dXAudmFsdWUudHlwZSAhPT0gJ0Z1bmN0aW9uRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdGNvbnN0IHJlbmRlciA9IHNldHVwLnZhbHVlLmJvZHkuYm9keS5maW5kKCh4KSA9PiB7XG5cdFx0XHRcdGlmICh4LnR5cGUgIT09ICdSZXR1cm5TdGF0ZW1lbnQnKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSkgYXMgdW5rbm93biBhcyBlc3RyZWUuUmV0dXJuU3RhdGVtZW50O1xuXHRcdFx0aWYgKHJlbmRlci5hcmd1bWVudD8udHlwZSAhPT0gJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0aWYgKHJlbmRlci5hcmd1bWVudC5wYXJhbXMubGVuZ3RoICE9PSAyKSByZXR1cm47XG5cdFx0XHRjb25zdCBjdHggPSByZW5kZXIuYXJndW1lbnQucGFyYW1zWzBdO1xuXHRcdFx0aWYgKGN0eC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdGlmIChjdHgubmFtZSAhPT0gJ19jdHgnKSByZXR1cm47XG5cdFx0XHRpZiAocmVuZGVyLmFyZ3VtZW50LmJvZHkudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50JykgcmV0dXJuO1xuXHRcdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgbW9kdWxlRm9yZXN0KSB7XG5cdFx0XHRcdGNvbnN0IGNzc01vZHVsZVRyZWVOb2RlID0gcGFyZW50LmJvZHkuZmluZCgoeCkgPT4ge1xuXHRcdFx0XHRcdGlmICh4LnR5cGUgIT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdGlmICh4LmRlY2xhcmF0aW9ucy5sZW5ndGggIT09IDEpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLm5hbWUgIT09IHZhbHVlKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pIGFzIHVua25vd24gYXMgZXN0cmVlLlZhcmlhYmxlRGVjbGFyYXRpb247XG5cdFx0XHRcdGlmIChjc3NNb2R1bGVUcmVlTm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdD8udHlwZSAhPT0gJ09iamVjdEV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRcdGNvbnN0IG1vZHVsZVRyZWUgPSBuZXcgTWFwKGNzc01vZHVsZVRyZWVOb2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LnByb3BlcnRpZXMuZmxhdE1hcCgocHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHRpZiAocHJvcGVydHkudHlwZSAhPT0gJ1Byb3BlcnR5JykgcmV0dXJuIFtdO1xuXHRcdFx0XHRcdGNvbnN0IGFjdHVhbEtleSA9IHByb3BlcnR5LmtleS50eXBlID09PSAnSWRlbnRpZmllcicgPyBwcm9wZXJ0eS5rZXkubmFtZSA6IHByb3BlcnR5LmtleS50eXBlID09PSAnTGl0ZXJhbCcgPyBwcm9wZXJ0eS5rZXkudmFsdWUgOiBudWxsO1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgYWN0dWFsS2V5ICE9PSAnc3RyaW5nJykgcmV0dXJuIFtdO1xuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eS52YWx1ZS50eXBlID09PSAnTGl0ZXJhbCcpIHJldHVybiBbW2FjdHVhbEtleSwgcHJvcGVydHkudmFsdWUudmFsdWUgYXMgc3RyaW5nXV07XG5cdFx0XHRcdFx0aWYgKHByb3BlcnR5LnZhbHVlLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIFtdO1xuXHRcdFx0XHRcdGNvbnN0IGxhYmVsbGVkVmFsdWUgPSBwcm9wZXJ0eS52YWx1ZS5uYW1lO1xuXHRcdFx0XHRcdGNvbnN0IGFjdHVhbFZhbHVlID0gcGFyZW50LmJvZHkuZmluZCgoeCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHgudHlwZSAhPT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQubmFtZSAhPT0gbGFiZWxsZWRWYWx1ZSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fSkgYXMgdW5rbm93biBhcyBlc3RyZWUuVmFyaWFibGVEZWNsYXJhdGlvbjtcblx0XHRcdFx0XHRpZiAoYWN0dWFsVmFsdWUuZGVjbGFyYXRpb25zWzBdLmluaXQ/LnR5cGUgIT09ICdMaXRlcmFsJykgcmV0dXJuIFtdO1xuXHRcdFx0XHRcdHJldHVybiBbW2FjdHVhbEtleSwgYWN0dWFsVmFsdWUuZGVjbGFyYXRpb25zWzBdLmluaXQudmFsdWUgYXMgc3RyaW5nXV07XG5cdFx0XHRcdH0pKTtcblx0XHRcdFx0KHdhbGsgYXMgdHlwZW9mIGVzdHJlZVdhbGtlci53YWxrKShyZW5kZXIuYXJndW1lbnQuYm9keSwge1xuXHRcdFx0XHRcdGVudGVyKGNoaWxkTm9kZSkge1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS50eXBlICE9PSAnTWVtYmVyRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0LnR5cGUgIT09ICdNZW1iZXJFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5vYmplY3Qub2JqZWN0LnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5vYmplY3Qub2JqZWN0Lm5hbWUgIT09IGN0eC5uYW1lKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC5wcm9wZXJ0eS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0LnByb3BlcnR5Lm5hbWUgIT09IGtleSkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5wcm9wZXJ0eS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdFx0XHRcdGNvbnN0IGFjdHVhbFZhbHVlID0gbW9kdWxlVHJlZS5nZXQoY2hpbGROb2RlLnByb3BlcnR5Lm5hbWUpO1xuXHRcdFx0XHRcdFx0aWYgKGFjdHVhbFZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybjtcblx0XHRcdFx0XHRcdHRoaXMucmVwbGFjZSh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdMaXRlcmFsJyxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IGFjdHVhbFZhbHVlLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCh3YWxrIGFzIHR5cGVvZiBlc3RyZWVXYWxrZXIud2FsaykocmVuZGVyLmFyZ3VtZW50LmJvZHksIHtcblx0XHRcdFx0XHRlbnRlcihjaGlsZE5vZGUpIHtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUudHlwZSAhPT0gJ01lbWJlckV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC50eXBlICE9PSAnTWVtYmVyRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0Lm9iamVjdC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0Lm9iamVjdC5uYW1lICE9PSBjdHgubmFtZSkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5vYmplY3QucHJvcGVydHkudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC5wcm9wZXJ0eS5uYW1lICE9PSBrZXkpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUucHJvcGVydHkudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGBVbmRlZmluZWQgc3R5bGUgZGV0ZWN0ZWQ6ICR7a2V5fS4ke2NoaWxkTm9kZS5wcm9wZXJ0eS5uYW1lfSAoaW4gJHtuYW1lfSlgKTtcblx0XHRcdFx0XHRcdHRoaXMucmVwbGFjZSh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdJZGVudGlmaWVyJyxcblx0XHRcdFx0XHRcdFx0bmFtZTogJ3VuZGVmaW5lZCcsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0KHdhbGsgYXMgdHlwZW9mIGVzdHJlZVdhbGtlci53YWxrKShyZW5kZXIuYXJndW1lbnQuYm9keSwge1xuXHRcdFx0XHRcdGVudGVyKGNoaWxkTm9kZSkge1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS50eXBlICE9PSAnQ2FsbEV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLmNhbGxlZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUuY2FsbGVlLm5hbWUgIT09ICdub3JtYWxpemVDbGFzcycpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUuYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0Y29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUNsYXNzKGNoaWxkTm9kZS5hcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdFx0aWYgKG5vcm1hbGl6ZWQgPT09IG51bGwpIHJldHVybjtcblx0XHRcdFx0XHRcdHRoaXMucmVwbGFjZSh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdMaXRlcmFsJyxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IG5vcm1hbGl6ZWQsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1sxXS5lbGVtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0dGhpcy5yZXBsYWNlKHtcblx0XHRcdFx0XHR0eXBlOiAnVmFyaWFibGVEZWNsYXJhdGlvbicsXG5cdFx0XHRcdFx0ZGVjbGFyYXRpb25zOiBbe1xuXHRcdFx0XHRcdFx0dHlwZTogJ1ZhcmlhYmxlRGVjbGFyYXRvcicsXG5cdFx0XHRcdFx0XHRpZDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnSWRlbnRpZmllcicsXG5cdFx0XHRcdFx0XHRcdG5hbWU6IG5vZGUuZGVjbGFyYXRpb25zWzBdLmlkLm5hbWUsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0aW5pdDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnSWRlbnRpZmllcicsXG5cdFx0XHRcdFx0XHRcdG5hbWU6IGlkZW50LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRraW5kOiAnY29uc3QnLFxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMucmVwbGFjZSh7XG5cdFx0XHRcdFx0dHlwZTogJ1ZhcmlhYmxlRGVjbGFyYXRpb24nLFxuXHRcdFx0XHRcdGRlY2xhcmF0aW9uczogW3tcblx0XHRcdFx0XHRcdHR5cGU6ICdWYXJpYWJsZURlY2xhcmF0b3InLFxuXHRcdFx0XHRcdFx0aWQ6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ0lkZW50aWZpZXInLFxuXHRcdFx0XHRcdFx0XHRuYW1lOiBub2RlLmRlY2xhcmF0aW9uc1swXS5pZC5uYW1lLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGluaXQ6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ0NhbGxFeHByZXNzaW9uJyxcblx0XHRcdFx0XHRcdFx0Y2FsbGVlOiB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ0lkZW50aWZpZXInLFxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICdfZXhwb3J0X3NmYycsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGFyZ3VtZW50czogW3tcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAnSWRlbnRpZmllcicsXG5cdFx0XHRcdFx0XHRcdFx0bmFtZTogaWRlbnQsXG5cdFx0XHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAnQXJyYXlFeHByZXNzaW9uJyxcblx0XHRcdFx0XHRcdFx0XHRlbGVtZW50czogbm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMV0uZWxlbWVudHMuc2xpY2UoMCwgX19jc3NNb2R1bGVzSW5kZXgpLmNvbmNhdChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1sxXS5lbGVtZW50cy5zbGljZShfX2Nzc01vZHVsZXNJbmRleCArIDEpKSxcblx0XHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdGtpbmQ6ICdjb25zdCcsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH0pO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbHVnaW5VbndpbmRDc3NNb2R1bGVDbGFzc05hbWUoKTogUGx1Z2luIHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiAnVW53aW5kQ3NzTW9kdWxlQ2xhc3NOYW1lJyxcblx0XHRyZW5kZXJDaHVuayhjb2RlKTogeyBjb2RlOiBzdHJpbmcgfSB7XG5cdFx0XHRjb25zdCBhc3QgPSB0aGlzLnBhcnNlKGNvZGUpIGFzIHVua25vd24gYXMgZXN0cmVlLk5vZGU7XG5cdFx0XHR1bndpbmRDc3NNb2R1bGVDbGFzc05hbWUoYXN0KTtcblx0XHRcdHJldHVybiB7IGNvZGU6IGdlbmVyYXRlKGFzdCkgfTtcblx0XHR9LFxuXHR9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvbm9kZV9tb2R1bGVzLy5wbnBtL2VzdHJlZS13YWxrZXJAMy4wLjMvbm9kZV9tb2R1bGVzL2VzdHJlZS13YWxrZXIvc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvbm9kZV9tb2R1bGVzLy5wbnBtL2VzdHJlZS13YWxrZXJAMy4wLjMvbm9kZV9tb2R1bGVzL2VzdHJlZS13YWxrZXIvc3JjL3dhbGtlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9taXNza2V5L21pc3NrZXkvbm9kZV9tb2R1bGVzLy5wbnBtL2VzdHJlZS13YWxrZXJAMy4wLjMvbm9kZV9tb2R1bGVzL2VzdHJlZS13YWxrZXIvc3JjL3dhbGtlci5qc1wiOy8qKlxuICogQHR5cGVkZWYgeyBpbXBvcnQoJ2VzdHJlZScpLk5vZGV9IE5vZGVcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHNraXA6ICgpID0+IHZvaWQ7XG4gKiAgIHJlbW92ZTogKCkgPT4gdm9pZDtcbiAqICAgcmVwbGFjZTogKG5vZGU6IE5vZGUpID0+IHZvaWQ7XG4gKiB9fSBXYWxrZXJDb250ZXh0XG4gKi9cblxuZXhwb3J0IGNsYXNzIFdhbGtlckJhc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0dGhpcy5zaG91bGRfc2tpcCA9IGZhbHNlO1xuXG5cdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IGZhbHNlO1xuXG5cdFx0LyoqIEB0eXBlIHtOb2RlIHwgbnVsbH0gKi9cblx0XHR0aGlzLnJlcGxhY2VtZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7V2Fsa2VyQ29udGV4dH0gKi9cblx0XHR0aGlzLmNvbnRleHQgPSB7XG5cdFx0XHRza2lwOiAoKSA9PiAodGhpcy5zaG91bGRfc2tpcCA9IHRydWUpLFxuXHRcdFx0cmVtb3ZlOiAoKSA9PiAodGhpcy5zaG91bGRfcmVtb3ZlID0gdHJ1ZSksXG5cdFx0XHRyZXBsYWNlOiAobm9kZSkgPT4gKHRoaXMucmVwbGFjZW1lbnQgPSBub2RlKVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIHtOb2RlfSBQYXJlbnRcblx0ICogQHBhcmFtIHtQYXJlbnQgfCBudWxsIHwgdW5kZWZpbmVkfSBwYXJlbnRcblx0ICogQHBhcmFtIHtrZXlvZiBQYXJlbnQgfCBudWxsIHwgdW5kZWZpbmVkfSBwcm9wXG5cdCAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gaW5kZXhcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdCAqL1xuXHRyZXBsYWNlKHBhcmVudCwgcHJvcCwgaW5kZXgsIG5vZGUpIHtcblx0XHRpZiAocGFyZW50ICYmIHByb3ApIHtcblx0XHRcdGlmIChpbmRleCAhPSBudWxsKSB7XG5cdFx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8Tm9kZT59ICovIChwYXJlbnRbcHJvcF0pW2luZGV4XSA9IG5vZGU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvKiogQHR5cGUge05vZGV9ICovIChwYXJlbnRbcHJvcF0pID0gbm9kZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIHtOb2RlfSBQYXJlbnRcblx0ICogQHBhcmFtIHtQYXJlbnQgfCBudWxsIHwgdW5kZWZpbmVkfSBwYXJlbnRcblx0ICogQHBhcmFtIHtrZXlvZiBQYXJlbnQgfCBudWxsIHwgdW5kZWZpbmVkfSBwcm9wXG5cdCAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gaW5kZXhcblx0ICovXG5cdHJlbW92ZShwYXJlbnQsIHByb3AsIGluZGV4KSB7XG5cdFx0aWYgKHBhcmVudCAmJiBwcm9wKSB7XG5cdFx0XHRpZiAoaW5kZXggIT09IG51bGwgJiYgaW5kZXggIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvKiogQHR5cGUge0FycmF5PE5vZGU+fSAqLyAocGFyZW50W3Byb3BdKS5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVsZXRlIHBhcmVudFtwcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9zeW5jLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21pc3NrZXkvbWlzc2tleS9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvc3luYy5qc1wiO2ltcG9ydCB7IFdhbGtlckJhc2UgfSBmcm9tICcuL3dhbGtlci5qcyc7XG5cbi8qKlxuICogQHR5cGVkZWYgeyBpbXBvcnQoJ2VzdHJlZScpLk5vZGV9IE5vZGVcbiAqIEB0eXBlZGVmIHsgaW1wb3J0KCcuL3dhbGtlci5qcycpLldhbGtlckNvbnRleHR9IFdhbGtlckNvbnRleHRcbiAqIEB0eXBlZGVmIHsoXG4gKiAgICB0aGlzOiBXYWxrZXJDb250ZXh0LFxuICogICAgbm9kZTogTm9kZSxcbiAqICAgIHBhcmVudDogTm9kZSB8IG51bGwsXG4gKiAgICBrZXk6IHN0cmluZyB8IG51bWJlciB8IHN5bWJvbCB8IG51bGwgfCB1bmRlZmluZWQsXG4gKiAgICBpbmRleDogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZFxuICogKSA9PiB2b2lkfSBTeW5jSGFuZGxlclxuICovXG5cbmV4cG9ydCBjbGFzcyBTeW5jV2Fsa2VyIGV4dGVuZHMgV2Fsa2VyQmFzZSB7XG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N5bmNIYW5kbGVyfSBbZW50ZXJdXG5cdCAqIEBwYXJhbSB7U3luY0hhbmRsZXJ9IFtsZWF2ZV1cblx0ICovXG5cdGNvbnN0cnVjdG9yKGVudGVyLCBsZWF2ZSkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0dGhpcy5zaG91bGRfc2tpcCA9IGZhbHNlO1xuXG5cdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IGZhbHNlO1xuXG5cdFx0LyoqIEB0eXBlIHtOb2RlIHwgbnVsbH0gKi9cblx0XHR0aGlzLnJlcGxhY2VtZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7V2Fsa2VyQ29udGV4dH0gKi9cblx0XHR0aGlzLmNvbnRleHQgPSB7XG5cdFx0XHRza2lwOiAoKSA9PiAodGhpcy5zaG91bGRfc2tpcCA9IHRydWUpLFxuXHRcdFx0cmVtb3ZlOiAoKSA9PiAodGhpcy5zaG91bGRfcmVtb3ZlID0gdHJ1ZSksXG5cdFx0XHRyZXBsYWNlOiAobm9kZSkgPT4gKHRoaXMucmVwbGFjZW1lbnQgPSBub2RlKVxuXHRcdH07XG5cblx0XHQvKiogQHR5cGUge1N5bmNIYW5kbGVyIHwgdW5kZWZpbmVkfSAqL1xuXHRcdHRoaXMuZW50ZXIgPSBlbnRlcjtcblxuXHRcdC8qKiBAdHlwZSB7U3luY0hhbmRsZXIgfCB1bmRlZmluZWR9ICovXG5cdFx0dGhpcy5sZWF2ZSA9IGxlYXZlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEB0ZW1wbGF0ZSB7Tm9kZX0gUGFyZW50XG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHQgKiBAcGFyYW0ge1BhcmVudCB8IG51bGx9IHBhcmVudFxuXHQgKiBAcGFyYW0ge2tleW9mIFBhcmVudH0gW3Byb3BdXG5cdCAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gW2luZGV4XVxuXHQgKiBAcmV0dXJucyB7Tm9kZSB8IG51bGx9XG5cdCAqL1xuXHR2aXNpdChub2RlLCBwYXJlbnQsIHByb3AsIGluZGV4KSB7XG5cdFx0aWYgKG5vZGUpIHtcblx0XHRcdGlmICh0aGlzLmVudGVyKSB7XG5cdFx0XHRcdGNvbnN0IF9zaG91bGRfc2tpcCA9IHRoaXMuc2hvdWxkX3NraXA7XG5cdFx0XHRcdGNvbnN0IF9zaG91bGRfcmVtb3ZlID0gdGhpcy5zaG91bGRfcmVtb3ZlO1xuXHRcdFx0XHRjb25zdCBfcmVwbGFjZW1lbnQgPSB0aGlzLnJlcGxhY2VtZW50O1xuXHRcdFx0XHR0aGlzLnNob3VsZF9za2lwID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLnJlcGxhY2VtZW50ID0gbnVsbDtcblxuXHRcdFx0XHR0aGlzLmVudGVyLmNhbGwodGhpcy5jb250ZXh0LCBub2RlLCBwYXJlbnQsIHByb3AsIGluZGV4KTtcblxuXHRcdFx0XHRpZiAodGhpcy5yZXBsYWNlbWVudCkge1xuXHRcdFx0XHRcdG5vZGUgPSB0aGlzLnJlcGxhY2VtZW50O1xuXHRcdFx0XHRcdHRoaXMucmVwbGFjZShwYXJlbnQsIHByb3AsIGluZGV4LCBub2RlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLnNob3VsZF9yZW1vdmUpIHtcblx0XHRcdFx0XHR0aGlzLnJlbW92ZShwYXJlbnQsIHByb3AsIGluZGV4KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHNraXBwZWQgPSB0aGlzLnNob3VsZF9za2lwO1xuXHRcdFx0XHRjb25zdCByZW1vdmVkID0gdGhpcy5zaG91bGRfcmVtb3ZlO1xuXG5cdFx0XHRcdHRoaXMuc2hvdWxkX3NraXAgPSBfc2hvdWxkX3NraXA7XG5cdFx0XHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IF9zaG91bGRfcmVtb3ZlO1xuXHRcdFx0XHR0aGlzLnJlcGxhY2VtZW50ID0gX3JlcGxhY2VtZW50O1xuXG5cdFx0XHRcdGlmIChza2lwcGVkKSByZXR1cm4gbm9kZTtcblx0XHRcdFx0aWYgKHJlbW92ZWQpIHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiogQHR5cGUge2tleW9mIE5vZGV9ICovXG5cdFx0XHRsZXQga2V5O1xuXG5cdFx0XHRmb3IgKGtleSBpbiBub2RlKSB7XG5cdFx0XHRcdC8qKiBAdHlwZSB7dW5rbm93bn0gKi9cblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBub2RlW2tleV07XG5cblx0XHRcdFx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG5vZGVzID0gLyoqIEB0eXBlIHtBcnJheTx1bmtub3duPn0gKi8gKHZhbHVlKTtcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgaXRlbSA9IG5vZGVzW2ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoaXNOb2RlKGl0ZW0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCF0aGlzLnZpc2l0KGl0ZW0sIG5vZGUsIGtleSwgaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIHJlbW92ZWRcblx0XHRcdFx0XHRcdFx0XHRcdGktLTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGlzTm9kZSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdHRoaXMudmlzaXQodmFsdWUsIG5vZGUsIGtleSwgbnVsbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLmxlYXZlKSB7XG5cdFx0XHRcdGNvbnN0IF9yZXBsYWNlbWVudCA9IHRoaXMucmVwbGFjZW1lbnQ7XG5cdFx0XHRcdGNvbnN0IF9zaG91bGRfcmVtb3ZlID0gdGhpcy5zaG91bGRfcmVtb3ZlO1xuXHRcdFx0XHR0aGlzLnJlcGxhY2VtZW50ID0gbnVsbDtcblx0XHRcdFx0dGhpcy5zaG91bGRfcmVtb3ZlID0gZmFsc2U7XG5cblx0XHRcdFx0dGhpcy5sZWF2ZS5jYWxsKHRoaXMuY29udGV4dCwgbm9kZSwgcGFyZW50LCBwcm9wLCBpbmRleCk7XG5cblx0XHRcdFx0aWYgKHRoaXMucmVwbGFjZW1lbnQpIHtcblx0XHRcdFx0XHRub2RlID0gdGhpcy5yZXBsYWNlbWVudDtcblx0XHRcdFx0XHR0aGlzLnJlcGxhY2UocGFyZW50LCBwcm9wLCBpbmRleCwgbm9kZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5zaG91bGRfcmVtb3ZlKSB7XG5cdFx0XHRcdFx0dGhpcy5yZW1vdmUocGFyZW50LCBwcm9wLCBpbmRleCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCByZW1vdmVkID0gdGhpcy5zaG91bGRfcmVtb3ZlO1xuXG5cdFx0XHRcdHRoaXMucmVwbGFjZW1lbnQgPSBfcmVwbGFjZW1lbnQ7XG5cdFx0XHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IF9zaG91bGRfcmVtb3ZlO1xuXG5cdFx0XHRcdGlmIChyZW1vdmVkKSByZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbm9kZTtcblx0fVxufVxuXG4vKipcbiAqIER1Y2t0eXBlIGEgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHZhbHVlXG4gKiBAcmV0dXJucyB7dmFsdWUgaXMgTm9kZX1cbiAqL1xuZnVuY3Rpb24gaXNOb2RlKHZhbHVlKSB7XG5cdHJldHVybiAoXG5cdFx0dmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAndHlwZScgaW4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnR5cGUgPT09ICdzdHJpbmcnXG5cdCk7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvaW5kZXguanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWlzc2tleS9taXNza2V5L25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9pbmRleC5qc1wiO2ltcG9ydCB7IFN5bmNXYWxrZXIgfSBmcm9tICcuL3N5bmMuanMnO1xuaW1wb3J0IHsgQXN5bmNXYWxrZXIgfSBmcm9tICcuL2FzeW5jLmpzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdlc3RyZWUnKS5Ob2RlfSBOb2RlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3N5bmMuanMnKS5TeW5jSGFuZGxlcn0gU3luY0hhbmRsZXJcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vYXN5bmMuanMnKS5Bc3luY0hhbmRsZXJ9IEFzeW5jSGFuZGxlclxuICovXG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBhc3RcbiAqIEBwYXJhbSB7e1xuICogICBlbnRlcj86IFN5bmNIYW5kbGVyXG4gKiAgIGxlYXZlPzogU3luY0hhbmRsZXJcbiAqIH19IHdhbGtlclxuICogQHJldHVybnMge05vZGUgfCBudWxsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2Fsayhhc3QsIHsgZW50ZXIsIGxlYXZlIH0pIHtcblx0Y29uc3QgaW5zdGFuY2UgPSBuZXcgU3luY1dhbGtlcihlbnRlciwgbGVhdmUpO1xuXHRyZXR1cm4gaW5zdGFuY2UudmlzaXQoYXN0LCBudWxsKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IGFzdFxuICogQHBhcmFtIHt7XG4gKiAgIGVudGVyPzogQXN5bmNIYW5kbGVyXG4gKiAgIGxlYXZlPzogQXN5bmNIYW5kbGVyXG4gKiB9fSB3YWxrZXJcbiAqIEByZXR1cm5zIHtQcm9taXNlPE5vZGUgfCBudWxsPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFzeW5jV2Fsayhhc3QsIHsgZW50ZXIsIGxlYXZlIH0pIHtcblx0Y29uc3QgaW5zdGFuY2UgPSBuZXcgQXN5bmNXYWxrZXIoZW50ZXIsIGxlYXZlKTtcblx0cmV0dXJuIGF3YWl0IGluc3RhbmNlLnZpc2l0KGFzdCwgbnVsbCk7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kL3ZpdGUuanNvbjUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kL3ZpdGUuanNvbjUudHNcIjsvLyBPcmlnaW5hbDogaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9wbHVnaW5zL3RyZWUvODgzNWRkMmFlZDkyZjQwOGQ3ZGM3MmQ3Y2MyNWE5NzI4ZTE2ZmFjZS9wYWNrYWdlcy9qc29uXG5cbmltcG9ydCBKU09ONSBmcm9tICdqc29uNSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICdyb2xsdXAnO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyLCBkYXRhVG9Fc20gfSBmcm9tICdAcm9sbHVwL3BsdWdpbnV0aWxzJztcbmltcG9ydCB7IFJvbGx1cEpzb25PcHRpb25zIH0gZnJvbSAnQHJvbGx1cC9wbHVnaW4tanNvbic7XG5cbi8vIGpzb241IGV4dGVuZHMgU3ludGF4RXJyb3Igd2l0aCBhZGRpdGlvbmFsIGZpZWxkcyAod2l0aG91dCBzdWJjbGFzc2luZylcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qc29uNS9qc29uNS9ibG9iL2RlMzQ0ZjA2MTliZGExNDY1YTZlMjVjNzZmMWMwYzNkZGE4MTA4ZDkvbGliL3BhcnNlLmpzI0wxMTExLUwxMTEyXG5pbnRlcmZhY2UgSnNvbjVTeW50YXhFcnJvciBleHRlbmRzIFN5bnRheEVycm9yIHtcblx0bGluZU51bWJlcjogbnVtYmVyO1xuXHRjb2x1bW5OdW1iZXI6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ganNvbjUob3B0aW9uczogUm9sbHVwSnNvbk9wdGlvbnMgPSB7fSk6IFBsdWdpbiB7XG5cdGNvbnN0IGZpbHRlciA9IGNyZWF0ZUZpbHRlcihvcHRpb25zLmluY2x1ZGUsIG9wdGlvbnMuZXhjbHVkZSk7XG5cdGNvbnN0IGluZGVudCA9ICdpbmRlbnQnIGluIG9wdGlvbnMgPyBvcHRpb25zLmluZGVudCA6ICdcXHQnO1xuXG5cdHJldHVybiB7XG5cdFx0bmFtZTogJ2pzb241JyxcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcblx0XHR0cmFuc2Zvcm0oanNvbiwgaWQpIHtcblx0XHRcdGlmIChpZC5zbGljZSgtNikgIT09ICcuanNvbjUnIHx8ICFmaWx0ZXIoaWQpKSByZXR1cm4gbnVsbDtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgcGFyc2VkID0gSlNPTjUucGFyc2UoanNvbik7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y29kZTogZGF0YVRvRXNtKHBhcnNlZCwge1xuXHRcdFx0XHRcdFx0cHJlZmVyQ29uc3Q6IG9wdGlvbnMucHJlZmVyQ29uc3QsXG5cdFx0XHRcdFx0XHRjb21wYWN0OiBvcHRpb25zLmNvbXBhY3QsXG5cdFx0XHRcdFx0XHRuYW1lZEV4cG9ydHM6IG9wdGlvbnMubmFtZWRFeHBvcnRzLFxuXHRcdFx0XHRcdFx0aW5kZW50LFxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdG1hcDogeyBtYXBwaW5nczogJycgfSxcblx0XHRcdFx0fTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAoIShlcnIgaW5zdGFuY2VvZiBTeW50YXhFcnJvcikpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgbWVzc2FnZSA9ICdDb3VsZCBub3QgcGFyc2UgSlNPTjUgZmlsZSc7XG5cdFx0XHRcdGNvbnN0IHsgbGluZU51bWJlciwgY29sdW1uTnVtYmVyIH0gPSBlcnIgYXMgSnNvbjVTeW50YXhFcnJvcjtcblx0XHRcdFx0dGhpcy53YXJuKHsgbWVzc2FnZSwgaWQsIGxvYzogeyBsaW5lOiBsaW5lTnVtYmVyLCBjb2x1bW46IGNvbHVtbk51bWJlciB9IH0pO1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UyxPQUFPLFVBQVU7QUFDeFQsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxlQUFlO0FBQ3RCLFNBQTBCLG9CQUFvQjtBQUU5QyxPQUFPLHlCQUF5Qjs7O0FDRGhDLFlBQVksUUFBUTtBQUNwQixZQUFZLFVBQVU7QUFMc0ksSUFBTSwyQ0FBMkM7QUFPN00sSUFBTSxRQUFRLElBQUksU0FBUyxLQUFLLE9BQU8sQ0FBQyxHQUFHLE9BQU87QUFBQSxFQUNqRCxHQUFHO0FBQUEsRUFDSCxHQUFHO0FBQUEsRUFDSCxHQUFHLE9BQU8sUUFBUSxDQUFDLEVBQ2pCLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRSxDQUFDLE1BQU0sUUFBUSxFQUM3QyxPQUFPLENBQUNBLElBQUcsQ0FBQyxHQUFHLENBQUMsT0FBT0EsR0FBRSxDQUFDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUdBLEtBQUksQ0FBQyxD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TUFDUCxXQUFXLEtBQUssVUFBVSxnQkFBSyxPQUFPO0FBQUEsTUFDdEMsU0FBUyxLQUFLLFVBQVUsT0FBTyxRQUFRLGVBQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUFBLE1BQzlFLE9BQU8sS0FBSyxVQUFVLFFBQVEsSUFBSSxRQUFRO0FBQUEsTUFDMUMsT0FBTyxRQUFRLElBQUksYUFBYTtBQUFBLE1BQ2hDLGVBQWUsS0FBSyxVQUFVLFVBQVU7QUFBQSxNQUN4Qyw0QkFBNEIsS0FBSyxVQUFVLGVBQWU7QUFBQSxNQUMxRCw4QkFBOEIsS0FBSyxVQUFVLGlCQUFpQjtBQUFBLE1BQzlELDZCQUE2QixLQUFLLFVBQVUsZ0JBQWdCO0FBQUEsTUFDNUQscUJBQXFCO0FBQUEsTUFDckIsdUJBQXVCO0FBQUEsSUFDeEI7QUFBQTtBQUFBLElBR0EsY0FBYztBQUFBLE1BQ2IsU0FBUyxDQUFDLFlBQVk7QUFBQSxJQUN2QjtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ04sUUFBUTtBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Q7QUFBQSxNQUNBLFVBQVU7QUFBQSxNQUNWLGVBQWU7QUFBQSxRQUNkLE9BQU87QUFBQSxVQUNOLEtBQUs7QUFBQSxRQUNOO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDUCxjQUFjO0FBQUEsWUFDYixLQUFLLENBQUMsS0FBSztBQUFBLFlBQ1gsWUFBWSxDQUFDLGNBQWMsdUJBQXVCLHNCQUFzQjtBQUFBLFVBQ3pFO0FBQUEsVUFDQSxnQkFBZ0IsUUFBUSxJQUFJLGFBQWEsZUFBZSxnQkFBZ0I7QUFBQSxVQUN4RSxnQkFBZ0IsUUFBUSxJQUFJLGFBQWEsZUFBZSxzQkFBc0I7QUFBQSxRQUMvRTtBQUFBLE1BQ0Q7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLFFBQVEsbUNBQVk7QUFBQSxNQUNwQixXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixXQUFXLFFBQVEsSUFBSSxhQUFhO0FBQUEsTUFDcEMsc0JBQXNCO0FBQUE7QUFBQSxNQUd0QixpQkFBaUI7QUFBQSxRQUNoQixTQUFTLENBQUMsY0FBYyxjQUFjO0FBQUEsTUFDdkM7QUFBQSxJQUNEO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVDtBQUFBLElBRUEsTUFBTTtBQUFBLE1BQ0wsYUFBYTtBQUFBLE1BQ2IsTUFBTTtBQUFBLFFBQ0wsUUFBUTtBQUFBO0FBQUEsVUFFUDtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRDtBQUVBLElBQU0sU0FBUyxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTSxVQUFVLENBQUM7QUFFOUQsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFsiYSIsICJfYSIsICJfYiJdCn0K

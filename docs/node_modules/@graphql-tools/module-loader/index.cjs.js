'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
        var n = {};
        if (e) {
            Object.keys(e).forEach(function (k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            });
        }
        n['default'] = e;
        return n;
    }
}

const graphql = require('graphql');
const utils = require('@graphql-tools/utils');

const InvalidError = new Error(`Imported object was not a string, DocumentNode or GraphQLSchema`);
const createLoadError = (error) => new Error('Unable to load schema from module: ' + `${error && error.message ? error.message : error}`);
// module:node/module#export
function extractData(pointer) {
    const parts = pointer.replace(/^module\:/i, '').split('#');
    if (!parts || parts.length > 2) {
        throw new Error('Schema pointer should match "module:path/to/module#export"');
    }
    return {
        modulePath: parts[0],
        exportName: parts[1],
    };
}
class ModuleLoader {
    loaderId() {
        return 'module-loader';
    }
    async canLoad(pointer) {
        return this.canLoadSync(pointer);
    }
    canLoadSync(pointer) {
        return typeof pointer === 'string' && pointer.toLowerCase().startsWith('module:');
    }
    async load(pointer, options) {
        try {
            const result = this.parse(pointer, options, await this.importModule(pointer));
            if (result) {
                return result;
            }
            throw InvalidError;
        }
        catch (error) {
            throw createLoadError(error);
        }
    }
    loadSync(pointer, options) {
        try {
            const result = this.parse(pointer, options, this.importModuleSync(pointer));
            if (result) {
                return result;
            }
            throw InvalidError;
        }
        catch (error) {
            throw createLoadError(error);
        }
    }
    parse(pointer, options, importedModule) {
        if (graphql.isSchema(importedModule)) {
            const schema = utils.fixSchemaAst(importedModule, options);
            return {
                schema,
                get document() {
                    return graphql.parse(utils.printSchemaWithDirectives(schema, options));
                },
                location: pointer,
            };
        }
        else if (typeof importedModule === 'string') {
            return {
                location: pointer,
                document: graphql.parse(importedModule),
            };
        }
        else if (typeof importedModule === 'object' && importedModule.kind === 'Document') {
            return {
                location: pointer,
                document: importedModule,
            };
        }
    }
    extractFromModule(mod, modulePath, identifier) {
        const thing = mod[!identifier || identifier === 'default' ? 'default' : identifier];
        if (!thing) {
            throw new Error('Unable to import an object from module: ' + modulePath);
        }
        return thing;
    }
    // Sync and Async
    async importModule(pointer) {
        const { modulePath, exportName } = extractData(pointer);
        const imported = await new Promise(function (resolve) { resolve(_interopNamespace(require(modulePath))); });
        return this.extractFromModule(imported, modulePath, exportName);
    }
    async importModuleSync(pointer) {
        const { modulePath, exportName } = extractData(pointer);
        const imported = require(modulePath);
        return this.extractFromModule(imported, modulePath, exportName);
    }
}

exports.ModuleLoader = ModuleLoader;
//# sourceMappingURL=index.cjs.js.map

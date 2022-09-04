'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const apolloLink = require('apollo-link');
const apolloUploadClient = require('apollo-upload-client');
const FormData = _interopDefault(require('form-data'));
const crossFetch = require('cross-fetch');
const utils = require('@graphql-tools/utils');
const graphql = require('graphql');

function getFinalPromise(object) {
    return Promise.resolve(object).then(resolvedObject => {
        if (resolvedObject == null) {
            return resolvedObject;
        }
        if (Array.isArray(resolvedObject)) {
            return Promise.all(resolvedObject.map(o => getFinalPromise(o)));
        }
        else if (typeof resolvedObject === 'object') {
            const keys = Object.keys(resolvedObject);
            return Promise.all(keys.map(key => getFinalPromise(resolvedObject[key]))).then(awaitedValues => {
                for (let i = 0; i < keys.length; i++) {
                    resolvedObject[keys[i]] = awaitedValues[i];
                }
                return resolvedObject;
            });
        }
        return resolvedObject;
    });
}
class AwaitVariablesLink extends apolloLink.ApolloLink {
    request(operation, forward) {
        return new apolloLink.Observable(observer => {
            let subscription;
            getFinalPromise(operation.variables)
                .then(resolvedVariables => {
                operation.variables = resolvedVariables;
                subscription = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                });
            })
                .catch(observer.error.bind(observer));
            return () => {
                if (subscription != null) {
                    subscription.unsubscribe();
                }
            };
        });
    }
}

class FormDataWithStreamSupport extends FormData {
    constructor(options) {
        super(options);
        this.hasUnknowableLength = false;
    }
    append(key, value, optionsOrFilename = {}) {
        // allow filename as single option
        const options = typeof optionsOrFilename === 'string' ? { filename: optionsOrFilename } : optionsOrFilename;
        // empty or either doesn't have path or not an http response
        if (!options.knownLength &&
            !Buffer.isBuffer(value) &&
            typeof value !== 'string' &&
            !value.path &&
            !(value.readable && 'httpVersion' in value)) {
            this.hasUnknowableLength = true;
        }
        super.append(key, value, options);
    }
    getLength(callback) {
        if (this.hasUnknowableLength) {
            return null;
        }
        return super.getLength(callback);
    }
    getLengthSync() {
        if (this.hasUnknowableLength) {
            return null;
        }
        // eslint-disable-next-line no-sync
        return super.getLengthSync();
    }
}
const createServerHttpLink = (options) => apolloLink.concat(new AwaitVariablesLink(), apolloUploadClient.createUploadLink({
    ...options,
    fetch: crossFetch.fetch,
    FormData: FormDataWithStreamSupport,
    isExtractableFile: (value) => apolloUploadClient.isExtractableFile(value) || (value === null || value === void 0 ? void 0 : value.createReadStream),
    formDataAppendFile: (form, index, file) => {
        if (file.createReadStream != null) {
            form.append(index, file.createReadStream(), {
                filename: file.filename,
                contentType: file.mimetype,
            });
        }
        else {
            apolloUploadClient.formDataAppendFile(form, index, file);
        }
    },
}));

const linkToExecutor = (link) => ({ document, variables, context, info, }) => apolloLink.toPromise(apolloLink.execute(link, {
    query: document,
    variables,
    context: {
        graphqlContext: context,
        graphqlResolveInfo: info,
    },
}));

const linkToSubscriber = (link) => async ({ document, variables, context, info, }) => utils.observableToAsyncIterable(apolloLink.execute(link, {
    query: document,
    variables,
    context: {
        graphqlContext: context,
        graphqlResolveInfo: info,
    },
}));

const GraphQLUpload = new graphql.GraphQLScalarType({
    name: 'Upload',
    description: 'The `Upload` scalar type represents a file upload.',
    parseValue: value => {
        if (value != null && value.promise instanceof Promise) {
            // graphql-upload v10
            return value.promise;
        }
        else if (value instanceof Promise) {
            // graphql-upload v9
            return value;
        }
        throw new graphql.GraphQLError('Upload value invalid.');
    },
    // serialization requires to support schema stitching
    serialize: value => value,
    parseLiteral: ast => {
        throw new graphql.GraphQLError('Upload literal unsupported.', ast);
    },
});

exports.AwaitVariablesLink = AwaitVariablesLink;
exports.GraphQLUpload = GraphQLUpload;
exports.createServerHttpLink = createServerHttpLink;
exports.linkToExecutor = linkToExecutor;
exports.linkToSubscriber = linkToSubscriber;
//# sourceMappingURL=index.cjs.js.map

import { ApolloLink, Observable, concat, toPromise, execute } from 'apollo-link';
import { createUploadLink, isExtractableFile, formDataAppendFile } from 'apollo-upload-client';
import FormData from 'form-data';
import { fetch } from 'cross-fetch';
import { observableToAsyncIterable } from '@graphql-tools/utils';
import { GraphQLScalarType, GraphQLError } from 'graphql';

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
class AwaitVariablesLink extends ApolloLink {
    request(operation, forward) {
        return new Observable(observer => {
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
const createServerHttpLink = (options) => concat(new AwaitVariablesLink(), createUploadLink({
    ...options,
    fetch,
    FormData: FormDataWithStreamSupport,
    isExtractableFile: (value) => isExtractableFile(value) || (value === null || value === void 0 ? void 0 : value.createReadStream),
    formDataAppendFile: (form, index, file) => {
        if (file.createReadStream != null) {
            form.append(index, file.createReadStream(), {
                filename: file.filename,
                contentType: file.mimetype,
            });
        }
        else {
            formDataAppendFile(form, index, file);
        }
    },
}));

const linkToExecutor = (link) => ({ document, variables, context, info, }) => toPromise(execute(link, {
    query: document,
    variables,
    context: {
        graphqlContext: context,
        graphqlResolveInfo: info,
    },
}));

const linkToSubscriber = (link) => async ({ document, variables, context, info, }) => observableToAsyncIterable(execute(link, {
    query: document,
    variables,
    context: {
        graphqlContext: context,
        graphqlResolveInfo: info,
    },
}));

const GraphQLUpload = new GraphQLScalarType({
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
        throw new GraphQLError('Upload value invalid.');
    },
    // serialization requires to support schema stitching
    serialize: value => value,
    parseLiteral: ast => {
        throw new GraphQLError('Upload literal unsupported.', ast);
    },
});

export { AwaitVariablesLink, GraphQLUpload, createServerHttpLink, linkToExecutor, linkToSubscriber };
//# sourceMappingURL=index.esm.js.map

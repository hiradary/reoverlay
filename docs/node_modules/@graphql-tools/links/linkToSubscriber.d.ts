import { ApolloLink, FetchResult } from 'apollo-link';
import { GraphQLResolveInfo, DocumentNode } from 'graphql';
export declare const linkToSubscriber: (link: ApolloLink) => <TReturn, TArgs, TContext>({ document, variables, context, info, }: {
    document: DocumentNode;
    variables: TArgs;
    context: TContext;
    info: GraphQLResolveInfo;
}) => Promise<AsyncIterator<FetchResult<TReturn, Record<string, any>, Record<string, any>>, any, undefined> & {
    [Symbol.asyncIterator]: () => AsyncIterator<FetchResult<TReturn, Record<string, any>, Record<string, any>>, any, undefined>;
}>;

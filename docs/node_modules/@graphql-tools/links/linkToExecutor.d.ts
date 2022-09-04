import { ApolloLink, FetchResult } from 'apollo-link';
import { DocumentNode, GraphQLResolveInfo } from 'graphql';
export declare const linkToExecutor: (link: ApolloLink) => <TReturn, TArgs, TContext>({ document, variables, context, info, }: {
    document: DocumentNode;
    variables: TArgs;
    context: TContext;
    info: GraphQLResolveInfo;
}) => Promise<FetchResult<TReturn, Record<string, any>, Record<string, any>>>;

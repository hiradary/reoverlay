import { ApolloLink, Operation, NextLink, Observable, FetchResult } from 'apollo-link';
export declare class AwaitVariablesLink extends ApolloLink {
    request(operation: Operation, forward: NextLink): Observable<FetchResult>;
}

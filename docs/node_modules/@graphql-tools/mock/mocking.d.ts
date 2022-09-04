import { GraphQLSchema, GraphQLList, GraphQLResolveInfo, GraphQLFieldResolver } from 'graphql';
import { IMocks, IMockServer, IMockOptions, IMockTypeFn } from './types';
import { ITypeDefinitions } from '@graphql-tools/utils';
/**
 * This function wraps addMocksToSchema for more convenience
 */
export declare function mockServer(schema: GraphQLSchema | ITypeDefinitions, mocks: IMocks, preserveResolvers?: boolean): IMockServer;
export declare function addMocksToSchema({ schema, mocks, preserveResolvers }: IMockOptions): GraphQLSchema;
export declare function isMockList(obj: any): obj is MockList;
export declare class MockList {
    private readonly len;
    private readonly wrappedFunction;
    constructor(len: number | Array<number>, wrappedFunction?: GraphQLFieldResolver<any, any>);
    mock(root: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo, fieldType: GraphQLList<any>, mockTypeFunc: IMockTypeFn): any[];
    private randint;
}

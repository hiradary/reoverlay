import { DocumentNode, GraphQLNamedType, GraphQLSchema, GraphQLDirective, SchemaDefinitionNode, SchemaExtensionNode } from 'graphql';
import { SubschemaConfig } from '@graphql-tools/delegate';
import { MergeTypeCandidate, MergeTypeFilter, OnTypeConflict, StitchingInfo } from './types';
import { TypeMap } from '@graphql-tools/utils';
export declare function buildTypeCandidates({ schemaLikeObjects, transformedSchemas, typeCandidates, extensions, directives, schemaDefs, operationTypeNames, mergeDirectives, }: {
    schemaLikeObjects: Array<GraphQLSchema | SubschemaConfig | DocumentNode | GraphQLNamedType>;
    transformedSchemas: Map<GraphQLSchema | SubschemaConfig, GraphQLSchema>;
    typeCandidates: Record<string, Array<MergeTypeCandidate>>;
    extensions: Array<DocumentNode>;
    directives: Array<GraphQLDirective>;
    schemaDefs: {
        schemaDef: SchemaDefinitionNode;
        schemaExtensions: Array<SchemaExtensionNode>;
    };
    operationTypeNames: Record<string, any>;
    mergeDirectives: boolean;
}): void;
export declare function buildTypeMap({ typeCandidates, mergeTypes, stitchingInfo, onTypeConflict, operationTypeNames, }: {
    typeCandidates: Record<string, Array<MergeTypeCandidate>>;
    mergeTypes: boolean | Array<string> | MergeTypeFilter;
    stitchingInfo: StitchingInfo;
    onTypeConflict: OnTypeConflict;
    operationTypeNames: Record<string, any>;
}): TypeMap;

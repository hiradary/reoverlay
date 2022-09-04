import { GraphQLSchema } from 'graphql';
import { IResolvers } from '@graphql-tools/utils';
import { SubschemaConfig } from '@graphql-tools/delegate';
import { MergeTypeCandidate, StitchingInfo, MergeTypeFilter } from './types';
export declare function createStitchingInfo(transformedSchemas: Map<GraphQLSchema | SubschemaConfig, GraphQLSchema>, typeCandidates: Record<string, Array<MergeTypeCandidate>>, mergeTypes?: boolean | Array<string> | MergeTypeFilter): StitchingInfo;
export declare function completeStitchingInfo(stitchingInfo: StitchingInfo, resolvers: IResolvers): StitchingInfo;
export declare function addStitchingInfo(stitchedSchema: GraphQLSchema, stitchingInfo: StitchingInfo): GraphQLSchema;

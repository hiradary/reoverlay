import { DefinitionNode, GraphQLNamedType, GraphQLDirective } from 'graphql';
export default function typeFromAST(node: DefinitionNode): GraphQLNamedType | GraphQLDirective | null;
/**
 * @internal
 */
export declare function getBlockStringIndentation(lines: ReadonlyArray<string>): number;

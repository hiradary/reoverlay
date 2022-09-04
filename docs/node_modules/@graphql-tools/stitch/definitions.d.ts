import { DocumentNode, DefinitionNode, SchemaExtensionNode, SchemaDefinitionNode } from 'graphql';
export declare function extractTypeDefinitions(ast: DocumentNode): {
    definitions: DefinitionNode[];
    kind: "Document";
    loc?: import("graphql").Location;
};
export declare function extractDirectiveDefinitions(ast: DocumentNode): {
    definitions: DefinitionNode[];
    kind: "Document";
    loc?: import("graphql").Location;
};
export declare function extractSchemaDefinition(ast: DocumentNode): SchemaDefinitionNode;
export declare function extractSchemaExtensions(ast: DocumentNode): Array<SchemaExtensionNode>;
export declare function extractTypeExtensionDefinitions(ast: DocumentNode): {
    definitions: DefinitionNode[];
    kind: "Document";
    loc?: import("graphql").Location;
};

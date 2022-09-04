import { UniversalLoader, SingleFileOptions, Source } from '@graphql-tools/utils';
export declare class ModuleLoader implements UniversalLoader {
    loaderId(): string;
    canLoad(pointer: string): Promise<boolean>;
    canLoadSync(pointer: string): boolean;
    load(pointer: string, options: SingleFileOptions): Promise<Source>;
    loadSync(pointer: string, options: SingleFileOptions): Source;
    private parse;
    private extractFromModule;
    private importModule;
    private importModuleSync;
}

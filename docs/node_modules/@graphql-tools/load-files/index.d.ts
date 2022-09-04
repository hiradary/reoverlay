import { GlobbyOptions } from 'globby';
export interface LoadFilesOptions {
    ignoredExtensions?: string[];
    extensions?: string[];
    useRequire?: boolean;
    requireMethod?: any;
    globOptions?: GlobbyOptions;
    exportNames?: string[];
    recursive?: boolean;
    ignoreIndex?: boolean;
}
export declare function loadFilesSync<T = any>(pattern: string | string[], options?: LoadFilesOptions): T[];
export declare function loadFiles(pattern: string | string[], options?: LoadFilesOptions): Promise<any[]>;

import path from "node:path";

/**
 * Normalizes a path to use forward slashes.
 * Useful for cross-platform consistency when generating routing patterns
 * or module IDs that must be consistent across Windows and Unix.
 */
export function normalizePath(p: string): string {
    return p.replace(/\\/g, "/");
}

/**
 * Joins path segments and returns a normalized path with forward slashes.
 */
export function joinPath(...segments: string[]): string {
    return normalizePath(path.join(...segments));
}

/**
 * Resolves path segments and returns a normalized path with forward slashes.
 */
export function resolvePath(...segments: string[]): string {
    return normalizePath(path.resolve(...segments));
}

/**
 * Gets a relative path and returns it normalized with forward slashes.
 */
export function relativePath(from: string, to: string): string {
    return normalizePath(path.relative(from, to));
}

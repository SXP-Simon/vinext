/**
 * Normalizes a path to use forward slashes.
 * Useful for cross-platform consistency when generating routing patterns
 * or module IDs that must be consistent across Windows and Unix.
 */
export function normalizePath(p: string): string {
    return p.replace(/\\/g, "/");
}

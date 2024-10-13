export function exclude<T = any>(obj: T, excludeKeys: string[]): Partial<T> {
    const res: Partial<T> = {};
    for (const key in obj) {
        if (!excludeKeys.includes(key)) {
            res[key] = obj[key];
        }
    }
    return res;
}

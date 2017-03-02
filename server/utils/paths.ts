import * as path from "path"

export const PRJ_ROOT = path.resolve(".")// process.pwd()

export function relatvieToPRJ(path: any) {
    return path.resolve(PRJ_ROOT, path)
}
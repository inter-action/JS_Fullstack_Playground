import * as path from 'path'

export const PRJ_ROOT = path.resolve(__dirname, '../..')

export function relatvieToPRJ(path: any) {
    return path.resolve(PRJ_ROOT, path)
}
import { KnexInstance } from '../db/knex'

export function getAll() {
    return KnexInstance('shows').select() as Promise<any>
}

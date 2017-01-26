import { KnexInstance } from '../db'

function Shows() {
    return KnexInstance('shows')
}
export function getAll() {
    return Shows().select() as Promise<any>
}

export function getSingle(id: number) {
    return Shows().where('id', id).first() as Promise<any>
}

export function save(show: any) {
    return Shows().insert(show, 'id') as Promise<any>
}

export function update(id: number, show: any) {
    return Shows().where('id', id).update(show) as Promise<any>
}

export function del(id: number) {
    return Shows().where({ id }).del() as Promise<number>
}
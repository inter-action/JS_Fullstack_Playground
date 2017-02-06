import * as BookShelf from 'bookshelf';
import { KnexInstance } from './knex';

export const bookshelf = BookShelf(KnexInstance);

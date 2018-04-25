import { BaseEntity } from './../../shared';

export class Subject implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public user_id?: string,
    ) {
    }
}

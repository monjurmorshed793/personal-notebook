import { BaseEntity } from './../../shared';

export class YearlyPlan implements BaseEntity {
    constructor(
        public id?: string,
        public year?: number,
        public plan?: string,
        public userId?: string,
    ) {
    }
}

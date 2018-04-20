import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {PersonalNotebookSubjectModule} from './subject/subject.module';
import {PersonalNotebookYearlyPlanModule} from './yearly-plan/yearly-plan.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PersonalNotebookSubjectModule,
        PersonalNotebookYearlyPlanModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PersonalNotebookEntityModule {}

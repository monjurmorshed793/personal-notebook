import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PersonalNotebookSharedModule} from '../../shared';
import {
    YearlyPlanComponent,
    YearlyPlanDeleteDialogComponent,
    YearlyPlanDeletePopupComponent,
    YearlyPlanDetailComponent,
    YearlyPlanDialogComponent,
    YearlyPlanPopupComponent,
    yearlyPlanPopupRoute,
    YearlyPlanPopupService,
    YearlyPlanResolvePagingParams,
    yearlyPlanRoute,
    YearlyPlanService,
} from './';

const ENTITY_STATES = [
    ...yearlyPlanRoute,
    ...yearlyPlanPopupRoute,
];

@NgModule({
    imports: [
        PersonalNotebookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        YearlyPlanComponent,
        YearlyPlanDetailComponent,
        YearlyPlanDialogComponent,
        YearlyPlanDeleteDialogComponent,
        YearlyPlanPopupComponent,
        YearlyPlanDeletePopupComponent,
    ],
    entryComponents: [
        YearlyPlanComponent,
        YearlyPlanDialogComponent,
        YearlyPlanPopupComponent,
        YearlyPlanDeleteDialogComponent,
        YearlyPlanDeletePopupComponent,
    ],
    providers: [
        YearlyPlanService,
        YearlyPlanPopupService,
        YearlyPlanResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PersonalNotebookYearlyPlanModule {}

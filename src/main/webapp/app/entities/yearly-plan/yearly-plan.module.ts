import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PersonalNotebookSharedModule } from '../../shared';
import {
    YearlyPlanService,
    YearlyPlanPopupService,
    YearlyPlanComponent,
    YearlyPlanDetailComponent,
    YearlyPlanDialogComponent,
    YearlyPlanPopupComponent,
    YearlyPlanDeletePopupComponent,
    YearlyPlanDeleteDialogComponent,
    yearlyPlanRoute,
    yearlyPlanPopupRoute,
    YearlyPlanResolvePagingParams,
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

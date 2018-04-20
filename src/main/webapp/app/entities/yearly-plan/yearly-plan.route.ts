import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {UserRouteAccessService} from '../../shared';
import {YearlyPlanComponent} from './yearly-plan.component';
import {YearlyPlanDetailComponent} from './yearly-plan-detail.component';
import {YearlyPlanPopupComponent} from './yearly-plan-dialog.component';
import {YearlyPlanDeletePopupComponent} from './yearly-plan-delete-dialog.component';

@Injectable()
export class YearlyPlanResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const yearlyPlanRoute: Routes = [
    {
        path: 'yearly-plan',
        component: YearlyPlanComponent,
        resolve: {
            'pagingParams': YearlyPlanResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YearlyPlans'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'yearly-plan/:id',
        component: YearlyPlanDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YearlyPlans'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const yearlyPlanPopupRoute: Routes = [
    {
        path: 'yearly-plan-new',
        component: YearlyPlanPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YearlyPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'yearly-plan/:id/edit',
        component: YearlyPlanPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YearlyPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'yearly-plan/:id/delete',
        component: YearlyPlanDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YearlyPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

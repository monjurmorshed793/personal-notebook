/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PersonalNotebookTestModule } from '../../../test.module';
import { YearlyPlanComponent } from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan.component';
import { YearlyPlanService } from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan.service';
import { YearlyPlan } from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan.model';

describe('Component Tests', () => {

    describe('YearlyPlan Management Component', () => {
        let comp: YearlyPlanComponent;
        let fixture: ComponentFixture<YearlyPlanComponent>;
        let service: YearlyPlanService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PersonalNotebookTestModule],
                declarations: [YearlyPlanComponent],
                providers: [
                    YearlyPlanService
                ]
            })
            .overrideTemplate(YearlyPlanComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YearlyPlanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YearlyPlanService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new YearlyPlan('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.yearlyPlans[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

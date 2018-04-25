/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PersonalNotebookTestModule } from '../../../test.module';
import { YearlyPlanDetailComponent } from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan-detail.component';
import { YearlyPlanService } from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan.service';
import { YearlyPlan } from '../../../../../../main/webapp/app/entities/yearly-plan/yearly-plan.model';

describe('Component Tests', () => {

    describe('YearlyPlan Management Detail Component', () => {
        let comp: YearlyPlanDetailComponent;
        let fixture: ComponentFixture<YearlyPlanDetailComponent>;
        let service: YearlyPlanService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PersonalNotebookTestModule],
                declarations: [YearlyPlanDetailComponent],
                providers: [
                    YearlyPlanService
                ]
            })
            .overrideTemplate(YearlyPlanDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YearlyPlanDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YearlyPlanService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new YearlyPlan('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.yearlyPlan).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

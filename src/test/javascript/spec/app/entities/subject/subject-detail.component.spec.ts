/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {PersonalNotebookTestModule} from '../../../test.module';
import {SubjectDetailComponent} from '../../../../../../main/webapp/app/entities/subject/subject-detail.component';
import {SubjectService} from '../../../../../../main/webapp/app/entities/subject/subject.service';
import {Subject} from '../../../../../../main/webapp/app/entities/subject/subject.model';

describe('Component Tests', () => {

    describe('Subject Management Detail Component', () => {
        let comp: SubjectDetailComponent;
        let fixture: ComponentFixture<SubjectDetailComponent>;
        let service: SubjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PersonalNotebookTestModule],
                declarations: [SubjectDetailComponent],
                providers: [
                    SubjectService
                ]
            })
            .overrideTemplate(SubjectDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Subject('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.subject).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PersonalNotebookTestModule } from '../../../test.module';
import { SubjectComponent } from '../../../../../../main/webapp/app/entities/subject/subject.component';
import { SubjectService } from '../../../../../../main/webapp/app/entities/subject/subject.service';
import { Subject } from '../../../../../../main/webapp/app/entities/subject/subject.model';

describe('Component Tests', () => {

    describe('Subject Management Component', () => {
        let comp: SubjectComponent;
        let fixture: ComponentFixture<SubjectComponent>;
        let service: SubjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PersonalNotebookTestModule],
                declarations: [SubjectComponent],
                providers: [
                    SubjectService
                ]
            })
            .overrideTemplate(SubjectComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Subject('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subjects[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { YearlyPlan } from './yearly-plan.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<YearlyPlan>;

@Injectable()
export class YearlyPlanService {

    private resourceUrl =  SERVER_API_URL + 'api/yearly-plans';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/yearly-plans';

    constructor(private http: HttpClient) { }

    create(yearlyPlan: YearlyPlan): Observable<EntityResponseType> {
        const copy = this.convert(yearlyPlan);
        return this.http.post<YearlyPlan>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(yearlyPlan: YearlyPlan): Observable<EntityResponseType> {
        const copy = this.convert(yearlyPlan);
        return this.http.put<YearlyPlan>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<YearlyPlan>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<YearlyPlan[]>> {
        const options = createRequestOption(req);
        return this.http.get<YearlyPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<YearlyPlan[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<YearlyPlan[]>> {
        const options = createRequestOption(req);
        return this.http.get<YearlyPlan[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<YearlyPlan[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: YearlyPlan = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<YearlyPlan[]>): HttpResponse<YearlyPlan[]> {
        const jsonResponse: YearlyPlan[] = res.body;
        const body: YearlyPlan[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to YearlyPlan.
     */
    private convertItemFromServer(yearlyPlan: YearlyPlan): YearlyPlan {
        const copy: YearlyPlan = Object.assign({}, yearlyPlan);
        return copy;
    }

    /**
     * Convert a YearlyPlan to a JSON which can be sent to the server.
     */
    private convert(yearlyPlan: YearlyPlan): YearlyPlan {
        const copy: YearlyPlan = Object.assign({}, yearlyPlan);
        return copy;
    }
}

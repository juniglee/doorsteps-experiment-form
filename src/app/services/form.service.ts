import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Form } from '../model/form.model';

@Injectable()
export class FormService {
    constructor(private http: HttpClient) {

    }

    get(urlParam: string) {
        console.debug("FormService.get");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var url = environment.apiUrl + environment.form + '/' + urlParam;
        return this.http.get(url);
    }

    getExperiments() {
        console.debug("FormService.get");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var url = environment.apiUrl + environment.form;
        return this.http.get(url);
    }

    post(forms: Array<Form>) {
        console.debug("FormService.post");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var url = environment.apiUrl + environment.form;
        return this.http.post<any>(url, forms);
    }

    delete(id: string) {
        console.debug("FormService.delete");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var url = environment.apiUrl + environment.form + '/' + id;
        return this.http.delete(url);
    }
}
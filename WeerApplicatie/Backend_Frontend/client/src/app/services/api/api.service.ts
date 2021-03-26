import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "../../../environments/environment";

const baseUrl = environment.config.baseURL;


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private loggedIn = false;
    private token: string;
    public email: string;

    constructor(private http: HttpClient) {}

    setLoggedIn(loggedIn: boolean, token?: string, email?: string) {
        this.loggedIn = loggedIn;
        this.token = token;
        this.email = email;
    }




    request(method: string, route: string, data?: any) {
        if (method === 'GET') {
            return this.get(route, data);
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'https://localhost:4200/'
        });

        if(this.loggedIn){
            headers.append('Authorization', `Bearer ${this.token}`);
        }

        //const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;

        console.log(headers);

        return this.http.request(method, baseUrl + route, {
            body: data,
            responseType: 'json',
            observe: 'body',
            headers: headers
        });
    }

    get(route: string, data?: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'https://localhost:4200/'
        });

        if(this.loggedIn){
            headers.append('Authorization', `Bearer ${this.token}`);
        }

        console.log(headers);

        let params = new HttpParams();
        if (data !== undefined) {
            Object.getOwnPropertyNames(data).forEach(key => {
                params = params.set(key, data[key]);
            });
        }

        return this.http.get(baseUrl + route, {
            responseType: 'json',
            headers: headers,
            params
        });
    }
}

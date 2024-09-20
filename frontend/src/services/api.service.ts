import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'    
})
export class ApiService {
    constructor(
        private http: HttpClient
    ) {
    }

    getGrid(): any {
        return this.http.get('http://localhost:5000/getgrid');
    }

    getCode(): any {
        return this.http.get('http://localhost:5000/getcode');
    }

}

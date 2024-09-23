import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const endpoint = "http://localhost:5000";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient
    ) {
    }

    getGrid(): any {
        return this.http.get(endpoint + '/getgrid');
    }

    getCode(): any {
        return this.http.get(endpoint + '/getcode');
    }

    generate(): any {
        return this.http.patch(endpoint + '/generate', null);
    }

    setBias(bias: string): any {
        return this.http.patch(endpoint + '/setbias', { bias: bias });
    }

    addPayment(name: string, ammount: string): any {
        return this.http.post(endpoint + '/addpayment', { name: name, ammount: ammount });
    }

    getPayments(): any {
        return this.http.get(endpoint + '/getpayments');
    }

}


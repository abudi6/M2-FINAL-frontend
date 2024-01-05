import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class ApiService {

    constructor(private _http:HttpClient){}

    getdata(){
        return this._http.get('https://localhost:7145/api/item');
    }

    insertdata(name:string, brand:string, unitPrice:number){
        const item = {name,brand,unitPrice};

        return this._http.post('https://localhost:7145/api/item/add',item)
    }

    deletedata(code:string){}
}
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Hero } from "./hero";

@Injectable()
export class HeroSearchService {

    constructor(private http: Http) {};

    search(term: string): Observable<Hero[]> {
        return this.http
            .get(`app/heroes/?name=${term}`) //Query string on "name"
            //map is a rxjs method applicable on Observables (see then() for Promises)
            .map(response => response.json().data as Hero[])
    }
}
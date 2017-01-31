import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { Hero } from "./hero";

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'}); //for the update method

    constructor(private http: Http) {};

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
        .toPromise() //Converts an Observable to a Promise
        .then(response => response.json().data as Hero[])
        .catch(this.handleError);
    }

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`; //This is using "template literals"
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`; //This is using "template literals"
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`; //This is using "template literals"
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }

    // This method is wasteful, only good for simulation
    // getHero(id: number): Promise<Hero> {
    //     return this.getHeroes()
    //     .then(heroes => heroes.find(hero => hero.id === id));
    // }

    //This is just a random test
    //This method returns the same thing as the one above but it simulates a slow connection
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }
}
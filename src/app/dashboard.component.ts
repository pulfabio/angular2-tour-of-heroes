import { Component, OnInit } from "@angular/core";

import { Hero } from "./hero"; //Refactored Hero class code
import { HeroService } from "./hero.service";

@Component({
    selector: "my-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: [ "./dashboard.component.css" ]
})
export class DashboardComponent implements OnInit {
    heroes: Hero[];

    constructor(private heroService: HeroService) {};

    getHeroes(): void {
        /*We pass the callback-Promise function to the Promise.then() method
        so that a sub-array of the array of heroes gets assigned to this.heroes.
        The => (fat arrow) function correctly handles the scope of "this"*/
        this.heroService.getHeroes().then(heroes => {this.heroes = heroes.slice(1, 5)});
    }
    ngOnInit(): void {
        /*We implement ngOnInit hookup so getHeroes() we'll be launched by the system at
        activation lyfecycle stage*/
        this.getHeroes();
    }
}
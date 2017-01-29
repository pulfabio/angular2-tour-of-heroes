import { Component } from '@angular/core';
import { OnInit } from "@angular/core"; //We need this for Lifecycle hookup

import { Hero } from "./hero"; //Refactored Hero class code
import { HeroService } from "./hero.service";


@Component({
    selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
    //providers: [HeroService]
    //HeroService has been removed from here and added to providers of AppModule
})
export class HeroesComponent implements OnInit { // OnInit must be declared here
    //Declare variables
    heroes: Hero[];
    selectedHero: Hero;

    //Inject service into component constructor
    constructor(private heroService: HeroService) {};

    //Fetch heroes list
    getHeroes(): void {
        /*We pass the callback-Promise function to the Promise.then() method
        so that the array of heroes gets assigned to this.heroes.
        The => (fat arrow) function correctly handles the scope of "this"*/
        this.heroService.getHeroes().then(heroes => {this.heroes = heroes});
    };
    ngOnInit(): void {
        /*We implement ngOnInit hookup so getHeroes() we'll be launched by the system at
        activation lyfecycle stage*/
        this.getHeroes();
    };

    //Assign selectedHero
    /*This function is called by the (click) event in the template*/
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    };
}

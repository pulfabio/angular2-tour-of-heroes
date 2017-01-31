import { Component } from '@angular/core';
import { OnInit } from "@angular/core"; //We need this for Lifecycle hookup
import { Router } from "@angular/router";

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
    constructor(
        private heroService: HeroService,
        private router: Router) {};

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

    gotoDetail(): void {
        this.router.navigate(["/detail", this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim(); //Removes spaces right and left
        if(!name) { return; }
        this.heroService.create(name)
        .then(hero => {
            this.heroes.push(hero); //Adds new hero to heroes list
            this.selectedHero = null;
        })
    }

    delete(hero: Hero): void {
        this.heroService.delete(hero.id)
        .then(() => {
            //Update the list display
            this.heroes = this.heroes.filter(h => h !== hero);
            //Remove selectedHero assignment, if any
            if (this.selectedHero === hero) { this.selectedHero = null; }
        });
    }

}

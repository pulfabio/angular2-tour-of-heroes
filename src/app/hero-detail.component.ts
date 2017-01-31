import { Component, /*Input,*/ OnInit} from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import 'rxjs/add/operator/switchMap';

import { Hero } from "./hero";
import { HeroService } from "./hero.service";

@Component({
    selector: "my-hero-detail",
    templateUrl: "./hero-detail.component.html",
    styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
    //@Input() (Not needed as the hero is gotten through
    //          url params and not through property binding
    hero: Hero;

    //Dependency injections
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location) {
    };

    //Get hero through url:id and assign it to local property this.hero
    ngOnInit(): void {
        this.route.params
        .switchMap((params: Params) =>
         this.heroService.getHero(+params['id']))
        .subscribe(hero => this.hero = hero);
    }

    //"back" button takes us back one step in the browser history stack
    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService.update(this.hero)
        .then(() => this.goBack()); //Arrow function used because it retains the identity of "this"
    }
}
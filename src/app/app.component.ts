import { Component } from "@angular/core";

//import { HeroService } from "./hero.service"; //It should be in the AppModule

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html"

})
export class AppComponent {
    title = "Tour of Heroes";
}
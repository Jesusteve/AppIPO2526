import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
    title = 'mi-primera-app';
    contador = 0; // ¡Esta variable se usa en el HTML!
}

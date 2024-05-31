import { Component } from '@angular/core';
import { MapboxComponent } from "../../components/mapbox/mapbox.component";

@Component({
    selector: 'app-maps',
    standalone: true,
    templateUrl: './maps.component.html',
    styleUrl: './maps.component.css',
    imports: [MapboxComponent]
})

export class MapsComponent {

}


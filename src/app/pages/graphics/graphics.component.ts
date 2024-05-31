import { Component } from '@angular/core';
import { ChartjsComponent } from "../../components/chartjs/chartjs.component";

@Component({
    selector: 'app-graphics',
    standalone: true,
    templateUrl: './graphics.component.html',
    styleUrl: './graphics.component.css',
    imports: [ChartjsComponent]
})
export class GraphicsComponent {

}

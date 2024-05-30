import { Component } from '@angular/core';
import { FullCalendarComponent } from "../../components/full-calendar/full-calendar.component";

@Component({
    selector: 'app-calendar',
    standalone: true,
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
    imports: [FullCalendarComponent]
})
export class CalendarComponent {

}

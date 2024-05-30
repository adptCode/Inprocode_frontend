import { AfterViewInit, Component, Inject, PLATFORM_ID,  } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [CommonModule ,FullCalendarModule, ReactiveFormsModule],
  templateUrl: './full-calendar.component.html',
  styleUrl: './full-calendar.component.css'
})
export class FullCalendarComponent implements AfterViewInit{

  eventForm: FormGroup;
  addModal:boolean =  false;
  addEditModal:boolean =  false;
  events: any[] = [];
  eventDate!: string;
  event?: any;


  constructor(private fb: FormBuilder, private _eventService: EventsService, @Inject(PLATFORM_ID) private platformId: Object) {

    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      color: [''],
    })
  }
  ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.loadEvent();
    }

  }

  loadEvent() {
    this._eventService.getEvents().subscribe(res => {
      this.events = res;
      this.calendarOptions.events = this.events;
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (select) => this.handleEventClick(select),

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek',
    },
    weekends: true,
    editable: true,
    selectable: true,
    eventStartEditable: false,
    eventDurationEditable: false
  };

  handleDateClick(arg:any) {

    this.eventDate = arg.dateStr;
    this.addModal = true;

  }

  handleEventClick(select:any)  {
    console.log(select);
  }

  onSubmit() {

    if(this.eventForm.valid) {
      const newEvent = {
        title: this.eventForm.get('title')!.value,
        date: this.eventDate,
        color: this.eventForm.get('color')?.value || null

      };

      this._eventService.addEvent(newEvent).subscribe({
        next: (res) => {
          this.events.push(res);
          this.calendarOptions.events = {...this.calendarOptions, events: [...this.events]};
          this.resetForm();
          this.loadEvent()
        },
        error: (error) => {
          console.error('Error:', error);
        }
      })

    } else {
      this.eventForm.markAllAsTouched();
    }
  }



  resetForm() {
    this.addModal = false;
    this.addEditModal = false;
    this.eventForm.reset();
  }


}

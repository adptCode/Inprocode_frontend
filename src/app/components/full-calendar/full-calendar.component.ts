import { AfterViewInit, Component } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  events: any[] = [];
  eventDate!: string;
  event?: any;
  eventId?: number


  constructor(private fb: FormBuilder, private _eventService: EventsService, private route: ActivatedRoute) {

    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      color: [''],
      check: [false]
    })
  }
  ngAfterViewInit(): void {
      this.loadEvent();
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
    dateClick:  this.handleDateClick.bind(this),
    eventClick:  this.handleEventClick.bind(this),

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

  handleDateClick(date:any) {

    this.eventDate = date.dateStr;
    this.addModal = true;

  }

  handleEventClick(event:any)  {
    this.event = event.event
    this.eventForm.get('title')?.setValue(event.event._def.title);
    this.eventForm.get('color')?.setValue(event.event._def.ui.backgroundColor);
    this.addModal = true;
  }

  toggleCheck() {
    const checkControl = this.eventForm.get('check');
    checkControl?.setValue(!checkControl.value);
  }

  onSubmit() {
    if (this.eventForm.valid) {
      if (!this.event) {
        const newEvent = {
          title: this.eventForm.get('title')!.value,
          date: this.eventDate,
          color: this.eventForm.get('color')?.value || null
        };

        this._eventService.addEvent(newEvent).subscribe({
          next: (res) => {
            this.events.push(res);
            this.calendarOptions.events = [...this.events];
            this.resetForm();
            this.loadEvent();
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
      } else {
        if (this.eventForm.get('check')?.value) {
          this._eventService.deleteEvent(this.event.id).subscribe({
            next: () => {
              this.events = this.events.filter(e => e.id !== this.event.id);
              this.calendarOptions.events = [...this.events];
              this.resetForm();
              this.loadEvent()
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
        } else {
          const updatedEvent = {
            id: this.event.id,
            title: this.eventForm.get('title')!.value,
            date: this.event.startStr,
            color: this.eventForm.get('color')?.value || null
          };

          this._eventService.updateEvent(this.event.id, updatedEvent).subscribe({
            next: (res) => {
              const index = this.events.findIndex(e => e.id === this.event.id);
              if (index !== -1) {
                this.events[index] = res;
                this.calendarOptions.events = [...this.events];
              }
              this.resetForm();
              this.loadEvent()
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
        }
      }
    } else {
      this.eventForm.markAllAsTouched();
    }

  }



  resetForm() {
    this.addModal = false;
    this.event = ""
    this.eventForm.reset();
  }


}

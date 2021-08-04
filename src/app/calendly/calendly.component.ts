import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendly',
  templateUrl: './calendly.component.html',
  styleUrls: ['./calendly.component.css']
})
export class CalendlyComponent implements OnInit {

  appointmentAvailability: any = (d : Date) : boolean => {
    const time = d.getTime();
    return this.enabledDates.find(x=> x.getTime() == time);
  }
  appointmentDate = new FormControl();
  selectedAppointmentDate: any;
  selectedDate: any;
  showBookingConfirmation : boolean = false;
  availableSlots : any = {
    "slots": [
      {
        "date": "06-April-2021",
        "timeSlots": ["09:00", "09:30", "10:00", "18:00", "19:00"]
      },
      {
        "date": "07-April-2021",
        "timeSlots": ["10:00", "11:30", "17:00", "18:00", "19:00"]
      },
      {
        "date": "10-May-2021",
        "timeSlots": ["08:00", "08:30", "10:00", "18:00", "20:00"]
      },
      {
        "date": "20-May-2021",
        "timeSlots": ["10:15", "10:30", "17:15", "18:30", "19:45"]
      },
      {
        "date": "15-May-2021",
        "timeSlots": ["07:10", "08:30", "12:00", "14:00", "15:00"]
      },
      {
        "date": "06-June-2021",
        "timeSlots": ["11:15", "11:30", "13:30", "18:45", "15:00"]
      },
      {
        "date": "16-June-2021",
        "timeSlots": ["09:00", "09:30", "10:00", "18:00", "19:00"]
      },
      {
        "date": "19-June-2021",
        "timeSlots": ["10:15", "10:30", "17:15", "18:30", "19:45"]
      },
      {
        "date": "26-June-2021",
        "timeSlots": ["06:00", "06:45", "09:15", "12:45", "05:45"]
      },
      {
        "date": "01-July-2021",
        "timeSlots": ["07:20", "08:30", "12:15", "14:45", "15:30"]
      },
      {
        "date": "06-July-2021",
        "timeSlots": ["11:20", "11:50", "13:30", "18:00", "16:30"]
      },
      {
        "date": "30-July-2021",
        "timeSlots": ["10:00", "11:30", "17:00", "18:00", "19:00"]
      }
    ]
  }

  constructor(private datePipe : DatePipe) { }
  enabledDates : any = [];
  timeSlotsForDay : any;
  ngOnInit(): void {
    let requiredDates = this.availableSlots.slots;
    requiredDates.forEach(element => {
      this.enabledDates.push(new Date(element.date));
    });
  }

  appointmentDateChange(event) {
    this.selectedDate = event.value;
    let requiredDates = this.availableSlots.slots;
    requiredDates.forEach(element => {
      if (new Date(element.date).getTime() === this.selectedDate.getTime()) {
        this.timeSlotsForDay = element.timeSlots;
      }
    });
    
  }
  timeSlot;
  
  selectAppointment(event, index) {
    this.availableSlots.slots.forEach(element => {
      if (new Date(element.date).getTime() === this.selectedDate.getTime()) {
        this.timeSlot = element.timeSlots[index];
      }
    });
    this.selectedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    this.timeSlot = 'your appointment is booked successfully on ' + this.selectedDate + ' at ' + this.timeSlot;
    this.showBookingConfirmation = true;
  }

}

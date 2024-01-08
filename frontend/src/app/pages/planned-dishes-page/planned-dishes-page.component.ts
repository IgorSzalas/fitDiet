import interactionPlugin from '@fullcalendar/interaction';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,

} from '@angular/material/dialog';
import { AddNewDishComponent } from '../../components/add-new-dish/add-new-dish.component';
import { EditDishComponent } from '../../components/edit-dish/edit-dish.component';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, FullCalendarModule],
  selector: 'app-planned-dishes-page',
  templateUrl: './planned-dishes-page.component.html',
  styleUrls: ['./planned-dishes-page.component.scss'],
})
export class PlannedDishesPageComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly http: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {}

  calendarVisible: boolean = true;
  currentEvents: any;
  ngOnInit() {
    this.fetchUserData();
    this.changeDetector.detectChanges();
  }
  userData: any;
  events: any = [];
  event: any;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    initialView: 'timeGridWeek',
    firstDay: 1,
    allDaySlot: false,
    locale: 'pl',
    timeZone: 'local',
    editable: true,
    selectable: true,
    themeSystem: 'Pulse',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  fetchDishes(info: any, success: any, failed: any) {
    if (!this.userData) {
      failed(new Error());
    } else {
      success(this.userData.plannedDishes);
      this.changeDetector.detectChanges();
    }
  }

  openAddNewDishModal(dayData: any) {
    const addNewDishDialog = this.dialog.open(AddNewDishComponent, {
      data: { dayData },
      width: '600px',
    });
    addNewDishDialog.afterClosed().subscribe((result) => {
      console.log(result);
      this.fetchUserData();
    });
  }

  fetchUserData() {
    const token = JSON.parse(localStorage.getItem('token')!);
    return this.userService
      .getUserDataByID(token.UserID)
      .pipe(first())
      .subscribe((userData: any) => {
        this.userData = userData;
        console.log('userData: ', userData);
        this.userData.plannedDishes.forEach((element: any) => {
          const event = {
            id: element.dishID ?? null,
            title: element.dishTitle,
            start: element.dateOfConsumption,
          };
          this.events.push(event);
          console.log(this.events);
        });
        if (this.events.length > 0) {
          this.calendarOptions.events = this.events;
          this.events = [];
        }

      });
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    // console.log(selectInfo);
    // const calendarApi = selectInfo.view.calendar;
    this.openAddNewDishModal(selectInfo);

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: '2024-01-04T07:00',
    //     end: '2024-01-04T08:00',
    //     allDay: selectInfo.allDay,
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    // console.log(clickInfo);
    const editDishDialog = this.dialog.open(EditDishComponent);
    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
  }
}

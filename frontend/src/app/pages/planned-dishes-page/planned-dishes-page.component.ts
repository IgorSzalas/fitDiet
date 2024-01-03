import interactionPlugin from '@fullcalendar/interaction';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AddNewDishComponent } from '../../components/add-new-dish/add-new-dish.component';

import { EventInput } from '@fullcalendar/core';
import { EditDishComponent } from '../../components/edit-dish/edit-dish.component';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00',
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00',
  },
];

export function createEventId() {
  return String(eventGuid++);
}

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, FullCalendarModule],
  selector: 'app-planned-dishes-page',
  templateUrl: './planned-dishes-page.component.html',
  styleUrls: ['./planned-dishes-page.component.scss'],
})
export class PlannedDishesPageComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {}

  calendarVisible: boolean = true;
  currentEvents: any;
  ngOnInit() {}

  openAddNewDishModal(dayData: any) {
    const addNewDishDialog = this.dialog.open(AddNewDishComponent, {
      data: { dayData },
    });
    addNewDishDialog.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    initialView: 'timeGridWeek',
    firstDay: 1,
    locale: 'pl',
    timeZone: 'local',
    editable: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),

    events: [
      {
        title: 'Meeting',
        start: '2023-12-23T14:30:00',
        extendedProps: {
          status: 'done',
        },
      },
      {
        title: 'Meeting',
        start: '2023-12-22T14:30:00',
        extendedProps: {
          status: 'green',
        },
      },
      {
        title: 'Birthday Party',
        start: '2023-12-13T07:00:00',
        backgroundColor: 'green',
        borderColor: 'green',
      },
    ],
  };

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
    console.log(clickInfo);
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

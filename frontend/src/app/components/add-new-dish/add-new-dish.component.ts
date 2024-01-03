import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  selector: 'app-add-new-dish',
  templateUrl: './add-new-dish.component.html',
  styleUrls: ['./add-new-dish.component.scss'],
})
export class AddNewDishComponent implements OnInit {
  constructor(
    private readonly form: FormBuilder,
    private readonly userService: UserService,
    public dialogRef: MatDialogRef<AddNewDishComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //inputData: any = this.formatDate(new Date());
  ngOnInit() {
    console.log(
      'this.dialogRef: ',
      this.dialogRef.componentInstance.data.dayData.start,
      this.dialogRef.componentInstance.data.dayData.start.toLocaleString()
    );
    this.addNewDishForm.controls['time'].setValue(
      this.formatDate(this.dialogRef.componentInstance.data.dayData.start)
    );
  }

  onSubmit() {
    console.log();
    this.addDishToCalendar(this.dialogRef);
  }

  private addDishToCalendar(dayData: any) {
    // const calendarApi = dayData.view.calendar;
    const calendarAPI = dayData.componentInstance.data.dayData.view.calendar;
    console.log(calendarAPI);
    const dishTitle = this.addNewDishForm.controls['title'].value;
    const dishDate = this.addNewDishForm.controls['dishDate'].value;
    calendarAPI.unselect(); // clear date selection

    if (dishTitle && dishDate) {
      calendarAPI.addEvent({
        id: 1,
        title: dishTitle,
        start: dishDate,
        end: '2024-01-04T08:00',
        allDay: dayData.allDay,
      });
    }
  }

  private formatDate(date: any) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const paddedMonth = String(month).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');

    const formatted = `${year}-${paddedMonth}-${paddedDay}T${paddedHours}:${paddedMinutes}`;
    console.log(formatted);
    return formatted;
  }

  addNewDishForm = this.form.group({
    title: ['', Validators.required],
    time: ['', Validators.required],
    dishDate: ['', Validators.required],
  });
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  selector: 'app-add-new-measurment',
  templateUrl: './add-new-measurment.component.html',
  styleUrls: ['./add-new-measurment.component.scss'],
})
export class AddNewMeasurmentComponent implements OnInit {
  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    const date = new Date().toLocaleString().replace(/T.*$/, '').split(',');
    this.weightForm.controls['time'].setValue(date[0]);
  }

  weightForm = this.formBuilder.group({
    weight: ['', Validators.required],
    time: ['', Validators.required],
  });
}

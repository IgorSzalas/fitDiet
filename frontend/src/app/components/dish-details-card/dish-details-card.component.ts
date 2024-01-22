import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule],
  selector: 'app-dish-details-card',
  templateUrl: './dish-details-card.component.html',
  styleUrls: ['./dish-details-card.component.scss'],
})
export class DishDetailsCardComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
  }
}

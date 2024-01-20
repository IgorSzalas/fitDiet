import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DishDetailsCardComponent } from '../dish-details-card/dish-details-card.component';

@Component({
  standalone: true,
  imports: [MatCardModule, MatRadioModule, MatSelectModule, MatButtonModule],
  selector: 'app-choose-dish-card',
  templateUrl: './choose-dish-card.component.html',
  styleUrls: ['./choose-dish-card.component.scss'],
})
export class ChooseDishCardComponent implements OnInit {
  @Input() dishName?: string;
  @Input() dishType?: string;
  @Input() dishCreator?: string;
  @Input() dishCaloricValue?: string;
  @Input() dishImage?: string;
  @Input() dishDescription?: string;

  dishData = {
    dishName: this.dishName,
    dishType: this.dishType,
    dishCreator: this.dishCreator,
    dishCaloricValue: this.dishCaloricValue,
    dishImage: this.dishImage,
    dishDescription: this.dishDescription,
  };

  constructor(
    public dialogRef: MatDialogRef<ChooseDishCardComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // console.log('dishName: ', this.dishName);
    // console.log('dishType: ', this.dishType);
    // console.log('dishCreator: ', this.dishCreator);
    // console.log('dishCaloricValue: ', this.dishCaloricValue);
    // console.log('dishImage: ', this.dishImage);
    // console.log('dishDescription: ', this.dishDescription);
  }

  openDishDetails() {
    const openDishDetailsDialog = this.dialog.open(DishDetailsCardComponent, {
      data: { dishData: this.dishData },
      width: '600px',
    });
    openDishDetailsDialog.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }
}

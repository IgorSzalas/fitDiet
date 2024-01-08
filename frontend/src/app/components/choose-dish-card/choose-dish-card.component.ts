import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  imports: [MatCardModule, MatRadioModule, MatSelectModule],
  selector: 'app-choose-dish-card',
  templateUrl: './choose-dish-card.component.html',
  styleUrls: ['./choose-dish-card.component.scss'],
})
export class ChooseDishCardComponent implements OnInit {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  @Input() dishName?: string;
  @Input() dishType?: string;
  @Input() dishCreator?: string;
  @Input() dishCaloricValue?: string;
  @Input() dishImage?: string;
  @Input() dishDescription?: string;
  constructor() {}

  ngOnInit() {
    // console.log('dishName: ', this.dishName);
    // console.log('dishType: ', this.dishType);
    // console.log('dishCreator: ', this.dishCreator);
    // console.log('dishCaloricValue: ', this.dishCaloricValue);
    // console.log('dishImage: ', this.dishImage);
    // console.log('dishDescription: ', this.dishDescription);
  }
}

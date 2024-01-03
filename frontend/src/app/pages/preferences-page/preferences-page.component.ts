import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-preferences-page',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: 'preferences-page.component.html',
  styleUrl: 'preferences-page.component.scss',
})
export class PreferencesPageComponent {
  constructor(private readonly form: FormBuilder) {}

  preferencesForm = this.form.group({
    vegetarian: false,
    glutenFree: false,
    lactoseFree: false,
  });

  fake = ['chuj', 'dupa', 'cyce'];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

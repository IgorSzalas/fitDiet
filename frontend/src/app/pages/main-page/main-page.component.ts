import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardWidgetComponent } from '../../components/card-widget/card-widget.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, CardWidgetComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  nextDish: string = 'kotlet';
}

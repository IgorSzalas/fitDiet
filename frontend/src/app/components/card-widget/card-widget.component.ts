import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-card-widget',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatCardModule],
  templateUrl: './card-widget.component.html',
  styleUrl: './card-widget.component.scss',
})
export class CardWidgetComponent {
  @Input() widgetTitle?: string;
  @Input() widgetText?: string;
  @Input() widgetSubtext?: string;
  @Input() widgetImage?: string;
}

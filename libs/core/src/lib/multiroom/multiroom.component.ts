import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-multiroom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiroom.component.html',
  styleUrls: ['./multiroom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiroomComponent {}

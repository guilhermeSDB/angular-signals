import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-required',
  templateUrl: './input-required.component.html',
  styleUrls: ['./input-required.component.scss'],
})
export class InputRequiredComponent {
  @Input({ required: false }) userId: number = 0;
}

import { Component, Input } from '@angular/core';

import { Payment } from '../../../model/payment';

@Component({
  selector: 'app-payments-list',
  standalone: true,
  imports: [],
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.scss'
})
export class PaymentsListComponent {
  @Input() data:Array<Payment>| undefined;
}

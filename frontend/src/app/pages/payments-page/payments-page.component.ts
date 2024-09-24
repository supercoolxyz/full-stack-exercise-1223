import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../../services/api.service';

import { CodeComponent } from '../../components/code/code.component';
import { PaymentsListComponent } from '../../components/payments-list/payments-list.component';
import { Payment } from '../../../model/payment';
import { WebSocketService } from '../../../services/web-socket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [
    FormsModule,
    CodeComponent,
    PaymentsListComponent
  ],
  templateUrl: './payments-page.component.html',
  styleUrl: './payments-page.component.scss'
})
export class PaymentsPageComponent {
  code: string = "";

  // user inputs
  name: string = "";
  ammount: string = "";

  payments: Array<Payment> = [];

  private updateHandle: any = null;
  private updatePage: Subscription | undefined;

  constructor(
    private apiService: ApiService,
    private webSocketService: WebSocketService
  ) {
  }

  ngOnInit() {
    this.apiService.getPayments().subscribe((data: Array<Payment>) => {
      this.payments = data;
    });

    this.updatePage = this.webSocketService.ebUpdatePaymentsPage.subscribe((data: Array<Payment>) => {
      this.payments = data;
    });

    this.updateHandle = setInterval(this.update.bind(this), 1000);
    this.update();
  }

  ngOnDestroy() {
    if (this.updatePage) {
      this.updatePage.unsubscribe();
    }

    clearInterval(this.updateHandle);
  }

  public addPayment(): void {
    if (this.code.trim() == "" || this.name.trim() == "" || ("" + this.ammount).trim() == "") {
      return;
    }

    this.apiService.addPayment(this.name, this.ammount).subscribe(() => {
      this.name = "";
      this.ammount = "";
    });
  }

  private update(): void {

    this.apiService.getCode().subscribe((data: string) => {
      this.code = data;
    });
  }

}

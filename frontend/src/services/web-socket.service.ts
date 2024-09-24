import { Injectable } from '@angular/core';
import { EventBroadcaster } from '../model/event.broadcaster';
import { Payment } from '../model/payment';


@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private ws: WebSocket | undefined;

    public ebUpdateGeneratorPage: EventBroadcaster<any> = new EventBroadcaster();
    public ebUpdatePaymentsPage: EventBroadcaster<Array<Payment>> = new EventBroadcaster();

    constructor() {

        this.ws = new WebSocket('ws://localhost:3000');

        this.ws.onerror = (evt: Event) => {
            console.error(evt);
        }

        this.ws.onopen = () => {
            console.log('connected');
            // this.ws?.send(Date.now() + "");
        }

        this.ws.onclose = () => {
            console.log('disconnected');
        }

        this.ws.onmessage = (evt: MessageEvent) => {
            // console.log(`Round-trip time: ${Date.now() - parseInt(evt.data)} ms`);
            let msg = JSON.parse(evt.data);
            switch(msg.type) {
                case "update_generator_page": {
                    this.ebUpdateGeneratorPage.signal({
                        grid: msg.grid,
                        code: msg.code
                    });
                    break;
                }

                case "update_payments_page": {
                    this.ebUpdatePaymentsPage.signal(msg.payments);
                    break;
                }
            }
        }
    }
}

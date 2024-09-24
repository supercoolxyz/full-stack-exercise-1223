import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private ws: WebSocket | undefined;

    constructor() {

        this.ws = new WebSocket('ws://localhost:3000');

        this.ws.onerror = (evt: Event) => {
            console.error(evt);
        }

        this.ws.onopen = () => {
            console.log('connected');
            this.ws?.send(Date.now() + "");
        }

        this.ws.onclose = () => {
            console.log('disconnected');
        }

        this.ws.onmessage = (evt: MessageEvent) => {
            console.log(`Round-trip time: ${Date.now() - parseInt(evt.data)} ms`);

            // setTimeout(() => {
            //     this.ws?.send(Date.now() + "");
            // }, 500);
        }
    }
}

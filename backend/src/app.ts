import express, { Request, Response } from 'express';
import cors from "cors";
import WebSocket, { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';

import { Domain } from "./domain";



// this instance will provide the internal logic for the application
const domain: Domain = new Domain();


const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
    ws.on('error', console.error);
    console.log(`Server added client: ${request.socket.remoteAddress}`);
    // request.headers.

    ws.on('message', (data: string) => {
    });
});

function broadcast(msg: any) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(msg), { binary: false });
        }
    });

}

// create the api and start listening
const app = express();
app.use(express.json());

// enabling CORS for some specific origins only.
let corsOptions = {
    origin: ['http://localhost:4200'],
};

app.use(cors(corsOptions));

const port = 5000;

// start listening 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//////////////////////////////////
// generator endpoints

app.patch('/setbias', (request: Request, response: Response): any => {
    if (domain.setBias(request.body.bias)) {
        broadcast({
            type: "update_generator_page",
            grid: domain.getGrid(),
            code: domain.getCode()
        });
    }

    return response.status(200).json({});
});

app.patch('/generate', (request: Request, response: Response): any => {
    domain.generate();
    broadcast({
        type: "update_generator_page",
        grid: domain.getGrid(),
        code: domain.getCode()
    });

    return response.status(200).json({});
});

app.get('/getgrid', (request: Request, response: Response): any => {
    return response.status(200).json(domain.getGrid());
});

app.get('/getcode', (request: Request, response: Response): any => {
    return response.status(200).json(domain.getCode());
});


//////////////////////////////////
// payments endpoints

app.post('/addpayment', (request: Request, response: Response): any => {
    domain.addPayment(request.body.name, request.body.ammount);
    broadcast({
        type: "update_payments_page",
        payments: domain.getPayments()
    });

    return response.status(200).json();
});

app.get('/getpayments', (request: Request, response: Response): any => {
    return response.status(200).json(domain.getPayments());
});


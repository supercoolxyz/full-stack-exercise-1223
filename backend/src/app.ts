import express, { Request, Response } from 'express';
import cors from "cors";
import WebSocket, { WebSocketServer } from 'ws';

import { Domain } from "./domain";
import { IncomingMessage } from 'http';



// this instance will provide the internal logic for the application
const domain: Domain = new Domain();


const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
  ws.on('error', console.error);
//   const ip = (request.headers as any['x-forwarded-for']).split(',')[0].trim();
  console.log(`WebSocket  ${request.socket.remoteAddress}`);
//   console.log(`WebSocket  ${ ip }`);

  ws.on('message', (data: string) => {
    console.log('received: %s', new Date(parseInt(data)).toLocaleDateString());
    ws.send(data, { binary: false });
  });

//   ws.send('something');
});



// create the api and start listening
const app = express();
app.use(express.json());

// enabling CORS for some specific origins only.
let corsOptions = {
    origin : ['http://localhost:4200'],
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
    return response.status(domain.setBias(request.body.bias)).json({});
});

app.patch('/generate', (request: Request, response: Response): any => {
    return response.status(domain.generate()).json({});
});

app.get('/islive', (request: Request, response: Response): any => {
    return response.status(200).json(domain.isLive());
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
    return response.status(200).json(domain.getPayments());
});

app.get('/getpayments', (request: Request, response: Response): any => {
    return response.status(200).json(domain.getPayments());
});


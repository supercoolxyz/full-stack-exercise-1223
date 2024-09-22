import express, { Request, Response } from 'express';
import cors from "cors";

import { Domain } from "./domain";



// this instance will provide the internal logic for the application
const domain: Domain = new Domain();


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
// endpoints

app.patch('/setbias', (request: Request, response: Response): any => {
    // should we validate the bias value?
    // let bias = request.body.bias;
    domain.setBias(request.body.bias);
    return response.status(200).json({});
});

app.patch('/generate', (request: Request, response: Response): any => {
    domain.generate();
    return response.status(200).json({});
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



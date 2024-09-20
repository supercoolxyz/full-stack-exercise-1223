import express, { Request, Response } from 'express';

import { Domain } from "./domain";



// this instance will provide the internal logic for the application
const domain: Domain = new Domain();


// create the api and start listening
const app = express();
app.use(express.json());


// handling CORS from the webapp application
app.use((request: Request, response: Response, next: any): any => {
    response.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    response.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = 5000;

// start listening 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//////////////////////////////////
// endpoints

app.patch('/setbias', (request: Request, response: Response): any => {
    // should we validate the bias value
    let bias = request.body.bias;
    let code = domain.setBias(request.body.bias);
    return response.status(code).json({});
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



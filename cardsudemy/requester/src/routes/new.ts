import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { Requester } from '../models/requester';
import { validateRequest, requireAuth } from '../common';
import * as cron from 'node-cron';
import { natsWrapper } from '../nats-wrapper';
import {RequesterCreatedPublisher} from "../events/publishers/requester-created-publisher";
const axios = require('axios');



const router = express.Router();


const running = false;
const apikey = "114b5b2b11d4dcfcc5898d4bd4cdb123";
const city = "Haarlem";

const task = cron.schedule('5 * * * * *', () => {
    console.log('running a task every minute at the 5th second');

    axios.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apikey+'&units=metric')
        .then(function (response : any) {
            // handle success

            const stn = 999;
            const lon = response.data['coord']['lon'];
            const lat = response.data['coord']['lat'];
            const name = response.data['name'];
            const temp = response.data['main']['temp'];
            const humidity = response.data['main']['humidity'];
            const wind = response.data['wind']['speed'];


            const requester = Requester.build({
                stn,
                lon,
                lat,
                name,
                temp,
                humidity,
                wind,
            });


            console.log(requester);
            const event = {
                type: 'requester:created',
                data: requester,
            };

            new RequesterCreatedPublisher(natsWrapper.client).publish({
                stn: requester.stn,
                lon: requester.lon,
                lat: requester.lat,
                name: requester.name,
                temp: requester.temp,
                humidity: requester.humidity,
                wind: requester.wind,
            });
            console.log('Requester creation event published');

        })
        .catch(function (error : any) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    },{scheduled: false});

router.post(
    '/api/requester/start',
    validateRequest,
    async (req: Request, res: Response) => {

        if(!running) {
            task.start();
        }
        res.status(201).send("start");
    }
);

router.post(
    '/api/requester/stop',
    validateRequest,
    async (req: Request, res: Response) => {

        if(running) {
            task.destroy();
        }
        res.status(201).send("stop");
    }
);

export { router as createrequesterRouter };

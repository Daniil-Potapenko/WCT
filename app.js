// wishes come true

import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config.js'
import * as AffirmationController from "./controllers/AffirmationController.js"
import * as UserController from "./controllers/UserController.js"
import {dataEvaluateSchema, registrationSchema, authenticationSchema, validate} from "./utils/Validations.js";


const app = express()
app.use(express.json())

mongoose
    .connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/${process.env.DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('DB OK')
    })
    .catch((err) => {
        console.log('DB ERROR', err)
    })


app.get('/data/find', AffirmationController.getDataByType)
app.post('/data/evaluate', validate(dataEvaluateSchema), AffirmationController.evaluateData)

app.post('/user/registration', validate(registrationSchema), UserController.registration)
app.post('/user/login', validate(authenticationSchema), UserController.login)


app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server OK - running at http://${process.env.HOSTNAME}:${process.env.PORT}`)
    }
})

import express, {Application, Request, Response} from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import compression from "compression"
import {config as dotenv} from 'dotenv'
import passport from 'passport'

require('./middleware/passportHandler')

// router data
import UserRoutes from "./routers/UserRoutes"
import AuthRoutes from "./routers/AuthRoutes"


class App {
    public app: Application

    constructor () {
        this.app = express()
        this.plugins()
        this.routes()
        dotenv()
    }


    private plugins(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(morgan("dev"))
        this.app.use(compression())
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(require('express-session')({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true
        }))
        this.app.use(passport.initialize())
        this.app.use(passport.session())
    }

    private routes() : void {
        this.app.use('/users', UserRoutes)
        this.app.use('/auth', AuthRoutes)
    }

}



const app = new App().app
app.listen(process.env.PORT, () => console.log( "Listen on port " + process.env.PORT))
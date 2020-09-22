import {Router} from 'express'
import RoutersInterfaces from './RoutersInterfaces'

abstract class BaseRoutes implements RoutersInterfaces{
    public route: Router

    constructor() {
        this.route = Router()
        this.routes()
    }

    abstract routes(): void
}

export default BaseRoutes
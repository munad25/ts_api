import { promises } from "dns"
import {Request, Response} from "express"

interface ControllerInterfaces {
   index(req: Request, res: Response): Response
}


export default ControllerInterfaces
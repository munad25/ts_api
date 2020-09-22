import { json } from 'body-parser'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'

const model = require('../db/models/index')

class UsersController  {

    index = async(req: Request, res: Response) => {
        let data = await model.users.findAll()
        return res.status(200).json(data)
    }

    show = async(req: Request, res: Response) => {
            let id = req.params.id
            try {
                let data = await model.users.findOne({where: {id}})
                return res.status(200).json(data)
            } catch (err) {
                return res.status(401).json({error: err.message})
            }
        }
    
    destroy = async(req: Request, res: Response) => {
        let id = req.params.id
        try {
            
            await model.users.destroy({where: {id}})
            return res.status(201).json({status: "data deleted"})

        } catch ( err ) {
            return res.status(401).json({error: err.message})
        }
    }

    update = async(req: Request, res: Response) => {
        let id = req.params.id

        try {
            let {email_address, first_name, last_name, ic_number, birth_date} = req.body
            await model.users.update({
                email_address, first_name, last_name, ic_number, birth_date: new Date(birth_date)
            }, {where: {id}})

            return res.status(201).json({status: "data updated"})
        } catch ( err ) {
            return res.status(401).json({error: err.message})
        }
    }

    updatePassword = async (req: Request, res: Response) => {
        let id = req.params.id
        try {
            let {new_password, recent_password} = req.body
            let user = await model.users.findOne({where: {id}})

            if(user.password !== null) {
                await bcrypt.compare(recent_password, user.password).then(async (isMatch: any) => {
                    console.log(user.id)
                    if(isMatch){
                        let newPassord = bcrypt.hashSync(new_password, 10)
                        await model.users.update({password: newPassord },{where: {id}})
                        return res.status(201).json({status: "Password updated"})
                    } else {
                        return res.status(401).json({error: "Recent password not match"})
                    }
                })
            } else {
                let newPassord = bcrypt.hashSync(new_password, 10)
                await model.users.update({password: newPassord },{where: {id}})
                return res.status(201).json({status: "Password updated"})
            }

        } catch( err) {
            return res.status(500).json({error: err.message})
        }
    }

} 

export default new UsersController()
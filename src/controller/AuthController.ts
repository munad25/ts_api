import {Request, Response} from 'express'
import bcrypt from 'bcrypt'

const model = require('../db/models')
const jwt = require('jsonwebtoken')

class AuthController {
    private signToken(user: any) {
        return jwt.sign({
            iss: 'CodeWorker',
            sub: user.id,
            iat: new Date().getTime(), // current time
            exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
        }, process.env.JWT_SECRET);
    }

    public oauthFacebook = async (req: any, res: Response) => {
        try {
            const user =  await model.users.findOne({where: {email_address: req.user._json.email}})
            const token = this.signToken(user)
            res.status(200).json({
                user: user,
                token: 'Bearer ' + token
            });
        } catch (err) {
            res.status(500).json({
                error: err.message
            });

            console.log(err)
        }
    }

    public login = async(req: Request, res: Response) => {
        const {email_address, password} = req.body

        try {
            await model.users.findOne({where: {email_address}}).then((user : any) => {
                if(!user) {
                    return res.status(401).json({err: "Email not registered"})
                } 
    
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        const token = this.signToken(user);
                        return res.status(200).json({
                            user: user,
                            token: 'Bearer ' + token
                        });
                    }
    
                    return res.status(401).json({error: "Wrong Password"})
                });
            })

        } catch ( err) {
            return res.status(401).json({error: err.message})
        }

    }


    public register = async(req: Request, res: Response): Promise<Response> => {

        const {first_name, last_name, email_address, password, ic_number, birth_date} = req.body

        let data = await model.users.create({
            first_name,
            last_name,
            email_address,
            ic_number,
            password: bcrypt.hashSync(password, 10),
            birth_date: new Date(birth_date )
        })

        return res.status(200).json(data)
    } 

}

export default new AuthController()
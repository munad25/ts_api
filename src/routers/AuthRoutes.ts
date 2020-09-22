import BaseRoutes from './BaseRoutes'

import passport from 'passport'
require('../middleware/passportHandler')
// controller
import AuthController from '../controller/AuthController'


class AuthRoutes extends BaseRoutes {

    public routes(): void {


        this.route.post('/login', AuthController.login)
        this.route.post('/register', AuthController.register)
        this.route.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_birthday']} ))
        this.route.get('/facebook/callback', passport.authenticate('facebook'), AuthController.oauthFacebook);
        this.route.get('/request-reset-password', AuthController.requestResetPassword);
    }
}

export default new AuthRoutes().route
import BaseRoutes from './BaseRoutes'
import passport from 'passport'


require('../middleware/passportHandler')

// Controller
import UserController from "../controller/UsersController"


const jwtAuth = passport.authenticate('jwt', {session: false})
class UserRoutes extends BaseRoutes {

    public routes(): void {
        this.route.get("/",jwtAuth,UserController.index)
        this.route.get("/:id",jwtAuth,UserController.show)
        this.route.delete("/:id",jwtAuth,UserController.destroy)
        this.route.put("/:id",jwtAuth,UserController.update)
        this.route.put("/secret/:id",jwtAuth,UserController.updatePassword)
    }
}

export default new UserRoutes().route
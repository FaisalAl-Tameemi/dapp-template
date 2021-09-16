import { Sequelize } from 'sequelize'
import config from '../config'
import { initModel as initThingModel, Thing as ThingModel } from './models/Thing/Thing.model'
import { initModel as initUserModel, User as UserModel } from './models/User/User.model'

const { POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_USERNAME } = config;

const sequelize = new Sequelize(POSTGRES_DATABASE, POSTGRES_USERNAME, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    dialect: 'postgres'
})

// initialize models
initThingModel(sequelize)
initUserModel(sequelize)

const db = {
    sequelize,
    Sequelize,
    Thing: ThingModel,
    User: UserModel,
}

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db)
    }

    if (model.initScopes) {
        model.initScopes(db)
    }
})

export const Thing = db.Thing
export const User = db.User

export default db

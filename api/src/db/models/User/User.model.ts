import * as bcrypt from 'bcrypt'
import { Model, DataTypes, BuildOptions } from 'sequelize'

export enum userRoleTypes {
    MEMBER = 'member',
    ADMIN = 'admin'
}

export class User extends Model {
    public id?: string;
    public name!: string;
    public email!: string;
    public password?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(db: any): void {
        User.hasMany(db.Thing, {
            as: 'things',
            foreignKey: 'ownerId',
        })
    }

    static initScopes(db: any): void {
        User.addScope('defaultScope', {
            attributes: {
                exclude: ['password', 'passwordHash']
            }
        }, {
            override: true,
        })

        User.addScope('withEmailAndPassword', {
            attributes: {
                include: ['id', 'email', 'password'],
            }
        })
    }

    hashPassword(saltRounds = 10): Promise<Boolean> {
        const _self = this

        if (!_self.password) {
            throw new Error('No password available in the instance')
        }

        return bcrypt
            .hash(_self.password, saltRounds)
            .then((hashedPassword) => {
                _self.set('password', hashedPassword)
                return true
            })
    }

    verifyPassword(passwordToCheck: string): Promise<Boolean> {
        if (!this.password) {
            throw new Error('Password must be available for the user')
        }

        return bcrypt.compare(passwordToCheck, this.password)
    }
}

export const initModel = (sequelize: any): void => {
    User.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        underscored: false,
        tableName: 'users',
        sequelize: sequelize,
    })

    /**
     * TODO: setup hooks to enable generate hashed passwords from plain text
     *       used for user creation and updates
     */
}

export default User

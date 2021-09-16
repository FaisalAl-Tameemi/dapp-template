import { Model, DataTypes } from 'sequelize'

export enum thingTypeEnums {
    GENERAL = 'general',
    TYPE_A = 'type_A',
    TYPE_B = 'type_B'
}

export class Thing extends Model {
    public id?: string;
    public title!: string;
    public kind!: thingTypeEnums;
    public ownerId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(db: any): void {
        Thing.belongsTo(db.User, {
            as: 'owner',
            foreignKey: 'ownerId',
        })
    }

    public static initScopes(db: any): void {}
}

export const initModel = (sequelize: any): void => {
    Thing.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        kind: {
            type: new DataTypes.STRING(36),
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
    }, {
        underscored: false,
        tableName: 'things',
        sequelize: sequelize,
    })
}

export default Thing

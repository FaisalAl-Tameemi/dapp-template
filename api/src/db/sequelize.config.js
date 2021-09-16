const yenv = require('yenv')

const generateSequelizeConfigs = (envConfigs) => {
    return {
        username: envConfigs.POSTGRES_USERNAME,
        password: envConfigs.POSTGRES_PASSWORD,
        database: envConfigs.POSTGRES_DATABASE,
        host: envConfigs.POSTGRES_HOST,
        dialect: 'postgres',
        port: envConfigs.POSTGRES_PORT,
    }
}

module.exports = {
    development: generateSequelizeConfigs(yenv('env.yaml', { env: 'development' })),
    staging: generateSequelizeConfigs(yenv('env.yaml', { env: 'staging' })),
    production: generateSequelizeConfigs(yenv('env.yaml', { env: 'production' })),
}

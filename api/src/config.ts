import * as yenv from 'yenv'

const envConfigs = yenv()

const defaultConfigs = {
    // nothing here yet...
}

export default {
    ...defaultConfigs,
    ...envConfigs,
}

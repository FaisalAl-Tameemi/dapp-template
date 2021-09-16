import * as EventEmitter from 'events'
import TypedEventEmitter from 'typings/ITypedEventEmitter'

import logger from '../../util/log.util'

export enum userEventTypes {
    CREATE = 1,
    UPDATE = 2,
    DELETE = 3,
    LOGIN = 4,
    LOGOUT = 5,
    REGISTER = 6
}

export interface UserEvent {
    error: (error: Error) => void,
    message: (userId: string, action: userEventTypes) => void,
}

export const userEmitter = new EventEmitter() as TypedEventEmitter<UserEvent>

/**
 * Example usage which listens to events
 */
userEmitter.on('message', (userId: string, action: userEventTypes) => {
    logger.info('@userEvents', {
        action: userEventTypes[action],
        documentId: userId,
        context: 'users',
    })
})

export default userEmitter

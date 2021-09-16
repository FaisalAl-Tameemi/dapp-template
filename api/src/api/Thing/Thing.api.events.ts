import * as EventEmitter from 'events'
import TypedEventEmitter from 'typings/ITypedEventEmitter'

import { Thing } from '../../db'
import logger from '../../util/log.util'

export enum thingEventTypes {
    CREATE = 1,
    UPDATE = 2,
    DELETE = 3
}

export interface ThingEvent {
    error: (error: Error) => void,
    message: (thingId: string, ownerId: string, action: thingEventTypes) => void
}

export const thingEmitter = new EventEmitter() as TypedEventEmitter<ThingEvent>

/**
 * Example usage which listens to events
 */
thingEmitter.on('message', (thingId: string, ownerId: string, action: thingEventTypes) => {
    logger.info('@thingEvents', {
        action: thingEventTypes[action],
        documentId: thingId,
        ownerId: ownerId,
        context: 'things',
    })
})

export default thingEmitter

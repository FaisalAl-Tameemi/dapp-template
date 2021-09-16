import { Server, Socket } from 'socket.io'

export default interface ISocketManagerInterface {
    activeConnections: Socket[]

    constructor(io: Server, serviceName?: string)
    addNewConnection(socket: Socket): void
    removeConnection(socket: Socket): void
}

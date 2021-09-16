export default interface IResource {
    create(data: object): any
    findAll(query?: object, options?: object): any[]
    find(query?: object, options?: object): any
}
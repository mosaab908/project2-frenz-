export default class User {
    id: number
    email: string
    firstName: string
    lastName: string
    imageUrl: string
    password: String

    constructor (id: number, email: string, firstName: string, lastName: string, imageUrl: string) {
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.imageUrl = imageUrl;
    }
}
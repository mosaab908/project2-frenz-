import User from "./User"

export default class Post {
    id: number
    text: string
    imageUrl: string
    youtubeUrl: string
    author: User
    comments: Post[]

    constructor (id: number, text: string, imageUrl: string, youtubeUrl: string, author: User, comments: Post[]) {
        this.id = id
        this.text = text
        this.imageUrl = imageUrl
        this.youtubeUrl = youtubeUrl
        this.author = author
        this.comments = comments
    }
}